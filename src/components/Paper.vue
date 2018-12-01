<template>
  <main class="container-fluid" style="height:100%">
    <div class="row sticky">
      <div class="col-md-11 order-md-1 order-2">
        <!-- Menüleiste -->
        <Menubar :my-doc="doc"></Menubar>
        <br>
        <Toolbar></Toolbar>
      </div>

      <div class="col-md-1 order-md-2 order-1">
        <md-button style="float: right; margin-top: 0.7rem" type="button" to="/" class="md-icon-button md-raised">
          <img class="fktstripImg" style="margin: 0" src="../assets/baseline-cancel-24px.svg" />
        </md-button>
        <!--<md-button style="float: right" type="button" @click="showDialogRename = true" class="md-default md-raised md-dense">umbenennen</md-button>-->

      </div>
    </div>

    <div class="container">
      <b-alert class="saving" :show="saving" variant="info">speichert...</b-alert>
      <h1>{{ doc.title }}</h1> {{ rename }}
      <div style="outline:none" contenteditable="true"
         id="paper" itemref="paper"
         class="my-3 rounded shadow-lg paper"
         @paste.stop="onPaste($event, doc)"
         @input.stop.self="onDivInput($event, doc)"
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
        savedSelection: null
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
              that.onDivInput(event, doc)
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
            if (diff.EndDeletePosition - diff.StartInsertPosition > 0) { // Delete
              doc.body = doc.body.substr(0, diff.StartInsertPosition) + diff.newData + doc.body.substr(diff.EndDeletePosition)
            } else { // Insert
              doc.body = doc.body.substr(0, diff.StartInsertPosition) + diff.newData + doc.body.substr(diff.StartInsertPosition)
            }
            this.oldBody = doc.body
          }

          that.$nextTick(() => {
            that.restoreSelection(distanceDiff)
          })
        })

        this.socket.on('addCaret', function (data) { // TODO Funktion zum anzeigen der anderen Carets einfügen
          var username = this.getUsername()
          positions.push({ username, data })
        })
      },
      async joinRoom (id) {
        this.socket.emit('room', 'docChannel_' + id)
      },
      async updateText (newDoc, difference, distanceDiff) {
        this.socket.emit('textChange', {room: 'docChannel_' + newDoc.hash, event: 'textChange', difference: difference, hash: newDoc.hash, distanceDiff: distanceDiff})
      },
      async refreshDocs () {
        this.doc = await api.getDoc(this.$route.params.hash)
        this.newSocket(this.doc.hash, this.doc)
        this.oldBody = this.doc.body
      },
      async onDivInput (e, doc) {
        if (this.saving) {
          return
        }

        let distanceDiff = 0
        if (e) {
          distanceDiff = 1
        } else {
          distanceDiff = -1
        }

        if (doc.hash) {
          this.saving = true
          let difference = await stringDiff(this.oldBody, this.$refs.paper.innerHTML)
          this.oldBody = this.$refs.paper.innerHTML
          await this.updateText(doc, difference.result, distanceDiff)
          this.saving = false
        }
        this.$nextTick(() => {
          this.saveSelection()
        })
      },
      async addCaret (doc) {
        positions.push(this.getCaretPosition(doc))
        this.socket.emit('addCaret', {
          room: 'docChannel_' + this.doc.hash,
          event: 'addCaret',
          message: positions
        })
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
  main, main{
    height: 100%;
  }

  body{
    background-color:#f3f2f1 !important;
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
    font-size: 0.875rem;
    padding: 0;
    font-size: 0.875rem !important;
    padding: 0 !important;
  }

  .md-list-item-content {
    min-height: 35px;
    padding: 0 1.4rem 0 2.8rem;
    min-height: 35px !important;
    padding: 0 1.4rem 0 2.8rem !important;
  }
</style>
