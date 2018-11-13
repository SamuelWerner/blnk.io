<template>
  <main class="container" style="height:100%">
    <div class="row">
      <div class="col-md-9 order-md-1 order-2">
        <div class="btn-group btn-group-sm" role="group" aria-label="Basic example">
          <md-menu md-size="small" md-align-trigger >
            <button md-menu-trigger  type="button" class="btn btn-light">Datei</button>

            <md-menu-content class="menu-content">
              <md-menu-item @click="" disabled>Freigeben</md-menu-item>
              <md-menu-item @click="" disabled>Neu</md-menu-item>
              <md-menu-item @click="" disabled>Öffnen</md-menu-item>
              <md-menu-item @click="" disabled>Kopie erstellen</md-menu-item>
              <md-menu-item @click="" disabled>Herunterladen</md-menu-item>
              <md-menu-item @click="showDialogRename = true">Umbenennen</md-menu-item>
              <md-menu-item @click="" disabled>Verschieben nach</md-menu-item>
              <md-menu-item @click="" disabled>Löschen</md-menu-item>
              <md-menu-item @click="" disabled>Seiteneinrichtung</md-menu-item>
              <md-menu-item @click="" disabled>Drucken</md-menu-item>
            </md-menu-content>
          </md-menu>
          <md-menu md-size="small" md-align-trigger >
            <button md-menu-trigger type="button" class="btn btn-light">Bearbeiten</button>

            <md-menu-content class="menu-content">
              <md-menu-item @click="" disabled>Rückgängig machen</md-menu-item>
              <md-menu-item @click="" disabled>Wiederholen</md-menu-item>
              <md-menu-item @click="" disabled>Ausschneiden</md-menu-item>
              <md-menu-item @click="" disabled>Kopieren</md-menu-item>
              <md-menu-item @click="" disabled>Einfügen</md-menu-item>
              <md-menu-item @click="" disabled>Löschen</md-menu-item>
              <md-menu-item @click="markieren('paper')">Alles auswählen</md-menu-item>
            </md-menu-content>
          </md-menu>
          <md-menu md-size="small" md-align-trigger >
            <button md-menu-trigger type="button" class="btn btn-light">Ansicht</button>

            <md-menu-content class="menu-content">
              <md-menu-item @click="" disabled></md-menu-item>
            </md-menu-content>
          </md-menu>
          <md-menu md-size="small" md-align-trigger >
            <button md-menu-trigger type="button" class="btn btn-light">Einfügen</button>

            <md-menu-content class="menu-content">
              <md-menu-item @click="" disabled></md-menu-item>
            </md-menu-content>
          </md-menu>
          <md-menu md-size="small" md-align-trigger >
            <button md-menu-trigger type="button" class="btn btn-light">Format</button>

            <md-menu-content class="menu-content">
              <md-menu-item @click="" disabled></md-menu-item>
            </md-menu-content>
          </md-menu>
          <md-menu md-size="small" md-align-trigger >
            <button md-menu-trigger type="button" class="btn btn-light">Tools</button>

            <md-menu-content class="menu-content">
              <md-menu-item @click="" disabled></md-menu-item>
            </md-menu-content>
          </md-menu>
          </div>
        <br>
        <div class="btn-group btn-group-sm" role="group" aria-label="Basic example">
          <button type="button" class="btn btn-light"> <img class="fktstripImg" src="../assets/baseline-undo-24px.svg" /> </button>
          <button type="button" class="btn btn-light"> <img class="fktstripImg" src="../assets/baseline-redo-24px.svg" /> </button>
          <button type="button" class="btn btn-light"> <img class="fktstripImg" src="../assets/baseline-print-24px.svg" /> </button>
          <button type="button" class="btn btn-light"> <img class="fktstripImg" src="../assets/baseline-format_paint-24px.svg" /> </button>
        </div>
        <div class="btn-group btn-group-sm" role="group" aria-label="Basic example">
          <button type="button" class="btn btn-light" @click="makeBold"> <img class="fktstripImg" src="../assets/baseline-format_bold-24px.svg" /> </button>
          <button type="button" class="btn btn-light" @click="makeItalic"> <img class="fktstripImg" src="../assets/baseline-format_italic-24px.svg" /> </button>
          <button type="button" class="btn btn-light" @click="makeUnderline"> <img class="fktstripImg" src="../assets/baseline-format_underlined-24px.svg" /> </button>
          <button type="button" class="btn btn-light" @click="makeStrikeThrough"> <img class="fktstripImg" src="../assets/baseline-strikethrough_s-24px.svg" /> </button>
        </div>
        <div class="btn-group btn-group-sm" role="group" aria-label="Basic example">
          <button type="button" class="btn btn-light"> <img class="fktstripImg" src="../assets/baseline-format_align_left-24px.svg" /> </button>
          <button type="button" class="btn btn-light"> <img class="fktstripImg" src="../assets/baseline-format_align_center-24px.svg" /> </button>
          <button type="button" class="btn btn-light"> <img class="fktstripImg" src="../assets/baseline-format_align_right-24px.svg" /> </button>
          <button type="button" class="btn btn-light"> <img class="fktstripImg" src="../assets/baseline-format_align_justify-24px.svg" /> </button>
        </div>
        <div class="btn-group btn-group-sm" role="group" aria-label="Basic example">
          <button type="button" class="btn btn-light"> <img class="fktstripImg" src="../assets/baseline-format_line_spacing-24px.svg" /> </button>
        </div>
        <div class="btn-group btn-group-sm" role="group" aria-label="Basic example">
          <button type="button" class="btn btn-light"> <img class="fktstripImg" src="../assets/baseline-format_list_numbered-24px.svg" /> </button>
          <button type="button" class="btn btn-light"> <img class="fktstripImg" src="../assets/baseline-format_list_bulleted-24px.svg" /> </button>
          <button type="button" class="btn btn-light"> <img class="fktstripImg" src="../assets/baseline-format_indent_decrease-24px.svg" /> </button>
          <button type="button" class="btn btn-light"> <img class="fktstripImg" src="../assets/baseline-format_indent_increase-24px.svg" /> </button>
        </div>
        <div class="btn-group btn-group-sm" role="group" aria-label="Basic example">
          <button type="button" class="btn btn-light"> <img class="fktstripImg" src="../assets/baseline-format_clear-24px.svg" /> </button>
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
      <div class="col-md-3 order-md-2 order-1">
        <md-button style="float: right" type="button" to="/" class="md-default md-raised md-dense">zurück</md-button>
        <!--<md-button style="float: right" type="button" @click="showDialogRename = true" class="md-default md-raised md-dense">umbenennen</md-button>-->
      </div>
    </div>

    <md-dialog class="dialog" :md-active.sync="showDialogRename">
      <md-dialog-title>Neuen Namen eingeben</md-dialog-title>

      <md-field class="inputBox">
        <form id="form" @submit.prevent="updateName">
          <label>Titel eingeben...</label><md-input type="text" v-model="doc.title" maxlength="30"></md-input>
        </form>
      </md-field>

      <md-dialog-actions>
        <md-button class="md-primary" @click="showDialogRename = false">Abbruch</md-button>
        <md-button class="md-primary" @click="showDialogRename = false" type="submit" form="form">Umbenennen</md-button>
      </md-dialog-actions>
    </md-dialog>

    <h1 style="margin-top: 3rem;">{{ doc.title }}</h1> {{ rename }}     <b-alert class="saving" :show="saveAlert" variant="info">speichert...</b-alert>
    <div style="outline:none" contenteditable="true"
       id="paper"
       class="my-3 bg-white rounded shadow-lg paper"
       @input="onDivInput($event, doc)"
       v-html="body" :disabled="1">
    </div>

  </main>
