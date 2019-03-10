<template>
  <main class="container-fluid" style="padding-bottom: 10rem">
    <div id="barDiv" class="row ribbon sticky">
      <div>
        <!-- Menüleiste -->
        <Menubar :my-doc="doc"></Menubar>

        <!-- Toolbar -->
        <Toolbar></Toolbar>
      </div>

      <!-- X-Button -->
      <md-button href="/" id="closeBtn" type="button" class="md-icon-button md-dense md-raised">
        <md-tooltip md-delay="1000" md-direction="left">Dokument schließen</md-tooltip>
        <img class="fktstripImg" style="margin: 0" src="../assets/baseline-clear-24px.svg" />
      </md-button>

      <!-- Ribbon einklappen -->
      <div @click="menubarClose" id="menubarClose">
        <img src="../assets/baseline-keyboard_arrow_up-24px.svg" alt="">
      </div>
    </div>

    <!-- bei eingeklapptem Ribbon: -->
    <div class="menubarOpenWrapper">
      <md-button @click="menubarOpen" class="md-icon-button md-dense md-raised" id="menuClosed">
        <md-tooltip md-delay="300" md-direction="left">Menü ausklappen</md-tooltip>
        <md-icon>keyboard_arrow_down</md-icon>
      </md-button>
    </div>

    <!-- Scroll-Top-Button -->
    <a id="scrollTop" v-scroll-to="'#pageTop'"><img src="../assets/baseline-keyboard_arrow_up-24px.svg" alt=""></a>

    <!-- Toolbar Mobile -->
    <div id="mobileBar" class="sticky">
      <ToolbarMobile></ToolbarMobile>
    </div>

    <!-- Menu Mobile -->
    <div id="menuMobile">
      <md-menu md-size="small" md-align-trigger :md-offset-x="-300" :md-offset-y="-36">
        <md-button md-menu-trigger href="" style="float: right;" type="button" class="md-icon-button md-raised">
          <img class="menuMobileImg" style="margin: 0;" src="../assets/baseline-menu-24px.svg" />
        </md-button>

        <md-menu-content class="menu-content" style="max-height: 1000px">
          <md-menu-item href="/" @click="" ><div class="md-item-filled"><img src="../assets/baseline-clear-24px.svg" /></div>zurück zum Menü</md-menu-item>
          <md-divider></md-divider>
          <md-menu-item @click="" disabled><div class="md-item-filled"><img style="opacity: 0.2" src="../assets/outline-insert_drive_file-24px.svg" /></div>Neu</md-menu-item>
          <md-menu-item @click="" href="/"><div class="md-item-filled"><img src="../assets/outline-folder_open-24px.svg" /></div>Öffnen</md-menu-item>
          <md-menu-item @click="showDialogCopyDokument = true" disabled><div class="md-item-filled"><img style="opacity: 0.2" src="../assets/outline-file_copy-24px.svg" /></div>Kopie erstellen</md-menu-item>
          <md-menu-item @click="" disabled><div class="md-item-empty"></div>Herunterladen</md-menu-item>
          <md-divider></md-divider>
          <md-menu-item @click="showDialogRename = true" disabled><div class="md-item-filled"><img style="opacity: 0.2" src="../assets/outline-create-24px.svg" /></div>Umbenennen</md-menu-item>
          <md-menu-item @click="" disabled><div class="md-item-empty"></div>Verschieben nach</md-menu-item>
          <md-menu-item @click="" disabled><div class="md-item-filled"><img style="opacity: 0.2" src="../assets/baseline-delete-24px.svg" /></div>Löschen</md-menu-item>
          <md-divider></md-divider>
          <md-menu-item @click="print" ><div class="md-item-filled"><img src="../assets/outline-print-24px.svg" /></div>Drucken</md-menu-item>
        </md-menu-content>
      </md-menu>
    </div>

    <div class="saving-wrapper">
      <div class="saving" v-show="saving" title="speichert...">
        <i class="material-icons">save</i>
        <md-progress-spinner class="spinner-saving spinner-saving-desktop" :md-diameter="35" :md-stroke="2" md-mode="indeterminate"></md-progress-spinner>
        <md-progress-spinner class="spinner-saving spinner-saving-mobile" :md-diameter="30" :md-stroke="2" md-mode="indeterminate"></md-progress-spinner>
      </div>
    </div>

    <div class="container">
      <h1 class="docTitle" @click="showDialogRename = true">
        <div id="containerSpinner" class="spinner">
          <md-progress-spinner md-mode="indeterminate" :md-diameter="40" :md-stroke="4"></md-progress-spinner>
        </div>
        {{ doc.title }} {{socketID}}
        <img id="editName"  src="../assets/outline-create-24px.svg" />
      </h1>

      <div style="outline: none" contenteditable="true"
         id="paper" itemref="paper"
         class="rounded shadow paper"
         @paste.stop="onPaste($event, doc)"
         @input.stop="documentChanges($event, doc)" @click="saveSelection()"
         v-html="body" :disabled="1" ref="paper">
      </div>
    </div>
    <a id="pageBottom"></a>

    <!-- DIALOG Umbenennen -->
    <md-dialog class="dialog" :md-active.sync="showDialogRename">
      <md-dialog-title>Neuen Namen eingeben</md-dialog-title>

      <md-field md-clearable>
        <form id="form" @submit.prevent="updateName">
          <label>Titel eingeben...</label><md-input type="text" v-model="doc.title"  maxlength="30"></md-input>
        </form>
      </md-field>

      <md-dialog-actions>
        <md-button class="md-primary" @click="showDialogRename = false" type="submit" form="form">Fertig</md-button>
      </md-dialog-actions>
    </md-dialog>
    <!-- DIALOG end -->
  </main>
