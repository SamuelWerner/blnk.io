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
      <b-alert class="saving" :show="saveAlert" variant="info">speichert...</b-alert>
      <h1>{{ doc.title }}</h1> {{ rename }}
      <div style="outline:none" contenteditable="true"
         id="paper"
         class="my-3 rounded shadow-lg paper"
         @input="onDivInput($event, doc)"
         @paste="onPaste"
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
        body: [],
        saving: false,
        saveAlert: false,
        rename: '',
        socket: null,
        waitForSave: false
      }
    },
    async created () {
      this.refreshDocs()
    },
    methods: {
      onPaste (event) {
        var pastedData = event.clipboardData.files[0]
        var that = this

        if (pastedData.type.indexOf('image') === 0) {
          var reader = new FileReader()
          reader.readAsDataURL(pastedData)
          reader.onloadend = function () {
            var base64data = reader.result
            var image = document.createElement('img')
            image.src = base64data
            that.insertImgAtCaret(image)
          }
        }
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

        this.socket.on('textChange', function (data) {
          doc.body = data
        })

        this.socket.on('addCaret', function (data) { // TODO Funktion zum anzeigen der anderen Carets einfügen
          var username = this.getUsername()
          positions.push({ username, data })
          console.log(positions)
        })
      },
      async joinRoom (id) {
        this.socket.emit('room', 'docChannel_' + id)
      },
      async updateText (newDoc) { // TODO: Zukünftig: Nur Teile austauschen. Zur Zeit wird jedes mal der komplette Text übertragen.
        this.socket.emit('textChange', {room: 'docChannel_' + newDoc.id, event: 'textChange', message: newDoc.body})
      },
      async refreshDocs () {
        this.doc = await api.getDoc(this.$route.params.docID)
        this.newSocket(this.doc.id, this.doc)
        this.body = this.doc.body
      },
      async updateDoc (doc) {
        if (doc.id) {
          await api.updateDoc(doc.id, doc)
        }
      },
      async onDivInput (e, doc) {
        if (this.saving) {
          this.waitForSave = true
          return
        }
        if (doc.id) {
          this.waitForSave = true
          while (this.waitForSave) {
            this.saving = true
            await this.Sleep(2000)
            this.saveAlert = true
            let newDoc = JSON.parse(JSON.stringify(doc))
            newDoc.body = e.target.innerHTML
            await api.updateDoc(newDoc.id, newDoc)
            await this.updateText(newDoc)
            await this.Sleep(1000)
            this.saveAlert = false
            this.waitForSave = false
            this.saving = false
          }
        }
      },
      async addCaret (doc) {
        positions.push(this.getCaretPosition(doc))
        this.socket.emit('addCaret', {
          room: 'docChannel_' + this.doc.id,
          event: 'addCaret',
          message: positions
        })
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
      /*
      backColor (color) {
        var page = document.getElementById('paper')
        page.style.backgroundColor = color
      } */
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

  .container-fluid {
  }

  .container {
  }

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

</style>
