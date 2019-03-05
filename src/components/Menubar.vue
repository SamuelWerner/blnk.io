<template>
    <main>
      <div class="btn-group btn-group-sm" role="group" aria-label="Basic example">
        <!-- Datei -->
        <md-menu md-size="small" class="btn-fmenu" md-align-trigger>
          <md-button md-menu-trigger type="button" class="md-default md-raised md-dense">Datei</md-button>

          <md-menu-content class="menu-content">
            <md-menu-item @click="" disabled><div class="md-item-empty"></div>Freigeben</md-menu-item><md-divider></md-divider>
            <md-menu-item @click="" disabled><div class="md-item-filled"><img style="opacity: 0.2" src="../assets/outline-insert_drive_file-24px.svg" /></div>Neu</md-menu-item>
            <md-menu-item @click="" href="/"><div class="md-item-filled"><img src="../assets/outline-folder_open-24px.svg" /></div>Öffnen</md-menu-item>
            <md-menu-item @click="showDialogCopyDokument = true"><div class="md-item-filled"><img src="../assets/outline-file_copy-24px.svg" /></div>Kopie erstellen</md-menu-item>
            <md-menu-item @click="" disabled><div class="md-item-empty"></div>Herunterladen</md-menu-item>
            <md-divider></md-divider>
            <md-menu-item @click="showDialogRename = true"><div class="md-item-filled"><img src="../assets/outline-create-24px.svg" /></div>Umbenennen</md-menu-item>
            <md-menu-item @click="" disabled><div class="md-item-empty"></div>Verschieben nach</md-menu-item>
            <md-menu-item @click="" disabled><div class="md-item-filled"><img style="opacity: 0.2" src="../assets/baseline-delete-24px.svg" /></div>Löschen</md-menu-item>
            <md-divider></md-divider>
            <md-menu-item @click="showDialogPage = true" disabled><div class="md-item-empty"></div>Seiteneinrichtung</md-menu-item>
            <md-menu-item @click="print" ><div class="md-item-filled"><img src="../assets/outline-print-24px.svg" /></div>Drucken</md-menu-item>
          </md-menu-content>
        </md-menu>
        <!-- Bearbeiten -->
        <md-menu md-size="small" class="btn-fmenu" md-align-trigger >
          <md-button md-menu-trigger  type="button" class="md-default md-raised md-dense">Bearbeiten</md-button>

          <md-menu-content class="menu-content">
            <md-menu-item @click="undo" ><div class="md-item-filled"><img src="../assets/baseline-undo-24px.svg" /></div>Rückgängig machen</md-menu-item>
            <md-menu-item @click="redo" ><div class="md-item-filled"><img src="../assets/baseline-redo-24px.svg" /></div>Wiederholen</md-menu-item>
            <md-divider></md-divider>
            <md-menu-item @click="cut" ><div class="md-item-empty"></div>Ausschneiden</md-menu-item>
            <md-menu-item @click="copy" ><div class="md-item-filled"><img src="../assets/outline-file_copy-24px.svg" /></div>Kopieren</md-menu-item>
            <md-menu-item @click="paste" disabled><div class="md-item-empty"></div>Einfügen</md-menu-item>
            <md-menu-item @click="deleteFrom" ><div class="md-item-filled"><img src="../assets/baseline-delete-24px.svg" /></div>Markiertes löschen</md-menu-item>
            <md-menu-item @click="selectAll"><!--markieren('paper')--><div class="md-item-empty"></div>Alles auswählen</md-menu-item>
          </md-menu-content>
        </md-menu>
        <!-- Ansicht -->
        <md-menu md-size="small" class="btn-fmenu" md-align-trigger >
          <md-button md-menu-trigger type="button" class="md-default md-raised md-dense">Ansicht</md-button>

          <md-menu-content class="menu-content">
            <md-menu-item @click="" v-scroll-to="'#pageTop'"><div class="md-item-filled"><img src="../assets/baseline-vertical_align_top-24px.svg" /></div>Seite nach oben scrollen</md-menu-item>
            <md-menu-item @click="" v-scroll-to="'#pageBottom'"><div class="md-item-filled"><img src="../assets/baseline-vertical_align_bottom-24px.svg" /></div>Seite nach unten scrollen</md-menu-item>
            <md-divider></md-divider>
            <md-menu-item @click="" disabled><div class="md-item-filled"><img style="opacity: 0.2" src="../assets/outline-create-24px.svg" /></div>Bearbeiten-Modus</md-menu-item>
            <md-menu-item @click="" disabled><div class="md-item-filled"><img style="opacity: 0.2" src="../assets/outline-remove_red_eye-24px.svg" /></div>ReadOnly-Modus</md-menu-item>
            <md-divider></md-divider>
            <md-menu-item @click="contrast" disabled><div class="md-item-filled"><img style="opacity: 0.2" src="../assets/baseline-accessibility-24px.svg" /></div>Kontrast</md-menu-item>
            <md-divider></md-divider>
            <md-menu-item @click="fullScreen" ><div class="md-item-filled"><img id="imgtest" src="../assets/outline-fullscreen-24px.svg" /></div>Vollbildmodus</md-menu-item>
          </md-menu-content>
        </md-menu>
        <!-- Einfügen -->
        <md-menu md-size="small" class="btn-fmenu" md-align-trigger >
          <md-button md-menu-trigger type="button" class="md-default md-raised md-dense">Einfügen</md-button>

          <md-menu-content class="menu-content">
            <md-menu-item @click="" disabled><div class="md-item-filled"><img style="opacity: 0.2" src="../assets/outline-insert_photo-24px.svg" /></div>Bild</md-menu-item>
            <md-menu-item @click="createLink"><div class="md-item-filled"><img src="../assets/baseline-insert_link-24px.svg" /></div>Link</md-menu-item>
            <md-menu-item @click="insertHorizontalRule"><div class="md-item-filled"><img src="../assets/outline-remove-24px.svg" /></div>Horizontale Linie</md-menu-item>
          </md-menu-content>
        </md-menu>
        <!-- Format -->
        <md-menu md-size="small" class="btn-fmenu" md-align-trigger >
          <md-button md-menu-trigger type="button" class="md-default md-raised md-dense">Format</md-button>

          <md-menu-content class="menu-content">
            <md-menu-item disabled @click="" ><div class="md-item-empty"></div>Text <div class="submenuIcon"><img style="opacity: 0.2" src="../assets/outline-keyboard_arrow_right-24px.svg" alt=""></div></md-menu-item>
            <md-menu-item disabled @click="" ><div class="md-item-empty"></div>Absatzstile <div class="submenuIcon"><img style="opacity: 0.2" src="../assets/outline-keyboard_arrow_right-24px.svg" alt=""></div></md-menu-item>
            <md-menu-item disabled @click="" ><div class="md-item-empty"></div>Ausrichten und Einrücken <div class="submenuIcon"><img style="opacity: 0.2" src="../assets/outline-keyboard_arrow_right-24px.svg" alt=""></div></md-menu-item>
            <md-menu-item disabled @click="" ><div class="md-item-filled"><img style="opacity: 0.2" src="../assets/baseline-format_line_spacing-24px.svg" /></div>Zeilenabstand <div class="submenuIcon"><img style="opacity: 0.2" src="../assets/outline-keyboard_arrow_right-24px.svg" alt=""></div></md-menu-item>
            <md-menu-item disabled @click="" ><div class="md-item-filled"><img style="opacity: 0.2" src="../assets/outline-view_column-24px.svg" /></div>Spalten <div class="submenuIcon"><img style="opacity: 0.2" src="../assets/outline-keyboard_arrow_right-24px.svg" alt=""></div></md-menu-item>
            <md-menu-item disabled @click="" ><div class="md-item-empty"></div>Aufzählung und Nummerierung</md-menu-item>
            <md-divider></md-divider>
            <md-menu-item @click="unlink" ><div class="md-item-filled"><img src="../assets/baseline-link_off-24px.svg" /></div>Link entfernen</md-menu-item>
            <md-menu-item @click="removeFormat" ><div class="md-item-filled"><img src="../assets/baseline-format_clear-24px.svg" /></div>Formatierung entfernen</md-menu-item>
          </md-menu-content>


        </md-menu>
      </div>

      <div id="docIdent" @click="showDialogRename = true">{{ $parent.doc.title }}</div>

      <!-- DIALOG Umbenennen -->
      <md-dialog class="dialog" :md-active.sync="showDialogRename">
        <md-dialog-title>Neuen Namen eingeben</md-dialog-title>

        <md-field md-clearable>
          <form id="form" @submit.prevent="updateName">
            <label>Titel eingeben...</label><md-input type="text" v-model="$parent.doc.title"  maxlength="30"></md-input>
          </form>
        </md-field>

        <md-dialog-actions>
          <!--<md-button class="md-primary" @click="showDialogRename = false">Abbruch</md-button>-->
          <md-button class="md-primary" @click="showDialogRename = false" type="submit" form="form">Fertig</md-button>
        </md-dialog-actions>
      </md-dialog>
      <!-- DIALOG end -->

      <!-- DIALOG Dok kopieren -->
      <md-dialog class="dialog" :md-active.sync="showDialogCopyDokument">
        <md-dialog-title>Kopie des aktuellen Doks anlegen</md-dialog-title>

        <md-field md-clearable>
          <form id="copyDoc" @submit.prevent="copyDoc">
            <label>Titel für Kopie eingeben...</label><md-input type="text" v-model="model.title" maxlength="30"></md-input>
          </form>
        </md-field>

        <md-dialog-actions>
          <md-button class="md-primary" @click="showDialogCopyDokument = false">Abbruch</md-button>
          <md-button class="md-primary" @click="showDialogCopyDokument = false" type="submit" form="copyDoc">Erstellen</md-button>
        </md-dialog-actions>
      </md-dialog>
      <!-- DIALOG end -->
    </main>