</template>

<script>
  /* eslint-disable no-constant-condition */

  import api from '@/api'
  import io from 'socket.io-client'
  import Toolbar from './Toolbar'
  import Menubar from './Menubar'
  import ToolbarMobile from './ToolbarMobile'
  import DiffDOM from 'diff-dom'
  import StringDiff from '../utils/string-diff'
  import editorMixin from '../mixins/editorMixin'

  const usernames = {}
  const positions = {}

  export default {
    name: 'Paper',
    components: {Toolbar, Menubar, ToolbarMobile},
    mixins: [editorMixin],
    data () {
      return {
        name: 'Delay',
        showDialogRename: false,
        showDialogPage: false,
        showDialogCopyDokument: false,
        showDialogOpenDokument: false,
        doc: [],
        model: {},
        oldBody: '',
        oldBodySaving: '',
        saving: false,
        distributing: false,
        rename: '',
        socket: null,
        body: '',
        timeoutHandle: null,
        differencesTextChange: [],
        savedSelection: null,
        socketID: ''
      }
    },
    beforeCreate () {
      document.body.scrollTop = 0 // For Safari
      document.documentElement.scrollTop = 0 // For Chrome, Firefox, IE and Opera
    },
    async created () {
      // Beim Aufruf der Seite das Dokument aufbauen
      let newB = document.createElement('div')
      this.doc = await api.getDoc(this.$route.params.hash)
      document.getElementById('containerSpinner').style.display = 'none'
      document.getElementById('editName').style.display = 'inline-block'
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
      this.onScroll()
      this.editable()
    },
    methods: {
      async newSocket (id, doc) {
        if (process.env.NODE_ENV === 'development') {
          this.socket = io('http://localhost:8080')
        } else {
          this.socket = io('https://blnk-io.herokuapp.com/')
        }

        this.socket.on('titleChange', function (data) {
          doc.title = data
        })

        const that = this
        this.socket.on('textChange', async function (d) {
          that.differencesTextChange.push(d)
          while (that.saving) { // Wait until all changes in this Paper are committed
            await that.Sleep(100)
          }
          while (that.differencesTextChange.length > 0) {
            var difference = that.differencesTextChange.shift()['difference']
            var diff = JSON.parse(difference)
            var dd = new DiffDOM({
              textDiff: function (node, currentValue, expectedValue, newValue) {
                console.log('currentValue: ' + currentValue)
                console.log('expectedValue: ' + expectedValue)
                console.log('newValue: ' + newValue)
                var distanceDiff = 0 // diff[0].newValue.length - diff[0].oldValue.length
                var result = expectedValue
                // The text node currently does not contain what we expected it to contain, so we need to merge.
                var differenceOld = StringDiff(currentValue, expectedValue)
                var firstMerge = newValue

                if (that.savedSelection && that.savedSelection.node === node) {
                  for (let i in differenceOld.result) {
                    let diff = (differenceOld.result[i])
                    if (!diff) return
                    if (diff.EndDeletePosition - diff.StartInsertPosition > 0) { // Delete
                      console.log('delete merge')
                      distanceDiff += (firstMerge.substr(diff.StartInsertPosition, diff.EndDeletePosition)).length
                      firstMerge = firstMerge.substr(0, diff.StartInsertPosition) + firstMerge.substr(diff.EndDeletePosition)
                    } else { // Insert
                      console.log('insert Merge')
                      firstMerge = firstMerge.substr(0, diff.StartInsertPosition) + diff.newData + firstMerge.substr(diff.StartInsertPosition)
                      distanceDiff += diff.newData.length
                    }
                    that.$nextTick(() => {
                      // Nur die Caret Position wieder herstellen, wenn Caret auch in dem veränderten Knoten ist
                      that.restoreSelection(distanceDiff, result.substr(0, diff.StartInsertPosition).length, result.length)
                    })
                  }
                  console.log('first merge: ' + firstMerge)
                  var differenceNew = StringDiff(result, firstMerge)
                  for (let i in differenceNew.result) {
                    let diff = (differenceNew.result[i])
                    if (!diff) return
                    if (diff.EndDeletePosition - diff.StartInsertPosition > 0) { // Delete
                      if (newValue.length < currentValue.length) { // nicht löschen wenn Inhalt hinzugefügt wurde
                        console.log('delete merge nvl ' + newValue.length + 'cvl' + currentValue.length)
                        distanceDiff += (result.substr(diff.StartInsertPosition, diff.EndDeletePosition)).length
                        result = result.substr(0, diff.StartInsertPosition) + result.substr(diff.EndDeletePosition)
                        console.log('result delete merge' + result)
                      }
                    } else { // Insert
                      console.log('insert Merge')
                      result = result.substr(0, diff.StartInsertPosition) + diff.newData + result.substr(diff.StartInsertPosition)
                      console.log('insert merge result: ' + result)
                      distanceDiff += diff.newData.length
                    }
                    that.$nextTick(() => {
                      // Nur die Caret Position wieder herstellen, wenn Caret auch in dem veränderten Knoten ist
                      that.restoreSelection(distanceDiff, result.substr(0, diff.StartInsertPosition).length, result.length)
                    })
                  }
                  node.data = result
                } else {
                  console.log('override')
                  node.data = newValue
                }
                return true
              }}
            )
            dd.apply(document.getElementById('paper'), diff)
            that.oldBody = that.$refs.paper.innerHTML
            that.oldBodySaving = that.$refs.paper.innerHTML
          }
        })

        this.socket.on('connect', () => {
          // Benutzer meldet sich an dem Dokument an
          this.joinRoom()
          this.addCaret(this.doc, this.socket.id)
          this.socketID = this.socket.id
        })

        this.socket.on('disconnectUser', function (data) {
          console.log(data['user'])
          let user = (data['user'])
          let userElement = document.getElementById(user)
          if (userElement) userElement.remove()
        })

        this.socket.on('updateUsers', function (data) {
          that.socketID = that.readUsername()
          let anotherUser = data['message']
          let innerhtml = ''
          let style = document.createElement('style')
          style.type = 'text/css'
          console.log(anotherUser)
          for (let i = 0; i < anotherUser.length; i++) {
            if (!(anotherUser[i]['username'] === that.readUsername())) {
              innerhtml = innerhtml + '.otherUser' + i + ' {background-color: ' + '}' // TODO randomize colors
              // TODO add class to div container
              // let paper = document.getElementById('paper')
              // let currentDiv = anotherUser[i]['positionCol']
              // console.log(currentDiv)
              // TODO set contenteditable for everyone and then remove it for the occupied ones
            }
          }
          style.innerHTML = innerhtml
          document.getElementsByTagName('head')[0].appendChild(style)
          let userList = document.createElement('ul')
          innerhtml = ''
          userList.type = 'text/html'
          userList.id = 'userList'
          for (let i = 0; i < anotherUser.length; i++) {
            if (!(anotherUser[i]['username'] === that.readUsername())) {
              innerhtml += '<li id="' + anotherUser[i]['username'] + '">User ' + (i + 1) + '</li>'
            } else {
              innerhtml += '<li id="' + that.readUsername() + '">BL_NK</li>'
            }
          }
          if (document.getElementById('userList')) {
            document.getElementById('userList').innerHTML = innerhtml
          } else {
            userList.innerHTML = innerhtml
            document.getElementById('barDiv').appendChild(userList)
          }
        })
      },
      async joinRoom () {
        console.log(this.doc.hash)
        this.socket.emit('room', 'docChannel_' + this.doc.hash)
      },
      async documentChanges (e, doc) {
        this.saving = true
        this.saveSelection()
        this.distributeChanges(e, doc)

        // mit dem Speichern warten bis der Benutzer keine Eingabe mehr macht
        window.clearTimeout(this.timeoutHandle)
        var that = this
        this.timeoutHandle = window.setTimeout(async function () {
          await that.savePaper(doc)
          that.saving = false
        }, 2000)
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
          // var paras = oldB.getElementsByClassName('caret')
          // while (paras[0]) {
          //   paras[0].parentNode.removeChild(paras[0])
          // }
          // paras = newB.getElementsByClassName('caret')
          // while (paras[0]) {
          //   paras[0].parentNode.removeChild(paras[0])
          // }
          var diff = dd.diff(oldB, newB)
          var diffJson = JSON.stringify(diff)
          this.socket.emit('savePaper', {difference: diffJson, hash: doc.hash})
          this.saving = false
        }
      },
      // Speichert die Position des Caret in einem Div
      saveSelection () {
        if (window.getSelection()) {
          var sel = window.getSelection()
          if (sel.getRangeAt && sel.rangeCount) {
            var range = window.getSelection().getRangeAt(0)
            var preSelectionRange = range.cloneRange()
            preSelectionRange.selectNodeContents(range.startContainer)
            preSelectionRange.setEnd(range.startContainer, range.startOffset)
            var start = preSelectionRange.toString().length
            this.savedSelection = {
              start: start,
              end: start + range.toString().length,
              nodeStart: range.startOffset,
              node: range.startContainer
            }
          }
        } else {
          this.savedSelection = null
        }
      },
      // Stellt die Position des Caret in einem Div wieder her
      restoreSelection (distanceDiff, position, textLength) {
        try {
          if (!this.savedSelection) return
          if (this.savedSelection.nodeStart < position) distanceDiff = 0
          var range = document.createRange()
          range.setStart(this.$refs.paper, 0)
          range.collapse(true)
          if (textLength >= this.savedSelection.end + distanceDiff) {
            range.setStart(this.savedSelection.node, this.savedSelection.start + distanceDiff)
            range.setEnd(this.savedSelection.node, this.savedSelection.end + distanceDiff)
          } else {
            range.setStart(this.savedSelection.node, textLength)
            range.setEnd(this.savedSelection.node, textLength)
          }
          var sel = window.getSelection()
          sel.removeAllRanges()
          sel.addRange(range)
          // let newNode = document.createElement('span')
          // newNode.classList.add('caret')
          // sel.getRangeAt(0).insertNode(newNode)
          this.saveSelection()
        } catch (e) {
          console.error(e)
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
      addCaret (doc, username) {
        console.log(username)
        let positionRow = this.readCaretPosition(doc.srcElement)
        let positionCol = this.getDivContainer()
        let user = {username, positionRow, positionCol}
        this.socket.emit('addCaret', {
          room: 'docChannel_' + this.doc.hash,
          event: 'addCaret',
          message: user,
          username: username
        })
      },
      getDivContainer () {
        let sel
        let range
        let sibling
        let gen
        let doc = document.getElementById('paper')
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
      },
      onScroll () {
        var barDiv = document.getElementById('barDiv')
        var scrollToTop = document.getElementById('scrollTop')
        var docIdent = document.getElementById('docIdent')
        window.onscroll = function () {
          if (document.body.scrollTop > 450 || document.documentElement.scrollTop > 450) {
            scrollToTop.style.visibility = 'visible'
            scrollToTop.style.opacity = '1'
          } else {
            scrollToTop.style.visibility = 'hidden'
            scrollToTop.style.opacity = '0'
          }
          if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
            docIdent.style.visibility = 'visible'
            docIdent.style.opacity = '1'
            barDiv.style.boxShadow = '0 .2rem 1rem rgba(0,0,0,.3)'
          } else {
            docIdent.style.visibility = 'hidden'
            docIdent.style.opacity = '0'
            barDiv.style.boxShadow = '0 1px 3px -2px gray'
          }
        }
      },
      async updateName () {
        this.socket.emit('titleChange', {
          room: 'docChannel_' + this.doc.hash,
          event: 'titleChange',
          message: this.doc.title
        })
        if (this.doc.hash) {
          await api.updateDoc(this.doc.hash, this.doc)
        }
      },
      editable () {
        var content = document.getElementById('paper')
        document.addEventListener('keydown', function (event) {
          if (event.keyCode === 16) {
            content.contentEditable = false
          }
        }, false)
        document.addEventListener('keyup', function (event) {
          if (event.keyCode === 16) {
            content.contentEditable = true
          }
        }, false)
      },
      menubarClose () {
        document.getElementById('barDiv').style.display = 'none'
        document.getElementById('menuClosed').style.display = 'inline'
      },
      menubarOpen () {
        document.getElementById('barDiv').style.display = 'flex'
        document.getElementById('menuClosed').style.display = 'none'
      }
    }
  }
