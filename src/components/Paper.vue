<template>
  <main class="container-fluid" style="height:100%">
    <div class="row sticky">
      <div class="col-md-11 order-md-1 order-2">
        <!-- Menüleiste -->
        <Menubar :my-doc="doc"></Menubar>
        <!-- Toolbar -->
        <Toolbar></Toolbar>
      </div>

      <div class="col-md-1 order-md-2 order-1">
        <md-button style="float: right; margin-top: 0.7rem" type="button" class="md-icon-button md-raised">
          <img class="fktstripImg" style="margin: 0" src="../assets/baseline-clear-24px.svg" />
        </md-button>
        <!--<md-button style="float: right" type="button" @click="showDialogRename = true" class="md-default md-raised md-dense">umbenennen</md-button>-->

      </div>
    </div>

    <div class="container">
      <b-alert class="saving" :show="saving" variant="info">speichert...</b-alert>
      <b-alert class="error" :show="error" variant="danger">Beim Speichern ist ein Fehler aufgetreten. Bitte die Schritte um den Fehler zu reproduzieren in die Gruppe stellen. Neu laden des Dokuments behebt die Inkonsistenz.</b-alert>
      <h1>{{ doc.title }}</h1> {{ rename }}
      <div style="outline:none" contenteditable="true"
         id="paper" itemref="paper"
         class="my-3 rounded shadow-lg paper"
         @paste.stop="onPaste($event, doc)"
         @input.stop="documentChanges($event, doc)"
         @mouseup="addCaret"
         @mousedown="addCaret"
         @keyup="addCaret"
         @keydown="addCaret"
         v-html="doc.body" :disabled="1" ref="paper">
      </div>
    </div>

  </main>
</template>