</template>

<script>
  import api from '@/api'
  import editorMixin from '../mixins/editorMixin'

  export default {
    name: 'Menubar',
    extends: 'Paper',
    mixins: [editorMixin],
    data () {
      return {
        name: 'Delay',
        showDialogRename: false,
        showDialogCopyDokument: false,
        showDialogOpenDokument: false,
        pagecolor: 'white',
        model: {}
      }
    },
    methods: {
      async updateName () {
        this.$parent.socket.emit('titleChange', {
          room: 'docChannel_' + this.$parent.doc.hash,
          event: 'titleChange',
          message: this.$parent.doc.title
        })
        if (this.$parent.doc.hash) {
          await api.updateDoc(this.$parent.doc.hash, this.$parent.doc)
        }
      },
      async copyDoc () {
        var doc = await api.createDoc(this.model)
        doc.body = this.$parent.doc.body
        await api.updateDoc(doc.hash, doc)
        this.model = {} // reset form
        alert('Kopie von diesem Dokument wurde erstellt und gespeichert.')
      }
    }
  }
</script>

<style scoped>
  main {
    height: auto;
  }
  body {
    background-color: #f3f2f1 !important;
  }

  h1 {
    margin-top: 3rem !important;
  }

  .btn-group {
    margin: 0.7rem 0.1rem 0 0;
  }

  .menu-content {
    max-height: 1000rem;
  }

  .btn-fmenu {
    margin-right: 3px;
  }

  sub, sup {
    position: relative;
  }

  .submenuIcon {
    position: absolute;
    right: 10px;
    font-family: Courier, serif;
    width: 20px;
    height: 20px;
    transition: 0.4s;
  }

  #docIdent {
    position: relative;
    top: 8px;
    visibility: hidden;
    transition: visibility .3s, opacity .3s, box-shadow 0s;
    padding: .15rem .4rem;
    cursor: text;
    font-weight: 500;
    font-size: 14px;
    display: inline-block;
    color: black;
  }

  #docIdent:hover {
    -webkit-box-shadow: 0px 0px 0px 1px #BABABA;
    -moz-box-shadow: 0px 0px 0px 1px #BABABA;
    box-shadow: 0px 0px 0px 1px #BABABA;
  }
</style>
