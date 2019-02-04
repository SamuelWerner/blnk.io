<template>
  <main>
    <!-- Toolleiste -->
    <div class="btn-group btn-group-sm" role="group" aria-label="Basic example">
      <button type="button" class="btn btn-light btn-tmenu" @click="undo">
        <md-tooltip md-delay="300">Rückgängig machen</md-tooltip>
        <i class="material-icons">undo</i>
      </button>
      <button type="button" class="btn btn-light btn-tmenu" @click="redo">
        <md-tooltip md-delay="300">Wiederholen</md-tooltip>
        <i class="material-icons">redo</i>
      </button>
      <button type="button" class="btn btn-light btn-tmenu" @click="print">
        <!--<md-tooltip md-delay="300">Drucken</md-tooltip>-->
        <i class="material-icons">print</i>
      </button>
      <button type="button" class="btn btn-light btn-tmenu">
        <md-tooltip md-delay="300">Format übertragen</md-tooltip>
        <i class="material-icons">format_paint</i>
      </button>
    </div>

    <div class="btn-group btn-group-sm" role="group" aria-label="Basic example">
      <md-menu md-size="small" md-align-trigger  >
        <md-tooltip md-delay="300">Schriftart</md-tooltip>
        <button md-menu-trigger type="button" class="btn btn-light btn-tmenu btn-tmenu-menu btn-tmenu-menu-left" >
          <i class="fas fa-font" style="font-size: 20px;"></i>
        </button>

        <md-menu-content class="menu-content">
          <md-menu-item><div class="md-item-empty"></div>zuletzt: {{ fontMessage }}</md-menu-item>
          <md-divider></md-divider>
          <md-menu-item v-on:click="fontMessage='Arial'" @click="fontName ('Arial')" style="font-family: Arial"> <div class="md-item-empty"></div>Arial </md-menu-item>
          <md-menu-item v-on:click="fontMessage='Calibri'" @click="fontName ('Calibri')" style="font-family: Calibri"> <div class="md-item-empty"></div>Calibri </md-menu-item>
          <md-menu-item v-on:click="fontMessage='Comic Sans MS'" @click="fontName ('Comic Sans MS')" style="font-family: Comic Sans MS"> <div class="md-item-empty"></div>Comic Sans </md-menu-item>
          <md-menu-item v-on:click="fontMessage='Courier'" @click="fontName ('Courier')" style="font-family: Courier"> <div class="md-item-empty"></div>Courier </md-menu-item>
          <md-menu-item v-on:click="fontMessage='Droid Sans'" @click="fontName ('Droid Sans')" style="font-family: Droid Sans"> <div class="md-item-empty"></div>Droid Sans </md-menu-item>
          <md-menu-item v-on:click="fontMessage='Georgia'" @click="fontName ('Georgia')" style="font-family: Georgia"> <div class="md-item-empty"></div>Georgia </md-menu-item>
          <md-menu-item v-on:click="fontMessage='Helvetica'" @click="fontName ('Helvetica')" style="font-family: Helvetica"> <div class="md-item-empty"></div>Helvetica </md-menu-item>
          <md-menu-item v-on:click="fontMessage='Impact'" @click="fontName ('Impact')" style="font-family: Impact"> <div class="md-item-empty"></div>Impact </md-menu-item>
          <md-menu-item v-on:click="fontMessage='Roboto'" @click="fontName ('Roboto')" style="font-family: Roboto"> <div class="md-item-empty"></div>Roboto </md-menu-item>
          <md-menu-item v-on:click="fontMessage='Segoe UI'" @click="fontName ('Segoe UI')" style="font-family: Segoe UI"> <div class="md-item-empty"></div>Segoe UI </md-menu-item>
          <md-menu-item v-on:click="fontMessage='Times New Roman'" @click="fontName ('Times New Roman')" style="font-family: Times New Roman"> <div class="md-item-empty"></div>Times New Roman </md-menu-item>
          <md-menu-item v-on:click="fontMessage='Ubuntu'" @click="fontName ('Ubuntu')" style="font-family: Ubuntu"> <div class="md-item-empty"></div>Ubuntu </md-menu-item>
          <md-menu-item v-on:click="fontMessage='Verdana'" @click="fontName ('Verdana')" style="font-family: Verdana"> <div class="md-item-empty"></div>Verdana </md-menu-item>
        </md-menu-content>
      </md-menu>
      <md-menu md-size="small" md-align-trigger  >
        <md-tooltip md-delay="300">Schriftgröße</md-tooltip>
        <button md-menu-trigger type="button" class="btn btn-light btn-tmenu btn-tmenu-menu btn-tmenu-menu-right" >
          <i class="material-icons">format_size</i>
        </button>

        <md-menu-content class="menu-content">
          <md-menu-item><div class="md-item-empty"></div>zuletzt: {{ sizeMessage }}</md-menu-item>
          <md-divider></md-divider>
          <md-menu-item v-on:click="sizeMessage='1'" @click="fontSize (1)" > <div class="md-item-empty"></div><p style="font-size: x-small">Größe 1</p> </md-menu-item>
          <md-menu-item v-on:click="sizeMessage='2'" @click="fontSize (2)" > <div class="md-item-empty"></div><p style="font-size: small">Größe 2</p> </md-menu-item>
          <md-menu-item v-on:click="sizeMessage='3'" @click="fontSize (3)" > <div class="md-item-empty"></div><p style="font-size: medium">Größe 3 (Standard)</p> </md-menu-item>
          <md-menu-item v-on:click="sizeMessage='4'" @click="fontSize (4)" > <div class="md-item-empty"></div><p style="font-size: large">Größe 4</p> </md-menu-item>
          <md-menu-item v-on:click="sizeMessage='5'" @click="fontSize (5)" > <div class="md-item-empty"></div><p style="font-size: x-large">Größe 5</p> </md-menu-item>
          <md-menu-item v-on:click="sizeMessage='6'" @click="fontSize (6)" > <div class="md-item-empty"></div><p style="font-size: xx-large">Größe 6</p> </md-menu-item>
          <md-menu-item v-on:click="sizeMessage='7'" @click="fontSize (7)" > <div class="md-item-empty"></div><p style="font-size: 3rem">Größe 7</p> </md-menu-item>
        </md-menu-content>
      </md-menu>
    </div>

    <div class="btn-group btn-group-sm" role="group" aria-label="Basic example">
      <button type="button" class="btn btn-light btn-tmenu" @click="makeBold">
        <md-tooltip md-delay="300">Fett</md-tooltip>
        <i class="material-icons">format_bold</i>
      </button>
      <button type="button" class="btn btn-light btn-tmenu" @click="makeItalic">
        <md-tooltip md-delay="300">Kursiv</md-tooltip>
        <i class="material-icons">format_italic</i>
      </button>
      <button type="button" class="btn btn-light btn-tmenu" @click="makeUnderline">
        <md-tooltip md-delay="300">Unterstrichen</md-tooltip>
        <i class="material-icons">format_underlined</i>
      </button>
      <button type="button" class="btn btn-light btn-tmenu" @click="makeStrikeThrough">
        <md-tooltip md-delay="300">Durchgestrichen</md-tooltip>
        <i class="material-icons">strikethrough_s</i>
      </button>

      <md-menu md-size="small" md-align-trigger  >
        <md-tooltip md-delay="300">Schriftfarbe</md-tooltip>
        <button md-menu-trigger type="button" class="btn btn-light btn-tmenu btn-tmenu-menu btn-tmenu-menu-right" >
          <i class="material-icons">format_color_text</i>
        </button>

        <md-menu-content class="menu-content">
          <md-menu-item @click="foreColor ('#000000')" > <div class="md-item-filled"><div class="color color-black"></div></div> Schwarz </md-menu-item>
          <md-menu-item @click="foreColor ('#0000FF')" > <div class="md-item-filled"><div class="color color-blue"></div></div> Blau </md-menu-item>
          <md-menu-item @click="foreColor ('#33CC33')" > <div class="md-item-filled"><div class="color color-green"></div></div> Grün </md-menu-item>
          <md-menu-item @click="foreColor ('#FF0000')" > <div class="md-item-filled"><div class="color color-red"></div></div> Rot </md-menu-item>
          <md-menu-item @click="foreColor ('#FFEE84')" > <div class="md-item-filled"><div class="color color-yellow"></div></div> Gelb </md-menu-item>
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
        <i class="material-icons">link</i>
      </button>
    </div>

    <div class="btn-group btn-group-sm" role="group" aria-label="Basic example">
      <button type="button" class="btn btn-light btn-tmenu" @click="justifyLeft">
        <md-tooltip md-delay="300">Linksbündig</md-tooltip>
        <i class="material-icons">format_align_left</i>
      </button>
      <button type="button" class="btn btn-light btn-tmenu" @click="justifyCenter">
        <md-tooltip md-delay="300">Zentriert</md-tooltip>
        <i class="material-icons">format_align_center</i>
      </button>
      <button type="button" class="btn btn-light btn-tmenu" @click="justifyRight">
        <md-tooltip md-delay="300">Rechtsbündig</md-tooltip>
        <i class="material-icons">format_align_right</i>
      </button>
      <button type="button" class="btn btn-light btn-tmenu" @click="justifyFull">
        <md-tooltip md-delay="300">Blocksatz</md-tooltip>
        <i class="material-icons">format_align_justify</i>
      </button>
    </div>

    <div class="btn-group btn-group-sm" role="group" aria-label="Basic example">
      <md-menu md-size="small" md-align-trigger  >
        <md-tooltip md-delay="300">Zeilenabstand</md-tooltip>
        <button md-menu-trigger type="button" class="btn btn-light btn-tmenu btn-tmenu-menu btn-tmenu-menu-left" >
          <i class="material-icons">format_line_spacing</i>
        </button>

        <md-menu-content class="menu-content">
          <md-menu-item @click="lineHight(1)" disabled><div class="md-item-empty"></div>Einfach</md-menu-item>
          <md-menu-item @click="lineHight(1.15)" ><div class="md-item-filled"><img src="../assets/baseline-check-24px.svg" /></div>1,15</md-menu-item>
          <md-menu-item @click="lineHight(1.5)" disabled><div class="md-item-empty"></div>1,5</md-menu-item>
          <md-menu-item @click="lineHight(2)" disabled><div class="md-item-empty"></div>Doppelt</md-menu-item>
          <md-divider></md-divider>
          <md-menu-item @click="" disabled><div class="md-item-empty"></div>Abstand vor Absatz einfügen</md-menu-item>
          <md-menu-item @click="" disabled><div class="md-item-empty"></div>Abstand nach Absatz einfügen</md-menu-item>
          <md-menu-item @click="" disabled><div class="md-item-empty"></div>Benutzerdefiniert</md-menu-item>

        </md-menu-content>
      </md-menu>

      <button type="button" class="btn btn-light btn-tmenu" @click="insertOrderedList">
        <md-tooltip md-delay="300">Nummerierte Liste</md-tooltip>
        <i class="material-icons">format_list_numbered</i>
      </button>
      <button type="button" class="btn btn-light btn-tmenu" @click="insertUnorderedList">
        <md-tooltip md-delay="300">Aufzählungsliste</md-tooltip>
        <i class="material-icons">format_list_bulleted</i>
      </button>
      <button type="button" class="btn btn-light btn-tmenu" @click="outdent">
        <md-tooltip md-delay="300">Einzug verkleinern</md-tooltip>
        <i class="material-icons">format_indent_decrease</i>
      </button>
      <button type="button" class="btn btn-light btn-tmenu" @click="indent">
        <md-tooltip md-delay="300">Einzug vergrößern</md-tooltip>
        <i class="material-icons">format_indent_increase</i>
      </button>
    </div>
    <div class="btn-group btn-group-sm" role="group" aria-label="Basic example">
      <button type="button" class="btn btn-light btn-tmenu" @click="removeFormat">
        <md-tooltip md-delay="300">Formatierung entfernen</md-tooltip>
        <i class="material-icons">format_clear</i>
      </button>
    </div>
    <div class="btn-group btn-group-sm" role="group" aria-label="Basic example">
      <button type="button" class="btn btn-light btn-tmenu" @click="insertText"> <strong>txt</strong> </button>
    </div>
    <!--<p>Letzte Schriftart: {{ fontMessage }} - Letzte Schriftgröße: {{ sizeMessage }}</p>-->
  </main>
