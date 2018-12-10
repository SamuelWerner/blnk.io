<template>
  <main>
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
      <md-menu md-size="small" md-align-trigger  >
        <md-tooltip md-delay="300">Schriftart</md-tooltip>
        <button md-menu-trigger type="button" class="btn btn-light btn-tmenu btn-tmenu-menu" > <img class="fktstripImg" src="../assets/outline-font_download-24px.svg" /> </button>

        <md-menu-content class="menu-content">
          <md-menu-item v-on:click="fontMessage='Arial'" @click="fontName ('Arial')" style="font-family: Arial"> Arial </md-menu-item>
          <md-menu-item v-on:click="fontMessage='Calibri'" @click="fontName ('Calibri')" style="font-family: Calibri"> Calibri </md-menu-item>
          <md-menu-item v-on:click="fontMessage='Comic Sans MS'" @click="fontName ('Comic Sans MS')" style="font-family: Comic Sans MS"> Comic Sans </md-menu-item>
          <md-menu-item v-on:click="fontMessage='Courier'" @click="fontName ('Courier')" style="font-family: Courier"> Courier </md-menu-item>
          <md-menu-item v-on:click="fontMessage='Droid Sans'" @click="fontName ('Droid Sans')" style="font-family: Droid Sans"> Droid Sans </md-menu-item>
          <md-menu-item v-on:click="fontMessage='Georgia'" @click="fontName ('Georgia')" style="font-family: Georgia"> Georgia </md-menu-item>
          <md-menu-item v-on:click="fontMessage='Helvetica'" @click="fontName ('Helvetica')" style="font-family: Helvetica"> Helvetica </md-menu-item>
          <md-menu-item v-on:click="fontMessage='Impact'" @click="fontName ('Impact')" style="font-family: Impact"> Impact </md-menu-item>
          <md-menu-item v-on:click="fontMessage='Roboto'" @click="fontName ('Roboto')" style="font-family: Roboto"> Roboto </md-menu-item>
          <md-menu-item v-on:click="fontMessage='Segoe UI'" @click="fontName ('Segoe UI')" style="font-family: Segoe UI"> Segoe UI </md-menu-item>
          <md-menu-item v-on:click="fontMessage='Times New Roman'" @click="fontName ('Times New Roman')" style="font-family: Times New Roman"> Times New Roman </md-menu-item>
          <md-menu-item v-on:click="fontMessage='Ubuntu'" @click="fontName ('Ubuntu')" style="font-family: Ubuntu"> Ubuntu </md-menu-item>
          <md-menu-item v-on:click="fontMessage='Verdana'" @click="fontName ('Verdana')" style="font-family: Verdana"> Verdana </md-menu-item>
        </md-menu-content>
      </md-menu>
      <md-menu md-size="small" md-align-trigger  >
        <md-tooltip md-delay="300">Schriftgröße</md-tooltip>
        <button md-menu-trigger type="button" class="btn btn-light btn-tmenu btn-tmenu-menu" > <img class="fktstripImg" src="../assets/baseline-format_size-24px.svg" /> </button>

        <md-menu-content class="menu-content">
          <md-menu-item @click="fontSize (1)" > <p style="margin: 0; font-size: x-small">Größe 1</p> </md-menu-item>
          <md-menu-item @click="fontSize (2)" > <p style="margin: 0; font-size: small">Größe 2</p> </md-menu-item>
          <md-menu-item @click="fontSize (3)" > <p style="margin: 0; font-size: medium">Größe 3 (Standard)</p> </md-menu-item>
          <md-menu-item @click="fontSize (4)" > <p style="margin: 0; font-size: large">Größe 4</p> </md-menu-item>
          <md-menu-item @click="fontSize (5)" > <p style="margin: 0; font-size: x-large">Größe 5</p> </md-menu-item>
          <md-menu-item @click="fontSize (6)" > <p style="margin: 0; font-size: xx-large">Größe 6</p> </md-menu-item>
          <md-menu-item @click="fontSize (7)" > <p style="margin: 0; font-size: 3rem">Größe 7</p> </md-menu-item>
        </md-menu-content>
      </md-menu>
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

      <md-menu md-size="small" md-align-trigger  >
        <md-tooltip md-delay="300">Schriftfarbe</md-tooltip>
        <button md-menu-trigger type="button" class="btn btn-light btn-tmenu btn-tmenu-menu" > <img class="fktstripImg" src="../assets/baseline-format_color_text-24px.svg" /> </button>

        <md-menu-content class="menu-content">
          <md-menu-item @click="foreColor ('#000000')" > <div class="color color-black"></div> Schwarz </md-menu-item>
          <md-menu-item @click="foreColor ('#0000FF')" > <div class="color color-blue"></div> Blau </md-menu-item>
          <md-menu-item @click="foreColor ('#33CC33')" > <div class="color color-green"></div> Grün </md-menu-item>
          <md-menu-item @click="foreColor ('#FF0000')" > <div class="color color-red"></div> Rot </md-menu-item>
          <md-menu-item @click="foreColor ('#FFEE84')" > <div class="color color-yellow"></div> Gelb </md-menu-item>
        </md-menu-content>
      </md-menu>
    </div>
    <div class="btn-group btn-group-sm" role="group" aria-label="Basic example">
      <button type="button" class="btn btn-light btn-tmenu" @click="subscript">
        <md-tooltip md-delay="300">Tiefgestellt</md-tooltip>
        <img class="fktstripImg imgBig" src="../assets/font-style-subscript.svg" />
      </button>
      <button type="button" class="btn btn-light btn-tmenu" @click="superscript">
        <md-tooltip md-delay="300">Hochgestellt</md-tooltip>
        <img class="fktstripImg imgBig" src="../assets/font-style-superscript.svg" />
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
        <button md-menu-trigger type="button" class="btn btn-light btn-tmenu btn-tmenu-menu" > <img class="fktstripImg" src="../assets/baseline-format_line_spacing-24px.svg" /> </button>

        <md-menu-content class="menu-content">
          <md-menu-item @click="lineHight(1)" disabled>Einfach</md-menu-item>
          <md-menu-item @click="lineHight(1.15)" disabled>1,15</md-menu-item>
          <md-menu-item @click="lineHight(1.5)" disabled>1,5</md-menu-item>
          <md-menu-item @click="lineHight(2)" disabled>Doppelt</md-menu-item>
          <md-divider></md-divider>
          <md-menu-item @click="" disabled>Abstand vor Absatz einfügen</md-menu-item>
          <md-menu-item @click="" disabled>Abstand nach Absatz einfügen</md-menu-item>
          <md-menu-item @click="" disabled>Benutzerdefiniert</md-menu-item>

        </md-menu-content>
      </md-menu>

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
      <button v-scroll-to="'#pageBottom'" type="button" class="btn btn-light btn-tmenu" @click="insertText">
        <img class="fktstripImg" src="../assets/baseline-vertical_align_bottom-24px.svg" />
      </button>
      <button v-scroll-to="'#pageTop'" type="button" class="btn btn-light btn-tmenu" @click="insertText">
        <img class="fktstripImg" src="../assets/baseline-vertical_align_top-24px.svg" />
      </button>
      <button type="button" class="btn btn-light btn-tmenu" @click="insertText"> <strong>txt</strong> </button>
    </div>
    <!--<p>Letzte Schriftart: {{ fontMessage }} - Letzte Schriftgröße: {{ sizeMessage }}</p>-->
  </main>
