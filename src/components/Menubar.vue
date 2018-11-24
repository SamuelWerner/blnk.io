<template>
    <main>
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
      <md-dialog class="dialog" :md-active.sync="showDialogRename">
        <md-dialog-title>Neuen Namen eingeben</md-dialog-title>

        <md-field>
          <form id="form" @submit.prevent="updateName">
            <label>Titel eingeben...</label><md-input type="text" v-model="$parent.doc.title"  maxlength="30"></md-input>
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
    </main>
</template>

<script>
  import api from '@/api'
  export default {
    name: 'Menubar',
    data () {
      return {
        name: 'Delay',
        showDialogRename: false,
        showDialogPage: false,
        pagecolor: 'white'
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

<style scoped>
  main, main{
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


  input {
    width: 416px;
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

</style>
