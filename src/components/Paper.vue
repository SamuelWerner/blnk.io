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
        <md-button href="/" style="float: right; margin-top: 0.7rem" type="button" class="md-icon-button md-raised">
          <img class="fktstripImg" style="margin: 0" src="../assets/baseline-clear-24px.svg" />
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
         @input.stop="documentChanges($event, doc)"
         v-html="body" :disabled="1" ref="paper">
      </div>
    </div>
    <a id="buttonTop"></a>
    <a id="pageBottom"></a>
  </main>
</template>

<script>
  import api from '@/api'
  import io from 'socket.io-client'
  import Toolbar from './Toolbar'
  import Menubar from './Menubar'
  import DiffDOM from 'diff-dom'

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
        oldBodySaving: '',
        saving: false,
        distributing: false,
        rename: '',
        socket: null,
        body: '',
        timeoutHandle: null
      }
    },
    async created () {
      // Beim Aufruf der Seite das Dokument aufbauen
      let newB = document.createElement('div')
      this.doc = await api.getDoc(this.$route.params.hash)
      let changes = JSON.parse(this.doc.body).changes
      let dd = new DiffDOM()
      for (let change in changes) {
        let tmpArray = changes[change]
        tmpArray.pop()
        dd.apply(newB, tmpArray)
      }
      this.body = newB.innerHTML
      this.oldBody = this.body
      this.oldBodySaving = this.body
      // Socket Verbindung initalisieren
      this.newSocket(this.doc.hash, this.doc)
    },
    methods: {
      async newSocket (id, doc) {
        if (process.env.NODE_ENV === 'development') {
          this.socket = io('http://localhost:8080')
        } else {
          this.socket = io('https://blnk-io.herokuapp.com/')
        }
        // Benutzer meldet sich an dem Dokument an
        this.joinRoom(id)

        this.socket.on('titleChange', function (data) {
          doc.title = data
        })

        const that = this
        this.socket.on('textChange', async function (d) {
          while (that.distributing) {
            await that.Sleep(100)
          }
          that.savePaper(doc)
          let difference = d['difference']
          let diff = JSON.parse(difference)
          let dd = new DiffDOM()
          dd.apply(document.getElementById('paper'), diff)
          that.oldBody = that.$refs.paper.innerHTML
          that.oldBodySaving = that.$refs.paper.innerHTML
        })

        this.socket.on('addCaret', function (data) { // TODO Funktion zum anzeigen der anderen Carets einfügen
          var username = this.getUsername()
          positions.push({ username, data })
        })
      },
      async joinRoom (id) {
        this.socket.emit('room', 'docChannel_' + id)
      },
      async documentChanges (e, doc) {
        this.saving = true
        this.distributeChanges(e, doc)

        // warten bis der Benutzer keine Eingabe mehr macht
        window.clearTimeout(this.timeoutHandle)
        var that = this
        this.timeoutHandle = window.setTimeout(async function () {
          await that.savePaper(doc)
          that.saving = false
        }, 5000)
      },
      async distributeChanges (e, doc) { // Jede Änderung wird sofort verteilt
        this.distributing = true
        let oldBody = this.oldBody
        let newBody = this.$refs.paper.innerHTML
        this.oldBody = newBody

        var dd = new DiffDOM()
        if (doc.hash) {
          let oldB = document.createElement('div')
          let newB = document.createElement('div')
          oldB.innerHTML = oldBody
          newB.innerHTML = newBody
          var diff = dd.diff(oldB, newB)
          var diffJson = JSON.stringify(diff)
          await this.socket.emit('distributeChanges', {room: 'docChannel_' + doc.hash, difference: diffJson, hash: doc.hash})
          this.distributing = false
        }
      },
      async savePaper (doc) { // Die Änderungen werden nur bei Ende der Benutzer-Eingabe gespeichert
        let oldBodySaving = this.oldBodySaving
        let newBodySaving = this.$refs.paper.innerHTML
        this.oldBodySaving = newBodySaving

        var dd = new DiffDOM()
        if (doc.hash) {
          let oldB = document.createElement('div')
          let newB = document.createElement('div')
          oldB.innerHTML = oldBodySaving
          newB.innerHTML = newBodySaving
          var diff = dd.diff(oldB, newB)
          var diffJson = JSON.stringify(diff)
          this.socket.emit('savePaper', {difference: diffJson, hash: doc.hash})
          this.saving = false
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
      },
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

  #buttonTop {
    display: inline-block;
    background-color: #f7f6d8;
    width: 40px;
    height: 40px;
    text-align: center;
    border-radius: 4px;
    margin: 30px;
    position: fixed;
    bottom: 20px;
    right: 20px;
    transition: background-color .3s;
    z-index: 1000;
    transition: background-color .3s, opacity .5s, visibility .5s;
    opacity: 0;
    visibility: hidden;
  }

  #buttonTop:hover {
    cursor: pointer;
    background-color: #333;
  }

  #buttonTop:active {
    background-color: #555;
  }

  #buttonTop.show {
    opacity: 1;
    visibility: visible;
  }

  #buttonTop::after {
    content: "\f077";
    font-family: FontAwesome;
    font-weight: normal;
    font-style: normal;
    font-size: 1.5em;
    line-height: 38px;
    color: #a80337;
  }
</style>