</template>


<script>
  import api from '@/api'
  import io from 'socket.io-client'

  export default {
    name: 'Paper',
    data () {
      return {
        name: 'Delay',
        showDialogRename: false,
        doc: [],
        model: {},
        body: [],
        saving: false,
        saveAlert: false,
        rename: '',
        socket: null
      }
    },
    async created () {
      this.refreshDocs()
    },

    methods: {
      async newSocket (id, doc) {
        console.log('new socket' + id + ', Node_env: ' + process.env.NODE_ENV)

        if (process.env.NODE_ENV === 'development') {
          this.socket = io('http://localhost:8080')
        } else {
          this.socket = io('https://blnk-io.herokuapp.com/')
        }

        this.socket.on('docChannel_' + id + '_newTitle', function (data) {
          doc.title = data
        })
      },
      async updateName () {
        this.socket.emit('newTitle', {room: 'docChannel_' + this.doc.id + '_newTitle', message: this.doc.title})
        if (this.doc.id) {
          await api.updateDoc(this.doc.id, this.doc)
        }
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
        if (this.saving) return
        if (doc.id) {
          this.saving = true
          await this.Sleep(3000)
          this.saveAlert = true
          doc.body = e.target.innerHTML
          await api.updateDoc(doc.id, doc)
          await this.Sleep(1000)
          this.saveAlert = false
          this.saving = false
        }
      },
      Sleep (milliseconds) {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
      },
      markieren (elementId) {
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
      }
    }
  }
</script>

<style>
  main, main{
    height: 100%;
  }

  body{
    background-color:#f3f2f1;
  }

  .saving {
    display: inline;
    float: right;
    top: -55px;
  }

  .container {
    padding-top: 0.5rem;
  }

  .paper {
    min-height:1000px;
    padding: 110px !important;
  }

  .btn-group {
    margin: 6px 0.3rem 0rem 0;
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
    margin-bottom: 1px;
  }

  .md-list-item-container {
    font-size: 0.875rem;
    padding: 0;
  }

  .md-list-item-content {
    min-height: 35px;
    padding: 0 1.4rem 0 2.8rem;
  }

  .menu-content {
    max-height: 1000rem;
  }

  .md-layout-item {
    width: 8rem;
  }

</style>