<script>
  import api from '@/api'
  import io from 'socket.io-client'
  import Toolbar from './Toolbar'
  import Menubar from './Menubar'
  import stringDiff from '../utils/string-diff'

  const usernames = {}
  const positions = {}

  export default {
    name: 'Paper',
    components: {Toolbar, Menubar},
    data () {
      return {
        name: 'Delay',
        showDialogRename: false,
        showDialogPage: false,
        doc: [],
        model: {},
        oldBody: '',
        saving: false,
        rename: '',
        socket: null,
        savedSelection: null,
        error: false
      }
    },
    async created () {
      this.refreshDocs()
    },
    methods: {
      async onPaste (event, doc) {
        var pastedData = event.clipboardData.files[0]
        var that = this
        // Image paste
        if (pastedData && pastedData.type.indexOf('image') === 0) {
          event.preventDefault()

          var reader = new FileReader()
          reader.readAsDataURL(pastedData)
          reader.onloadend = function () {
            var base64data = reader.result
            var image = new Image()
            image.src = base64data
            image.id = 'img' + Math.floor(Math.random() * 9999999)
            image.addEventListener('load', function _func () {
              image.removeEventListener('load', _func)
              image.src = that.reduceImageSize(image)
              that.insertImgAtCaret(image)
              that.documentChanges(event, doc)
            })
          }
        }
      },
      reduceImageSize (img) {
        var canvas = document.createElement('canvas')
        var ctx = canvas.getContext('2d')
        ctx.drawImage(img, 0, 0)

        var MAX_WIDTH = 800
        var MAX_HEIGHT = 600
        var width = img.width
        var height = img.height

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width
            width = MAX_WIDTH
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height
            height = MAX_HEIGHT
          }
        }
        canvas.width = width
        canvas.height = height
        ctx = canvas.getContext('2d')
        ctx.drawImage(img, 0, 0, width, height)

        return canvas.toDataURL('image/jpeg', 0.6)
      },
      async newSocket (id, doc) {
        if (process.env.NODE_ENV === 'development') {
          this.socket = io('http://localhost:8080')
        } else {
          this.socket = io('https://blnk-io.herokuapp.com/')
        }
        // Benutzer meldet sich an einem Raum an
        this.joinRoom(id)

        this.socket.on('titleChange', function (data) {
          doc.title = data
        })
        var that = this

        this.socket.on('textChange', function (d) {
          let difference = d['difference']
          let distanceDiff = d['distanceDiff']
          for (let i in difference) {
            let diff = (difference[i])
            if (!diff) return
            let body = that.$refs.paper.innerHTML
            if (diff.EndDeletePosition - diff.StartInsertPosition > 0) { // Delete
              that.$refs.paper.innerHTML = body.substr(0, diff.StartInsertPosition) + diff.newData + body.substr(diff.EndDeletePosition)
            } else { // Insert
              that.$refs.paper.innerHTML = body.substr(0, diff.StartInsertPosition) + diff.newData + body.substr(diff.StartInsertPosition)
            }
            that.oldBody = that.$refs.paper.innerHTML
          }

          that.$nextTick(() => {
            that.restoreSelection(distanceDiff)
          })
        })
        this.socket.on('messageSaved', function (data) {
          let saved = data['saved']
          if (saved) {
            window.setTimeout(function () { that.saving = false }, 400) // Kleiner Delay blockt die nächste Eingabe
          } else {
            console.log('Fehler, erwartet:' + data['expected'] + ' erhalten: ' + data['delivered'])
            that.error = true
          }
        })

        this.socket.on('addCaret', function (data) { // TODO Funktion zum anzeigen der anderen Carets einfügen
          var username = this.getUsername()
          positions.push({ username, data })
        })
      },
      async joinRoom (id) {
        this.socket.emit('room', 'docChannel_' + id)
      },
      async updateText (newDoc, difference, distanceDiff, oldBodyLength) {
        this.socket.emit('textChange', {room: 'docChannel_' + newDoc.hash, event: 'textChange', difference: difference, hash: newDoc.hash, distanceDiff: distanceDiff, bodyLength: oldBodyLength})
      },
      async refreshDocs () {
        this.doc = await api.getDoc(this.$route.params.hash)
        this.newSocket(this.doc.hash, this.doc)
        this.oldBody = this.doc.body
      },
      async documentChanges (e, doc) {
        if (this.saving) {
          await this.Sleep(500)
          if (!this.saving) {
            this.onDivInput(e, doc)
          }
        } else {
          this.saving = true
          this.onDivInput(e, doc)
        }
      },
      async onDivInput (e, doc) {
        let oldBodySaving = this.oldBody
        let newBodySaving = this.$refs.paper.innerHTML
        let oldBodyLength = this.oldBody.length
        this.oldBody = newBodySaving

        let distanceDiff = 0
        if (e) {
          distanceDiff = 1
        } else {
          distanceDiff = -1
        }

        if (doc.hash) {
          var difference = await stringDiff(oldBodySaving, newBodySaving)
        }
        this.updateText(doc, difference.result, distanceDiff, oldBodyLength)
        this.saveSelection()
      },
      addCaret (doc) {
        // var username = this.readUsername()
        // var positionRow = this.readCaretPosition(doc.srcElement)
        // var positionCol = this.getDivContainer()
        // var user = {username, positionRow, positionCol}
        // this.socket.emit('addCaret', {
        //   room: 'docChannel_' + this.doc.id,
        //   event: 'addCaret',
        //   message: user
        // })
      },
      getDivContainer () {
        var sel
        var range
        var sibling
        var gen
        var doc = document.getElementById('paper')
        if (window.getSelection) {
          sel = window.getSelection()
          if (sel.rangeCount) {
            range = sel.getRangeAt(0)
            if (range.commonAncestorContainer.parentNode === doc) {
              gen = 0
            } else if (range.commonAncestorContainer.parentNode.parentNode === doc) {
              gen = 1
            }
            if (gen === 0) {
              return gen
            } else {
              for (var i = 1; i < doc.childNodes.length; i++) {
                console.log(range.commonAncestorContainer.textContent)
                console.log(doc.childNodes[i].textContent)
                if (range.commonAncestorContainer.textContent === doc.childNodes[i].textContent) {
                  sibling = i
                  return {gen, sibling}
                }
              }
            }
          }
        }
      },
      readCaretPosition (doc) {
        var caretPos = 0
        var sel
        var range
        if (window.getSelection) {
          sel = window.getSelection()
          if (sel.rangeCount) {
            range = sel.getRangeAt(0)
            if (range.commonAncestorContainer.parentNode === doc || range.commonAncestorContainer.parentNode.parentNode === doc) {
              caretPos = range.endOffset
            }
          }
        } else if (document.selection && document.selection.createRange) {
          range = document.selection.createRange()
          if (range.parentElement() === doc || range.parentElement.parentElement() === doc) {
            var tempEl = document.createElement('span')
            doc.insertBefore(tempEl, doc.firstChild)
            var tempRange = range.duplicate()
            tempRange.moveToElementText(tempEl)
            tempRange.setEndPoint('EndToEnd', range)
            caretPos = tempRange.text.length
          }
        }
        return caretPos
      },
      readUsername () {
        return this.socket.id
      },
      saveSelection () {
        var range = window.getSelection().getRangeAt(0)
        var preSelectionRange = range.cloneRange()
        preSelectionRange.selectNodeContents(this.$refs.paper)
        preSelectionRange.setEnd(range.startContainer, range.startOffset)
        var start = preSelectionRange.toString().length

        this.savedSelection = {
          start: start,
          end: start + range.toString().length
        }
      },
      restoreSelection (distanceDiff) {
        if (!this.savedSelection) return
        var charIndex = 0
        var range = document.createRange()
        range.setStart(this.$refs.paper, 0)
        range.collapse(true)
        var nodeStack = [this.$refs.paper]
        var node
        var foundStart = false
        var stop = false

        while (!stop && (node = nodeStack.pop())) {
          if (node.nodeType === 3) {
            var nextCharIndex = charIndex + node.length
            if (!foundStart && this.savedSelection.start >= charIndex && this.savedSelection.start <= nextCharIndex) {
              range.setStart(node, this.savedSelection.start - charIndex)
              foundStart = true
            }
            if (foundStart && this.savedSelection.end >= charIndex && this.savedSelection.end <= nextCharIndex) {
              range.setEnd(node, this.savedSelection.end - charIndex)
              stop = true
            }
            charIndex = nextCharIndex
          } else {
            var i = node.childNodes.length
            while (i--) {
              nodeStack.push(node.childNodes[i])
            }
          }
        }

        var sel = window.getSelection()
        sel.removeAllRanges()
        sel.addRange(range)
      },
      getCaretPosition (doc) {
        if (document.selection) {
          doc.focus()
          var range = doc.selection.createRange()
          var rangelen = range.text.length
          range.moveStart('character', -doc.value.length)
          var start = range.text.length - rangelen
          return {'start': start, 'end': start + rangelen}
        } else if (doc.selectionStart || doc.selectionStart === '0') {
          return {'start': doc.selectionStart, 'end': doc.selectionEnd}
        } else {
          return {'start': 0, 'end': 0}
        }
      },
      setCaretPosition (doc, start, end) {
        if (doc.setSelectionRange) {
          doc.focus()
          doc.setSelectionRange(start, end)
        } else if (doc.createTextRange) {
          var range = doc.createTextRange()
          range.collapse(true)
          range.moveEnd('character', end)
          range.moveStart('character', start)
          range.select()
        }
      },
      getUsername () {
        for (var i = 0; i < positions.length; i++) {
          if (i === usernames.length) {
            return i
          } else {
            return 0
          }
        }
      },
      Sleep (milliseconds) {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
      },
      insertImgAtCaret (img) {
        let sel, range
        if (window.getSelection) {
          sel = window.getSelection()
          if (sel.getRangeAt && sel.rangeCount) {
            range = sel.getRangeAt(0)
            range.deleteContents()
            range.insertNode(img)
          }
        }
      },
      createLink () {
        document.execCommand('createLink', false, null)
      }
    }
  }
