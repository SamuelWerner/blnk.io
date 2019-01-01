<template>
    <main>
      <div class="btn-group btn-group-sm" role="group" aria-label="Basic example">
        <!-- Datei -->
        <md-menu md-size="small" class="btn-fmenu" md-align-trigger>
          <md-button md-menu-trigger  type="button" class="md-default md-raised md-dense">Datei</md-button>

          <md-menu-content class="menu-content">
            <md-menu-item @click="" disabled>
              <div class="md-item-empty"></div>
              Freigeben
            </md-menu-item>
            <md-divider></md-divider>
            <md-menu-item @click="" disabled><div class="md-item-filled"><img style="opacity: 0.2" src="../assets/outline-insert_drive_file-24px.svg" /></div>Neu</md-menu-item>
            <md-menu-item @click="" href="/"><div class="md-item-filled"><img src="../assets/outline-folder_open-24px.svg" /></div>Öffnen</md-menu-item>
            <md-menu-item @click="showDialogCopyDokument = true"><div class="md-item-filled"><img src="../assets/outline-file_copy-24px.svg" /></div>Kopie erstellen</md-menu-item>
            <md-menu-item @click="" disabled><div class="md-item-empty"></div>Herunterladen</md-menu-item>
            <md-divider></md-divider>
            <md-menu-item @click="showDialogRename = true"><div class="md-item-filled"><img src="../assets/outline-create-24px.svg" /></div>Umbenennen</md-menu-item>
            <md-menu-item @click="" disabled><div class="md-item-empty"></div>Verschieben nach</md-menu-item>
            <md-menu-item @click="" disabled>
              <div class="md-item-filled">
                <img style="opacity: 0.2" src="../assets/baseline-delete-24px.svg" />
              </div>Löschen
            </md-menu-item>
            <md-divider></md-divider>
            <md-menu-item @click="showDialogPage = true" disabled><div class="md-item-empty"></div>Seiteneinrichtung</md-menu-item>
            <md-menu-item @click="" disabled><div class="md-item-filled"><img style="opacity: 0.2" src="../assets/outline-print-24px.svg" /></div>Drucken</md-menu-item>
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
            <md-menu-item @click="" disabled><div class="md-item-empty"></div>Löschen</md-menu-item>
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
            <md-menu-item @click="fullScreen" ><div class="md-item-filled"><img src="../assets/outline-fullscreen-24px.svg" /></div>Vollbildmodus</md-menu-item>
          </md-menu-content>
        </md-menu>
        <!-- Einfügen -->
        <md-menu md-size="small" class="btn-fmenu" md-align-trigger >
          <md-button md-menu-trigger type="button" class="md-default md-raised md-dense">Einfügen</md-button>

          <md-menu-content class="menu-content">
            <md-menu-item @click="" disabled><div class="md-item-filled"><img style="opacity: 0.2" src="../assets/outline-insert_photo-24px.svg" /></div>Bild</md-menu-item>
            <md-menu-item @click="insertHorizontalRule"><div class="md-item-filled"><img src="../assets/outline-remove-24px.svg" /></div>Horizontale Linie</md-menu-item>
          </md-menu-content>
        </md-menu>
        <!-- Format -->
        <md-menu md-size="small" class="btn-fmenu" md-align-trigger >
          <md-button md-menu-trigger type="button" class="md-default md-raised md-dense">Format</md-button>

          <md-menu-content class="menu-content">
            <md-menu-item @click="removeFormat" ><div class="md-item-filled"><img src="../assets/baseline-format_clear-24px.svg" /></div>Formatierung entfernen</md-menu-item>
          </md-menu-content>
        </md-menu>
        <!-- Tools --> <!--
        <md-menu md-size="small" class="btn-fmenu" md-align-trigger >
          <md-button md-menu-trigger  type="button" class="md-default md-raised md-dense">Tools</md-button>

          <md-menu-content class="menu-content">
            <md-menu-item @click="" disabled></md-menu-item>
          </md-menu-content>
        </md-menu>-->
      </div>

      <!--<p style="float: right;">Name Dokument: {{ $parent.doc.title }}</p>-->

      <!-- DIALOG Umbenennen -->
      <md-dialog class="dialog" :md-active.sync="showDialogRename">
        <md-dialog-title>Neuen Namen eingeben</md-dialog-title>

        <md-field>
          <form id="form" @submit.prevent="updateName">
            <label>Titel eingeben...</label><md-textarea type="text" v-model="$parent.doc.title"  maxlength="30" md-autogrow></md-textarea>
          </form>
        </md-field>

        <md-dialog-actions>
          <md-button class="md-primary" @click="showDialogRename = false">Abbruch</md-button>
          <md-button class="md-primary" @click="showDialogRename = false" type="submit" form="form">Umbenennen</md-button>
        </md-dialog-actions>
      </md-dialog>
      <!-- DIALOG end -->

      <!-- DIALOG Dok kopieren -->
      <md-dialog class="dialog" :md-active.sync="showDialogCopyDokument">
        <md-dialog-title>Kopie des aktuellen Doks anlegen</md-dialog-title>

        <md-field>
          <form id="copyDoc" @submit.prevent="copyDoc">
            <label>Titel für Kopie eingeben...</label><md-input type="text" v-model="model.title"  maxlength="30"></md-input>
          </form>
        </md-field>

        <md-dialog-actions>
          <md-button class="md-primary" @click="showDialogCopyDokument = false">Abbruch</md-button>
          <md-button class="md-primary" @click="showDialogCopyDokument = false" type="submit" form="copyDoc">Erstellen</md-button>
        </md-dialog-actions>
      </md-dialog>
      <!-- DIALOG end -->

      <!-- DIALOG Seiteneinrichtung -->
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
      <!-- DIALOG end -->
    </main>
</template>

<script>
  import api from '@/api'
  export default {
    name: 'Menubar',
    extends: 'Paper',
    data () {
      return {
        name: 'Delay',
        showDialogRename: false,
        showDialogCopyDokument: false,
        showDialogOpenDokument: false,
        showDialogPage: false,
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
        alert('Kopie von dem Dokument wurde erstellt und gespeichert.')
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
      selectAll () {
        document.execCommand('selectAll', false, null)
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
      delete () {
        document.execCommand('delete', false, null)
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
      createLink () {
        document.execCommand('createLink', false, null)
      },
      fullScreen () {
        var element = document.documentElement

        if (element.requestFullScreen) {
          if (!document.fullScreen) {
            element.requestFullscreen()
          } else {
            document.exitFullScreen()
          }
        } else if (element.mozRequestFullScreen) {
          if (!document.mozFullScreen) {
            element.mozRequestFullScreen()
          } else {
            document.mozCancelFullScreen()
          }
        } else if (element.webkitRequestFullScreen) {
          if (!document.webkitIsFullScreen) {
            element.webkitRequestFullScreen()
          } else {
            document.webkitCancelFullScreen()
          }
        }
      }
    }
  }
</script>

<style scoped>
  main {
    height: auto;
  }
  body{
    background-color:#f3f2f1 !important;
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

  .dialog {
    text-align: center;
    width: 30rem;
    padding: 0 2rem;
  }
</style>