</template>


<script>
  export default {
    name: 'Toolbar',
    data () {
      return {
        name: 'Delay',
        showDialogRename: false,
        showDialogPage: false,
        pagecolor: 'white',
        fontMessage: '...',
        sizeMessage: '...'
      }
    },
    methods: {
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
      foreColor (textColor) {
        document.execCommand('foreColor', false, textColor)
      },
      fontName (textFont) {
        document.execCommand('fontName', false, textFont)
      },
      fontSize (textSize) {
        document.execCommand('fontSize', false, textSize)
      }
    }
  }
</script>

<style scoped>
  body{
    background-color:#f3f2f1 !important;
  }

  h1 {
    margin-top: 3rem !important;
  }

  .btn-group {
    margin: 0.7rem 0.1rem 0 0;
  }

  .fktstripImg {
    height: 21px !important;
    width: 21px !important;
    margin-bottom: 1px;
  }

  .menu-content {
    max-height: 1000rem;
  }

  .btn-tmenu {
    width: 40px;
    height: 36px;
    background-color: white !important;
    border: white;
  }

  .btn-tmenu:hover {
    background-color: #DEDEDE !important;
    transition: 0.5s;
  }

  sub, sup {
    position: relative;
  }

  .btn-tmenu-menu {
    padding: 0;
    padding-bottom: 2px;
  }

  .imgBig {
    width: 17px !important;
    height: 17px !important;
  }

  .color {
    width: 12px;
    height: 12px;
    margin-right:10px
  }

  .color-black {
    background-color: black;
  }

  .color-blue {
    background-color: #0000FF;
  }

  .color-green {
    background-color: #33CC33;
  }

  .color-red {
    background-color: #FF0000;
  }

  .color-yellow {
    background-color: #FFEE84;
  }


</style>