</script>

<style>
  main, main {
    height: 100%;
  }

  body {
    background-color: #f3f2f1 !important;
  }

  h1 {
    margin-top: 3rem !important;
  }

  .saving {
    float: right !important;
    position: -webkit-sticky !important; /* Safari */
    position: sticky !important;
    top: 2rem !important;
    z-index: 10 !important;
  }

  .error {
    float: right !important;
    position: -webkit-sticky !important; /* Safari */
    position: sticky !important;
    top: 2rem !important;
    z-index: 11 !important;
  }

  .container-fluid {}
  .container {}

  .sticky {
    position: -webkit-sticky; /* Safari */
    position: sticky;
    top: 0;
    background-color: #f3f2f1;
    padding: 0.5rem 0 1rem 0;
    box-shadow: 0 1px 3px -2px gray;
    z-index: 1;
  }

  #paper {
    min-height:1500px;
    padding: 120px;
    background-color: white;
  }

  input {
    width: 416px;
  }

  .fktstripImg {
    height: 21px !important;
    width: 21px !important;
    margin-bottom: 1px;
  }

  sub, sup {
    position: relative;
  }

  .md-list-item-container {
    font-size: 0.875rem !important;
    padding: 0 !important;
  }

  .md-list-item-content {
    min-height: 35px !important;
    padding: 0 1.4rem 0 2.8rem !important;
  }

  .md-divider {
    margin: 0.5rem !important;
    opacity: 0.8 !important;
  }
</style>
