<template>
  <main class="container-fluid" style="height:100%">
    <div class="row sticky">
      <div class="col-md-11 order-md-1 order-2">
        <!-- Menüleiste -->
        <div class="btn-group btn-group-sm" role="group" aria-label="Basic example">
          <!-- Datei -->
          <md-menu md-size="small" class="btn-fmenu" md-align-trigger >
            <md-button md-menu-trigger  type="button" class="md-default md-raised md-dense">Datei</md-button>

            <md-menu-content class="menu-content">
              <md-menu-item @click="" disabled>Freigeben</md-menu-item>
              <md-menu-item @click="" disabled>Neu</md-menu-item>
              <md-menu-item @click="" to="/">Öffnen</md-menu-item>
              <md-menu-item @click="" disabled>Kopie erstellen</md-menu-item>
              <md-menu-item @click="" disabled>Herunterladen</md-menu-item>
              <md-menu-item @click="showDialogRename = true">Umbenennen</md-menu-item>
              <md-menu-item @click="" disabled>Verschieben nach</md-menu-item>
              <md-menu-item @click="" disabled>Löschen</md-menu-item>
              <md-menu-item @click="showDialogPage = true" >Seiteneinrichtung</md-menu-item>
              <md-menu-item @click="" disabled>Drucken</md-menu-item>
            </md-menu-content>
          </md-menu>
          <!-- Bearbeiten -->
          <md-menu md-size="small" class="btn-fmenu" md-align-trigger >
            <md-button md-menu-trigger  type="button" class="md-default md-raised md-dense">Bearbeiten</md-button>

            <md-menu-content class="menu-content">
              <md-menu-item @click="undo" >Rückgängig machen</md-menu-item>
              <md-menu-item @click="redo" >Wiederholen</md-menu-item>
              <md-menu-item @click="cut" >Ausschneiden</md-menu-item>
              <md-menu-item @click="copy" >Kopieren</md-menu-item>
              <md-menu-item @click="paste" disabled>Einfügen</md-menu-item>
              <md-menu-item @click="" disabled>Löschen</md-menu-item>
              <md-menu-item @click="markieren('paper')">Alles auswählen</md-menu-item>
            </md-menu-content>
          </md-menu>
          <!-- Ansicht -->
          <md-menu md-size="small" class="btn-fmenu" md-align-trigger >
            <md-button md-menu-trigger  type="button" class="md-default md-raised md-dense">Ansicht</md-button>

            <md-menu-content class="menu-content">
              <md-menu-item @click="" disabled></md-menu-item>
            </md-menu-content>
          </md-menu>
          <!-- Einfügen -->
          <md-menu md-size="small" class="btn-fmenu" md-align-trigger >
            <md-button md-menu-trigger  type="button" class="md-default md-raised md-dense">Einfügen</md-button>

            <md-menu-content class="menu-content">
              <md-menu-item @click="insertHorizontalRule">Horizontale Linie</md-menu-item>
            </md-menu-content>
          </md-menu>
          <!-- Format -->
          <md-menu md-size="small" class="btn-fmenu" md-align-trigger >
            <md-button md-menu-trigger  type="button" class="md-default md-raised md-dense">Format</md-button>

            <md-menu-content class="menu-content">
              <md-menu-item @click="" disabled></md-menu-item>
            </md-menu-content>
          </md-menu>
          <!-- Tools -->
          <md-menu md-size="small" class="btn-fmenu" md-align-trigger >
            <md-button md-menu-trigger  type="button" class="md-default md-raised md-dense">Tools</md-button>

            <md-menu-content class="menu-content">
              <md-menu-item @click="" disabled></md-menu-item>
            </md-menu-content>
          </md-menu>
          </div>
        <br>
        <!-- Toolleiste -->
        <div class="btn-group btn-group-sm" role="group" aria-label="Basic example">
          <button type="button" class="btn btn-light btn-tmenu" @click="undo">
            <md-tooltip md-delay="300">Rückgängig machen</md-tooltip>
            <img class="fktstripImg" src="../assets/baseline-undo-24px.svg" />
          </button>
          <button type="button" class="btn btn-light btn-tmenu" @click="redo">
            <md-tooltip md-delay="300">Wiederholen</md-tooltip>
            <img class="fktstripImg" src="../assets/baseline-redo-24px.svg" />
          </button>
          <button type="button" class="btn btn-light btn-tmenu">
            <md-tooltip md-delay="300">Drucken</md-tooltip>
            <img class="fktstripImg" src="../assets/baseline-print-24px.svg" />
          </button>
          <button type="button" class="btn btn-light btn-tmenu">
            <md-tooltip md-delay="300">Format übertragen</md-tooltip>
            <img class="fktstripImg" src="../assets/baseline-format_paint-24px.svg" />
          </button>
        </div>
        <div class="btn-group btn-group-sm" role="group" aria-label="Basic example">
          <button type="button" class="btn btn-light btn-tmenu" @click="makeBold">
            <md-tooltip md-delay="300">Fett</md-tooltip>
            <img class="fktstripImg" src="../assets/baseline-format_bold-24px.svg" />
          </button>
          <button type="button" class="btn btn-light btn-tmenu" @click="makeItalic">
            <md-tooltip md-delay="300">Kursiv</md-tooltip>
            <img class="fktstripImg" src="../assets/baseline-format_italic-24px.svg" />
          </button>
          <button type="button" class="btn btn-light btn-tmenu" @click="makeUnderline">
            <md-tooltip md-delay="300">Unterstrichen</md-tooltip>
            <img class="fktstripImg" src="../assets/baseline-format_underlined-24px.svg" />
          </button>
          <button type="button" class="btn btn-light btn-tmenu" @click="makeStrikeThrough">
            <md-tooltip md-delay="300">Durchgestrichen</md-tooltip>
            <img class="fktstripImg" src="../assets/baseline-strikethrough_s-24px.svg" />
          </button>
        </div>
        <div class="btn-group btn-group-sm" role="group" aria-label="Basic example">
          <button type="button" class="btn btn-light btn-tmenu" @click="subscript">
            <md-tooltip md-delay="300">Tiefgestellt</md-tooltip>
            <img class="fktstripImg" src="../assets/baseline-keyboard_arrow_down-24px.svg" />
          </button>
          <button type="button" class="btn btn-light btn-tmenu" @click="superscript">
            <md-tooltip md-delay="300">Hochgestellt</md-tooltip>
            <img class="fktstripImg" src="../assets/baseline-keyboard_arrow_up-24px.svg" />
          </button>
        </div>
        <div class="btn-group btn-group-sm" role="group" aria-label="Basic example">
          <button type="button" class="btn btn-light btn-tmenu" @click="createLink">
            <md-tooltip md-delay="300">Link einfügen</md-tooltip>
            <img class="fktstripImg" src="../assets/baseline-insert_link-24px.svg" />
          </button>
        </div>
        <div class="btn-group btn-group-sm" role="group" aria-label="Basic example">
          <button type="button" class="btn btn-light btn-tmenu" @click="justifyLeft">
            <md-tooltip md-delay="300">Linksbündig</md-tooltip>
            <img class="fktstripImg" src="../assets/baseline-format_align_left-24px.svg" />
          </button>
          <button type="button" class="btn btn-light btn-tmenu" @click="justifyCenter">
            <md-tooltip md-delay="300">Zentriert</md-tooltip>
            <img class="fktstripImg" src="../assets/baseline-format_align_center-24px.svg" />
          </button>
          <button type="button" class="btn btn-light btn-tmenu" @click="justifyRight">
            <md-tooltip md-delay="300">Rechtsbündig</md-tooltip>
            <img class="fktstripImg" src="../assets/baseline-format_align_right-24px.svg" />
          </button>
          <button type="button" class="btn btn-light btn-tmenu" @click="justifyFull">
            <md-tooltip md-delay="300">Blocksatz</md-tooltip>
            <img class="fktstripImg" src="../assets/baseline-format_align_justify-24px.svg" />
          </button>
        </div>
        <div class="btn-group btn-group-sm" role="group" aria-label="Basic example">
          <md-menu md-size="small" md-align-trigger  >
            <md-tooltip md-delay="300">Zeilenabstand</md-tooltip>
            <button md-menu-trigger type="button" class="btn btn-light btn-tmenu" > <img class="fktstripImg" src="../assets/baseline-format_line_spacing-24px.svg" /> </button>

            <md-menu-content class="menu-content">
              <md-menu-item @click="lineHight(1)" disabled>Einfach</md-menu-item>
              <md-menu-item @click="lineHight(1.15)" disabled>1,15</md-menu-item>
              <md-menu-item @click="lineHight(1.5)" disabled>1,5</md-menu-item>
              <md-menu-item @click="lineHight(2)" disabled>Doppelt</md-menu-item>
              <md-menu-item @click="" disabled></md-menu-item>
              <md-menu-item @click="" disabled>Abstand vor Absatz einfügen</md-menu-item>
              <md-menu-item @click="" disabled>Abstand nach Absatz einfügen</md-menu-item>
              <md-menu-item @click="" disabled>Benutzerdefiniert</md-menu-item>

            </md-menu-content>
          </md-menu>
        </div>
        <div class="btn-group btn-group-sm" role="group" aria-label="Basic example">
          <button type="button" class="btn btn-light btn-tmenu" @click="insertOrderedList">
            <md-tooltip md-delay="300">Nummerierte Liste</md-tooltip>
            <img class="fktstripImg" src="../assets/baseline-format_list_numbered-24px.svg" />
          </button>
          <button type="button" class="btn btn-light btn-tmenu" @click="insertUnorderedList">
            <md-tooltip md-delay="300">Aufzählungsliste</md-tooltip>
            <img class="fktstripImg" src="../assets/baseline-format_list_bulleted-24px.svg" />
          </button>
          <button type="button" class="btn btn-light btn-tmenu" @click="outdent">
            <md-tooltip md-delay="300">Einzug verkleinern</md-tooltip>
            <img class="fktstripImg" src="../assets/baseline-format_indent_decrease-24px.svg" />
          </button>
          <button type="button" class="btn btn-light btn-tmenu" @click="indent">
            <md-tooltip md-delay="300">Einzug vergrößern</md-tooltip>
            <img class="fktstripImg" src="../assets/baseline-format_indent_increase-24px.svg" />
          </button>
        </div>
        <div class="btn-group btn-group-sm" role="group" aria-label="Basic example">
          <button type="button" class="btn btn-light btn-tmenu" @click="removeFormat">
            <md-tooltip md-delay="300">Formatierung entfernen</md-tooltip>
            <img class="fktstripImg" src="../assets/baseline-format_clear-24px.svg" />
          </button>
        </div>
        <div class="btn-group btn-group-sm" role="group" aria-label="Basic example">
          <button type="button" class="btn btn-light btn-tmenu" @click="insertText"> </button>
        </div>
        <!--
        <div class="btn-group btn-group-sm" role="group" aria-label="Basic example">
          <div class="md-layout-item">
            <md-field class="">
              <md-select v-model="font" name="font" id="font" placeholder="Font">
                <md-option value="arial">Arial</md-option>
                <md-option value="calibri">Calibri</md-option>
                <md-option value="cambria">Cambria</md-option>
                <md-option value="comic-sans">Comic Sans</md-option>
                <md-option value="consolas">Consolas</md-option>
                <md-option value="courier">Courier</md-option>
                <md-option value="droid-sans">Droid Sans</md-option>
                <md-option value="georgia">Georgia</md-option>
                <md-option value="helvetica">Helvetica</md-option>
                <md-option value="impact">Impact</md-option>
                <md-option value="roboto">Roboto</md-option>
                <md-option value="segoe-ui">Segoe UI</md-option>
                <md-option value="times-new-roman">Times New Roman</md-option>
                <md-option value="ubuntu">Ubuntu</md-option>
                <md-option value="verdana">Verdana</md-option>
              </md-select>
            </md-field>
          </div>
        </div>
        -->
      </div>

      <div class="col-md-1 order-md-2 order-1">
        <md-button style="float: right; margin-top: 0.7rem" type="button" to="/" class="md-icon-button md-raised">
          <img class="fktstripImg" style="margin: 0" src="../assets/baseline-cancel-24px.svg" />
        </md-button>
        <!--<md-button style="float: right" type="button" @click="showDialogRename = true" class="md-default md-raised md-dense">umbenennen</md-button>-->

      </div>
    </div>

    <md-dialog class="dialog" :md-active.sync="showDialogRename">
      <md-dialog-title>Neuen Namen eingeben</md-dialog-title>

      <md-field>
        <form id="form" @submit.prevent="updateName">
          <label>Titel eingeben...</label><md-input type="text" v-model="doc.title" maxlength="30"></md-input>
        </form>
      </md-field>

      <md-dialog-actions>
        <md-button class="md-primary" @click="showDialogRename = false">Abbruch</md-button>
        <md-button class="md-primary" @click="showDialogRename = false" type="submit" form="form">Umbenennen</md-button>
      </md-dialog-actions>
    </md-dialog>

    <md-dialog class="dialog" :md-active.sync="showDialogPage">
      <md-dialog-title>Seitenränder und -farbe ändern</md-dialog-title>

      <div class="md-layout md-gutter">
        <div class="md-layout-item">
          <md-field>
            <label :for="pagecolor">Seitenfarbe</label>
            <md-select v-model="pagecolor" name="pagecolor" id="pagecolor">
              <md-option value="red">Rot</md-option>
              <md-option value="blue">Blau</md-option>
              <md-option value="yellow">Gelb</md-option>
              <md-option value="green">Grün</md-option>
              <md-option value="black">Schwarz</md-option>
              <md-option value="white">Weiß</md-option>
            </md-select>
          </md-field>
        </div>
      </div>

      <md-dialog-actions>
        <md-button class="md-primary" @click="showDialogPage = false">Abbruch</md-button>
        <md-button class="md-primary" @click="showDialogPage = false; pagecolor = value" type="submit" form="form2">Übernehmen</md-button>
      </md-dialog-actions>
    </md-dialog>

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

  const usernames = {}

  const positions = {}

  export default {
    name: 'Paper',
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
        pagecolor: 'white',
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
      async updateName () {
        this.socket.emit('titleChange', {
          room: 'docChannel_' + this.doc.id,
          event: 'titleChange',
          message: this.doc.title
        })
        if (this.doc.id) {
          await api.updateDoc(this.doc.id, this.doc)
        }
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
      markieren (elementId) { /* selectAll?? */
        var elem = document.getElementById(elementId)
        if (document.selection && document.selection.createRange) {
          var textRange = document.selection.createRange()
          textRange.moveToElementText(elem)
          textRange.select()
        } else if (document.createRange && window.getSelection) {
          var range = document.createRange()
          range.selectNode(elem)
          var selection = window.getSelection()
          selection.removeAllRanges()
          selection.addRange(range)
        }
      },
      undo () {
        document.execCommand('undo', false, null)
      },
      redo () {
        document.execCommand('redo', false, null)
      },
      cut () {
        document.execCommand('cut', false, null)
      },
      copy () {
        document.execCommand('copy', false, null)
      },
      paste () {
        document.execCommand('paste', false, null)
      },
      makeBold () {
        document.execCommand('bold', false, null)
      },
      makeItalic () {
        document.execCommand('italic', false, null)
      },
      makeUnderline () {
        document.execCommand('underline', false, null)
      },
      makeStrikeThrough () {
        document.execCommand('strikeThrough', false, null)
      },
      insertHorizontalRule () {
        document.execCommand('insertHorizontalRule', false, null)
      },
      insertOrderedList () {
        document.execCommand('insertOrderedList', false, null)
      },
      insertUnorderedList () {
        document.execCommand('insertUnorderedList', false, null)
      },
      justifyCenter () {
        document.execCommand('justifyCenter', false, null)
      },
      justifyFull () {
        document.execCommand('justifyFull', false, null)
      },
      justifyLeft () {
        document.execCommand('justifyLeft', false, null)
      },
      justifyRight () {
        document.execCommand('justifyRight', false, null)
      },
      removeFormat () {
        document.execCommand('removeFormat', false, null)
      },
      subscript () {
        document.execCommand('subscript', false, null)
      },
      superscript () {
        document.execCommand('superscript', false, null)
      },
      indent () {
        document.execCommand('indent', false, null)
      },
      outdent () {
        document.execCommand('outdent', false, null)
      },
      insertText () {
        document.execCommand('insertText', false, 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. \n' +
          '\n' + 'Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. \n')
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
    float: right;
    position: -webkit-sticky; /* Safari */
    position: sticky;
    top: 2rem;
    z-index: 10;
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

  .btn-group {
    margin: 0.7rem 0.1rem 0 0;
  }

  .dialog {
    text-align: center;
    width: 30rem;
    padding: 0 2rem;
  }

  input {
    width: 416px;
  }

  .fktstripImg {
    height: 21px !important;
    width: 21px !important;
    margin-bottom: 1px;
  }

  .md-list-item-container {
    font-size: 0.875rem !important;
    padding: 0 !important;
  }

  .md-list-item-content {
    min-height: 35px !important;
    padding: 0 1.4rem 0 2.8rem !important;
  }

  .menu-content {
    max-height: 1000rem;
  }

  .md-layout-item {
    width: 8rem;
  }

  .btn-fmenu {
    margin-right: 3px;
  }

  .btn-tmenu {
    width: 40px;
    height: 36px;
    background-color: white !important;
    border: white;
  }

  sub, sup {
    position: relative;
  }

</style>