</template>


<script>
  import editorMixin from '../mixins/editorMixin'

  export default {
    name: 'Toolbar',
    mixins: [editorMixin],
    data () {
      return {
        name: 'Delay',
        showDialogRename: false,
        showDialogPage: false,
        showDialogLink: false,
        pagecolor: 'white',
        fontMessage: 'Arial',
        sizeMessage: '3'
      }
    },
    methods: {}
  }
</script>

<style>
  .btn-tmenu-menu-left {
    border-top-right-radius: 0 !important;
    border-bottom-right-radius: 0 !important;
  }

  .btn-tmenu-menu-right {
    border-top-left-radius: 0 !important;
    border-bottom-left-radius: 0 !important;
  }
</style>

<style scoped>
  body {
    background-color: #f3f2f1 !important;
  }

  main { /*
    overflow: auto;
    white-space: nowrap;
  */}

  h1 {
    margin-top: 3rem !important;
  }

  .btn-group {
    margin: 0.7rem 0.1rem 0 0;
  }

  .fktstripImg {
    height: 21px !important;
    width: 21px !important;
  }

  .menu-content {
    max-height: 1000rem;
    z-index: 9999;
  }

  .btn-tmenu {
    display: flex;
    justify-content: center;
    align-items: center;
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
  }

  .btn-tmenu-menu-left {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  .btn-tmenu-menu-right {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }

  .imgBig {
    width: 17px !important;
    height: 17px !important;
  }

  .menu-item-img {
    width: 15px;
    height: 15px;
  }

  .color {
    width: 12px;
    height: 12px;
    border-radius: 0.17rem;
    border: 0.05rem solid grey;
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