</script>

<style scoped>
</style>

<style>
  body {
    background-color: #f3f2f1 !important;
  }

  main {
    height: 100%;
  }

  .caret {
    height: 10px;
    width: 3px;
    border: 1px solid red;
  }

  h1.docTitle {
    margin-top: 3rem !important;
    display: inline-block;
  }

  .saving-wrapper {
    position: fixed;
    bottom: 15px;
  }

  .saving {
    position: relative;
    display: flex;
    align-items: center;
    background-color: transparent;
    color: black;
    opacity: 0.9;
  }

  .spinner-saving {
    position: absolute !important;
    left: -6px;
    bottom: -6px;
  }

  .spinner-saving-desktop {
    display: inline !important;
  }

  .spinner-saving-mobile {
    display: none !important;
  }

  .error {
    float: right !important;
    position: -webkit-sticky !important; /* Safari */
    position: sticky !important;
    top: 2rem !important;
    z-index: 11 !important;
  }

  .sticky {
    position: -webkit-sticky; /* Safari */
    position: sticky;
    top: 0;
    background-color: #f3f2f1;
    padding: 0 0 0.7rem 0;
    box-shadow: 0 1px 3px -2px gray;
    z-index: 1;
  }

  #barDiv {
    transition: 0.2s;
    padding-left: 1rem;
    overflow: hidden;
  }

  #closeBtn {
    position: absolute;
    right: 1rem;
    top: 1rem;
    margin: 0;
  }

  #closeBtn img {
    transition: 0.2s;
  }

  #closeBtn:hover img {
    /* transform: rotate(90deg); */
  }

  #mobileBar {
    display: none;
  }

  #menuMobile {
    display: none;
    position: absolute;
    top: 9px;
    right: 9px;
  }

  .darkSidebar button {
    background-color: #343a40;
  }

  #sidebar button {
    padding: 0.375rem 0.6rem;
  }

  #paper {
    min-height: 1200px;
    padding: 120px;
    background-color: white;
    margin-top: 1rem;
    z-index: 200;
    word-wrap: break-word;
  }

  #paper a {
    /*cursor: pointer;*/ /*Nur Pointer, wenn man Link auch per Klick öffnen kann*/
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
    padding: 0 1.5rem 0 1.1rem;
    /*padding: 0 1.4rem 0 2.8rem !important;*/
    justify-content: left !important;
  }

  .md-list-item-content p {
    margin: 0;
  }

  .md-divider {
    margin: 0.5rem !important;
    opacity: 0.8 !important;
  }

  .md-item-empty {
    height: 10px;
    padding-right: 18px;
    margin-right: 13px;
  }

  .md-item-filled img, .md-item-filled div {
    height: 19px;
    width: 19px;
    margin-right: 12px;
  }

  .dialog {
    text-align: center;
    width: 30rem;
    padding: 0 2rem;
  }

  form {
    width: 100% !important;
  }

  #editName {
    width: 1.1rem;
    vertical-align: 0;
    cursor: pointer;
    transition: 0.2s;
    display: none;
  }

  h1.docTitle:hover #editName {
    /* transform: rotate(45deg); */
  }

  #menubarClose {
    position: absolute;
    right: 15px;
    bottom: 5px;
    width: 20px;
    height: 20px;
    cursor: pointer;
  }

  .menubarOpenWrapper {
    position: -webkit-sticky; /* Safari */
    position: sticky;
    top: 0;
    width: 100%;
  }

  #menuClosed {
    float: right;
    display: none;
    cursor: pointer;
    z-index: 1;
    padding: 0 5px 0px 5px;
    margin: 15px 0 0 0;
  }

  #menuClosed i {
    color: black;
  }

  #menuClosed img {
    -webkit-filter: invert(1); /* Safari 6.0 - 9.0 */
    filter: invert(1);
    height: 20px;
    width: 20px;
    margin-bottom: 3px;
  }

  #containerSpinner {
    display: inline-block;
    margin-right: 10px;
  }

  #userList {
    position: absolute;
    right: 7%;
    top: -25px;
    transition: .2s;
    padding: 0.5rem 0.5rem 1.6rem 3rem;
    z-index: 500;
    border-bottom-left-radius: 1rem;
  }

  #userList:hover {
    transform: translateY(25px);
    background-color: rgba(243, 242, 241, 0.4);
    padding: 0.5rem;
  }

  #userList li {
    list-style: none;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    border-radius: 17px;
    border-left: 11px solid white;
    border-right: 11px solid white;
    font-size: 12px;
    font-weight: 400;
    cursor: pointer;
    overflow: hidden;
    white-space: nowrap;
    width: 34px;
    height: 34px;
    background-color: #fff;
    transition: .2s;
    box-shadow: 0 .2rem .25rem rgba(0,0,0,.1);
    position: relative;
    color: transparent;
  }

  #userList:hover li {
    width: 65px;
    margin-right: 13px;
  }

  #userList li:hover {
    box-shadow: 0 .2rem .3rem rgba(0,0,0,.2);
  }

  #userList li:first-child {
    background-color: #ffb2b2;
    border-color: #ffb2b2;
  }
  #userList:hover li:first-child {
    color: #330000;
  }

  #userList li:nth-child(2) {
    background-color: #b2b2ff;
    border-color: #b2b2ff;
    left: -8px;
  }
  #userList:hover li:nth-child(2) {
    color: #000033;
  }

  #userList li:nth-child(3) {
    background-color: #b2d8b2;
    border-color: #b2d8b2;
    left: -16px;
  }
  #userList:hover li:nth-child(3) {
    color: #001900;
  }

  #userList li:nth-child(4) {
    background-color: #ffff99;
    border-color: #ffff99;
    left: -24px;
  }
  #userList:hover li:nth-child(4) {
    color: #332b00;
  }

  #userList li:nth-child(5) {
    background-color: #d8b2d8;
    border-color: #d8b2d8;
    left: -32px;
  }
  #userList:hover li:nth-child(5) {
    color: #190019;
  }

  #userList li:nth-child(6) {
    background-color: #ffd27f;
    border-color: #ffd27f;
    left: -40px;
  }
  #userList:hover li:nth-child(6) {
    color: #332100;
  }

  #userList li:nth-child(7) {
    background-color: #b2f4fe;
    border-color: #b2f4fe;
    left: -48px;
  }
  #userList:hover li:nth-child(7) {
    color: #002c32;
  }



  @media (max-width: 991px) {
    #paper {
      padding: 4rem;
      min-height: 110vh;
    }
  }

  #sidebar button {
    padding: 0.375rem 0.6rem;
    top: 10px;
    right: 10px;
  }


  @media (max-width: 767px) {
    h1.docTitle {
      margin: 0 !important;
      margin-top: 1rem !important;
      font-size: 1.7rem !important;
    }
    .saving-wrapper {
      padding: 0 7px;
      bottom: 7px;
    }
    #paper {
      padding: 2rem;
      min-height: 90vh;
    }
    .container-fluid {
      padding: 0 !important;
    }
    .ribbon, .md-tooltip, #menuClosed {
      display: none !important;
    }
    #menuMobile, #mobileBar {
      display: inline;
    }
    h1.docTitle:hover #editName {
      transform: none;
    }
  }


  @media (max-width: 430px) {
    #paper {
      padding: 1rem;
    }
    .saving i {
       font-size: 1.1rem;
    }
    .spinner-saving-desktop {
      display: none !important;
    }
    .spinner-saving-mobile {
      display: inline !important;
    }
  }


  @media print {
    .sticky, #editName, #sidebar, .saving, .menu-content, #scrollTop, #footer {
      display: none !important;
    }
    * {
      background-color: #fff !important;
    }
    h1.docTitle {
      margin-top: 0 !important;
      font-size: 1rem !important;
    }
    h1.docTitle::before {
      content: "Dokument: "
    }
    #paper {
      padding: 2.9rem !important;
    }
    #paper, .my-3, .rounded, .shadow-lg, .paper {
      -webkit-box-shadow: none !important;
      -moz-box-shadow: none !important;
      box-shadow: none !important;
    }
  }
</style>
