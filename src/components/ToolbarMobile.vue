<template>
  <main>
  <!-- Toolleiste -->
    <!-- First Button Group -->
    <div class="btn-group" role="group">
      <button type="button" class="btn btn-tmenu" @click="undo">
        <md-tooltip md-delay="300">Rückgängig machen</md-tooltip>
        <i class="material-icons toolbar-icon">undo</i>
      </button>
      <button type="button" class="btn btn-tmenu" @click="redo">
        <md-tooltip md-delay="300">Wiederholen</md-tooltip>
        <i class="material-icons toolbar-icon">redo</i>
      </button>
      <button type="button" class="btn btn-tmenu" @click="print">
        <i class="material-icons toolbar-icon">print</i>
      </button>
      <button type="button" class="btn btn-tmenu" @click="removeFormat">
        <md-tooltip md-delay="300">Formatierung entfernen</md-tooltip>
        <i class="material-icons toolbar-icon">format_clear</i>
      </button>
    </div>

    <!-- Second Button Group -->
    <div class="btn-group" role="group">
      <md-menu md-size="small" md-align-trigger  >
        <md-tooltip md-delay="300">Schriftart</md-tooltip>
        <button md-menu-trigger type="button" class="btn btn-tmenu btn-tmenu-menu-left" >
          <i class="fas fa-font" style="font-size: 18px;"></i>
        </button>

        <md-menu-content class="menu-content">
          <md-menu-item><div class="md-item-filled"><img src="../assets/baseline-check-24px.svg" /></div>zuletzt: {{ fontMessage }}</md-menu-item>
          <md-divider></md-divider>
          <md-menu-item @click="fontMessage='Arial'; fontName ('Arial')" style="font-family: Arial"> <div class="md-item-empty"></div>Arial </md-menu-item>
          <md-menu-item @click="fontMessage='Calibri'; fontName ('Calibri')" style="font-family: Calibri"> <div class="md-item-empty"></div>Calibri </md-menu-item>
          <md-menu-item @click="fontMessage='Comic Sans MS'; fontName ('Comic Sans MS')" style="font-family: Comic Sans MS"> <div class="md-item-empty"></div>Comic Sans </md-menu-item>
          <md-menu-item @click="fontMessage='Courier'; fontName ('Courier')" style="font-family: Courier"> <div class="md-item-empty"></div>Courier </md-menu-item>
          <md-menu-item @click="fontMessage='Droid Sans'; fontName ('Droid Sans')"style="font-family: Droid Sans"> <div class="md-item-empty"></div>Droid Sans </md-menu-item>
          <md-menu-item @click="fontMessage='Georgia'; fontName ('Georgia')" style="font-family: Georgia"> <div class="md-item-empty"></div>Georgia </md-menu-item>
          <md-menu-item @click="fontMessage='Helvetica'; fontName ('Helvetica')" style="font-family: Helvetica"> <div class="md-item-empty"></div>Helvetica </md-menu-item>
          <md-menu-item @click="fontMessage='Impact'; fontName ('Impact')" style="font-family: Impact"> <div class="md-item-empty"></div>Impact </md-menu-item>
          <md-menu-item @click="fontMessage='Roboto'; fontName ('Roboto')" style="font-family: Roboto"> <div class="md-item-empty"></div>Roboto </md-menu-item>
          <md-menu-item @click="fontMessage='Segoe UI'; fontName ('Segoe UI')" style="font-family: Segoe UI"> <div class="md-item-empty"></div>Segoe UI </md-menu-item>
          <md-menu-item @click="fontMessage='Times New Roman'; fontName ('Times New Roman')" style="font-family: Times New Roman"> <div class="md-item-empty"></div>Times New Roman </md-menu-item>
          <md-menu-item @click="fontMessage='Ubuntu'; fontName ('Ubuntu')" style="font-family: Ubuntu"> <div class="md-item-empty"></div>Ubuntu </md-menu-item>
          <md-menu-item @click="fontMessage='Verdana'; fontName ('Verdana')" style="font-family: Verdana"> <div class="md-item-empty"></div>Verdana </md-menu-item>
        </md-menu-content>
      </md-menu>

      <md-menu md-size="small" md-align-trigger  >
        <md-tooltip md-delay="300">Schriftgröße</md-tooltip>
        <button md-menu-trigger type="button" class="btn btn-tmenu btn-tmenu-menu-right" >
          <i class="material-icons toolbar-icon">format_size</i>
        </button>

        <md-menu-content class="menu-content">
          <md-menu-item><div class="md-item-filled"><img src="../assets/baseline-check-24px.svg" /></div>zuletzt: {{ sizeMessage }} </md-menu-item>
          <md-divider></md-divider>
          <md-menu-item v-on:click="sizeMessage='7.5'; fontSize (1)"> <div class="md-item-empty"></div><p>7.5</p> </md-menu-item>
          <md-menu-item v-on:click="sizeMessage='10'; fontSize (2)"> <div class="md-item-empty"></div><p>10</p> </md-menu-item>
          <md-menu-item v-on:click="sizeMessage='12'; fontSize (3)"> <div class="md-item-empty"></div><p>12</p> </md-menu-item>
          <md-menu-item v-on:click="sizeMessage='13.5'; fontSize (4)"> <div class="md-item-empty"></div><p>13.5</p> </md-menu-item>
          <md-menu-item v-on:click="sizeMessage='18'; fontSize (5)"> <div class="md-item-empty"></div><p>18</p> </md-menu-item>
          <md-menu-item v-on:click="sizeMessage='24'; fontSize (6)"> <div class="md-item-empty"></div><p>24</p> </md-menu-item>
          <md-menu-item v-on:click="sizeMessage='36'; fontSize (7)"> <div class="md-item-empty"></div><p>36</p> </md-menu-item>
        </md-menu-content>
      </md-menu>
    </div>

    <!-- Third Button Group -->
    <div class="btn-group" role="group">
      <button type="button" class="btn btn-tmenu" @click="makeBold">
        <md-tooltip md-delay="300">Fett</md-tooltip>
        <i class="material-icons toolbar-icon">format_bold</i>
      </button>
      <button type="button" class="btn btn-tmenu" @click="makeItalic">
        <md-tooltip md-delay="300">Kursiv</md-tooltip>
        <i class="material-icons toolbar-icon">format_italic</i>
      </button>
      <button type="button" class="btn btn-tmenu" @click="makeUnderline">
        <md-tooltip md-delay="300">Unterstrichen</md-tooltip>
        <i class="material-icons toolbar-icon">format_underlined</i>
      </button>
      <button type="button" class="btn btn-tmenu" @click="makeStrikeThrough">
        <md-tooltip md-delay="300">Durchgestrichen</md-tooltip>
        <i class="material-icons toolbar-icon">strikethrough_s</i>
      </button>

      <md-menu md-size="small" md-align-trigger  >
        <md-tooltip md-delay="300">Schriftfarbe</md-tooltip>
        <button md-menu-trigger type="button" class="btn btn-tmenu btn-tmenu-menu-center" >
          <i class="material-icons toolbar-icon">format_color_text</i>
        </button>

        <md-menu-content class="menu-content">
          <md-menu-item @click="foreColor ('#212529')">Standard Farbe</md-menu-item>
          <md-divider></md-divider>
          <div class="colorPicker">
            <div class="row-colorPicker"> <!--black-->
              <button @click="foreColor ('#000000')" class="color-colorPicker" style="background-color: #000000;"></button>
              <button @click="foreColor ('#666666')" class="color-colorPicker" style="background-color: #666666;"></button>
              <button @click="foreColor ('#b7b7b7')" class="color-colorPicker" style="background-color: #b7b7b7;"></button>
              <button @click="foreColor ('#d9d9d9')" class="color-colorPicker" style="background-color: #d9d9d9;"></button>
              <button @click="foreColor ('#f3f3f3')" class="color-colorPicker" style="background-color: #f3f3f3;"></button>
              <button @click="foreColor ('#ffffff')" class="color-colorPicker" style="background-color: #ffffff; -webkit-box-shadow: inset 0px 0px 0px 1px rgba(249,249,249,1); -moz-box-shadow: inset 0px 0px 0px 1px rgba(249,249,249,1); box-shadow: inset 0px 0px 0px 1px rgba(249,249,249,1);"></button>
            </div>
            <div class="row-colorPicker"> <!--red-->
              <button @click="foreColor ('#990000')" class="color-colorPicker" style="background-color: #990000;"></button>
              <button @click="foreColor ('#cc0000')" class="color-colorPicker" style="background-color: #cc0000;"></button>
              <button @click="foreColor ('#ff0000')" class="color-colorPicker" style="background-color: #ff0000;"></button>
              <button @click="foreColor ('#e06666')" class="color-colorPicker" style="background-color: #e06666;"></button>
              <button @click="foreColor ('#ea9999')" class="color-colorPicker" style="background-color: #ea9999;"></button>
              <button @click="foreColor ('#f4cccc')" class="color-colorPicker" style="background-color: #f4cccc;"></button>
            </div>
            <div class="row-colorPicker"> <!--yellow-->
              <button @click="foreColor ('#7f6000')" class="color-colorPicker" style="background-color: #7f6000;"></button>
              <button @click="foreColor ('#bf9000')" class="color-colorPicker" style="background-color: #bf9000;"></button>
              <button @click="foreColor ('#ffff00')" class="color-colorPicker" style="background-color: #ffff00;"></button>
              <button @click="foreColor ('#ffd966')" class="color-colorPicker" style="background-color: #ffd966;"></button>
              <button @click="foreColor ('#ffe599')" class="color-colorPicker" style="background-color: #ffe599;"></button>
              <button @click="foreColor ('#fff2cc')" class="color-colorPicker" style="background-color: #fff2cc;"></button>
            </div>
            <div class="row-colorPicker"> <!--green-->
              <button @click="foreColor ('#38761d')" class="color-colorPicker" style="background-color: #38761d;"></button>
              <button @click="foreColor ('#6aa84f')" class="color-colorPicker" style="background-color: #6aa84f;"></button>
              <button @click="foreColor ('#00cd00')" class="color-colorPicker" style="background-color: #00cd00;"></button>
              <button @click="foreColor ('#93c47d')" class="color-colorPicker" style="background-color: #93c47d;"></button>
              <button @click="foreColor ('#b6d7a8')" class="color-colorPicker" style="background-color: #b6d7a8;"></button>
              <button @click="foreColor ('#d9ead3')" class="color-colorPicker" style="background-color: #d9ead3;"></button>
            </div>
            <div class="row-colorPicker"> <!--blue-->
              <button @click="foreColor ('#073763')" class="color-colorPicker" style="background-color: #073763;"></button>
              <button @click="foreColor ('#0b5394')" class="color-colorPicker" style="background-color: #0b5394;"></button>
              <button @click="foreColor ('#0000ff')" class="color-colorPicker" style="background-color: #0000ff;"></button>
              <button @click="foreColor ('#6fa8dc')" class="color-colorPicker" style="background-color: #6fa8dc;"></button>
              <button @click="foreColor ('#9fc5e8')" class="color-colorPicker" style="background-color: #9fc5e8;"></button>
              <button @click="foreColor ('#cfe2f3')" class="color-colorPicker" style="background-color: #cfe2f3;"></button>
            </div>
            <div class="row-colorPicker"> <!--purple-->
              <button @click="foreColor ('#741b47')" class="color-colorPicker" style="background-color: #741b47;"></button>
              <button @click="foreColor ('#a64d79')" class="color-colorPicker" style="background-color: #a64d79;"></button>
              <button @click="foreColor ('#ff00ff')" class="color-colorPicker" style="background-color: #ff00ff;"></button>
              <button @click="foreColor ('#c27ba0')" class="color-colorPicker" style="background-color: #c27ba0;"></button>
              <button @click="foreColor ('#d5a6bd')" class="color-colorPicker" style="background-color: #d5a6bd;"></button>
              <button @click="foreColor ('#ead1dc')" class="color-colorPicker" style="background-color: #ead1dc;"></button>
            </div>
          </div>
        </md-menu-content>
      </md-menu>

      <md-menu md-size="small" md-align-trigger  >
        <md-tooltip md-delay="300">Hervorhebungsfarbe</md-tooltip>
        <button md-menu-trigger type="button" class="btn btn-tmenu btn-tmenu-menu-right">
          <i class="material-icons toolbar-icon">border_color</i>
        </button>

        <md-menu-content class="menu-content">
          <md-menu-item @click="hiliteColor ('#ffffff')"><div class="md-item-filled"><img src="../assets/baseline-format_color_reset-24px.svg"/></div>Keine Farbe</md-menu-item>
          <md-divider></md-divider>
          <div class="colorPicker">
            <div class="row-colorPicker"> <!--black-->
              <button @click="hiliteColor ('#000000')" class="color-colorPicker" style="background-color: #000000;"></button>
              <button @click="hiliteColor ('#666666')" class="color-colorPicker" style="background-color: #666666;"></button>
              <button @click="hiliteColor ('#b7b7b7')" class="color-colorPicker" style="background-color: #b7b7b7;"></button>
              <button @click="hiliteColor ('#d9d9d9')" class="color-colorPicker" style="background-color: #d9d9d9;"></button>
              <button @click="hiliteColor ('#f3f3f3')" class="color-colorPicker" style="background-color: #f3f3f3;"></button>
              <button @click="hiliteColor ('#ffffff')" class="color-colorPicker" style="background-color: #ffffff; -webkit-box-shadow: inset 0px 0px 0px 1px rgba(249,249,249,1); -moz-box-shadow: inset 0px 0px 0px 1px rgba(249,249,249,1); box-shadow: inset 0px 0px 0px 1px rgba(249,249,249,1);"></button>
            </div>
            <div class="row-colorPicker"> <!--red-->
              <button @click="hiliteColor ('#990000')" class="color-colorPicker" style="background-color: #990000;"></button>
              <button @click="hiliteColor ('#cc0000')" class="color-colorPicker" style="background-color: #cc0000;"></button>
              <button @click="hiliteColor ('#ff0000')" class="color-colorPicker" style="background-color: #ff0000;"></button>
              <button @click="hiliteColor ('#e06666')" class="color-colorPicker" style="background-color: #e06666;"></button>
              <button @click="hiliteColor ('#ea9999')" class="color-colorPicker" style="background-color: #ea9999;"></button>
              <button @click="hiliteColor ('#f4cccc')" class="color-colorPicker" style="background-color: #f4cccc;"></button>
            </div>
            <div class="row-colorPicker"> <!--yellow-->
              <button @click="hiliteColor ('#7f6000')" class="color-colorPicker" style="background-color: #7f6000;"></button>
              <button @click="hiliteColor ('#bf9000')" class="color-colorPicker" style="background-color: #bf9000;"></button>
              <button @click="hiliteColor ('#ffff00')" class="color-colorPicker" style="background-color: #ffff00;"></button>
              <button @click="hiliteColor ('#ffd966')" class="color-colorPicker" style="background-color: #ffd966;"></button>
              <button @click="hiliteColor ('#ffe599')" class="color-colorPicker" style="background-color: #ffe599;"></button>
              <button @click="hiliteColor ('#fff2cc')" class="color-colorPicker" style="background-color: #fff2cc;"></button>
            </div>
            <div class="row-colorPicker"> <!--green-->
              <button @click="hiliteColor ('#38761d')" class="color-colorPicker" style="background-color: #38761d;"></button>
              <button @click="hiliteColor ('#6aa84f')" class="color-colorPicker" style="background-color: #6aa84f;"></button>
              <button @click="hiliteColor ('#00cd00')" class="color-colorPicker" style="background-color: #00cd00;"></button>
              <button @click="hiliteColor ('#93c47d')" class="color-colorPicker" style="background-color: #93c47d;"></button>
              <button @click="hiliteColor ('#b6d7a8')" class="color-colorPicker" style="background-color: #b6d7a8;"></button>
              <button @click="hiliteColor ('#d9ead3')" class="color-colorPicker" style="background-color: #d9ead3;"></button>
            </div>
            <div class="row-colorPicker"> <!--blue-->
              <button @click="hiliteColor ('#073763')" class="color-colorPicker" style="background-color: #073763;"></button>
              <button @click="hiliteColor ('#0b5394')" class="color-colorPicker" style="background-color: #0b5394;"></button>
              <button @click="hiliteColor ('#0000ff')" class="color-colorPicker" style="background-color: #0000ff;"></button>
              <button @click="hiliteColor ('#6fa8dc')" class="color-colorPicker" style="background-color: #6fa8dc;"></button>
              <button @click="hiliteColor ('#9fc5e8')" class="color-colorPicker" style="background-color: #9fc5e8;"></button>
              <button @click="hiliteColor ('#cfe2f3')" class="color-colorPicker" style="background-color: #cfe2f3;"></button>
            </div>
            <div class="row-colorPicker"> <!--purple-->
              <button @click="hiliteColor ('#741b47')" class="color-colorPicker" style="background-color: #741b47;"></button>
              <button @click="hiliteColor ('#a64d79')" class="color-colorPicker" style="background-color: #a64d79;"></button>
              <button @click="hiliteColor ('#ff00ff')" class="color-colorPicker" style="background-color: #ff00ff;"></button>
              <button @click="hiliteColor ('#c27ba0')" class="color-colorPicker" style="background-color: #c27ba0;"></button>
              <button @click="hiliteColor ('#d5a6bd')" class="color-colorPicker" style="background-color: #d5a6bd;"></button>
              <button @click="hiliteColor ('#ead1dc')" class="color-colorPicker" style="background-color: #ead1dc;"></button>
            </div>
          </div>
        </md-menu-content>
      </md-menu>
    </div>

    <!-- Fourth Button Group -->
    <div class="btn-group" role="group">
      <button type="button" class="btn btn-tmenu" @click="subscript">
        <md-tooltip md-delay="300">Tiefgestellt</md-tooltip>
        <img class="imgBig" src="../assets/font-style-subscript.svg" />
      </button>
      <button type="button" class="btn btn-tmenu" @click="superscript">
        <md-tooltip md-delay="300">Hochgestellt</md-tooltip>
        <img class="imgBig" src="../assets/font-style-superscript.svg" />
      </button>
    </div>

    <!-- Fifth Button Group -->
    <div class="btn-group" role="group">
      <button type="button" class="btn btn-tmenu" @click="createLink">
        <md-tooltip md-delay="300">Link einfügen</md-tooltip>
        <i class="material-icons toolbar-icon">link</i>
      </button>
    </div>

    <!-- Sixth Button Group -->
    <div class="btn-group" role="group">
      <button type="button" class="btn btn-tmenu" @click="justifyLeft">
        <md-tooltip md-delay="300">Linksbündig</md-tooltip>
        <i class="material-icons toolbar-icon">format_align_left</i>
      </button>
      <button type="button" class="btn btn-tmenu" @click="justifyCenter">
        <md-tooltip md-delay="300">Zentriert</md-tooltip>
        <i class="material-icons toolbar-icon">format_align_center</i>
      </button>
      <button type="button" class="btn btn-tmenu" @click="justifyRight">
        <md-tooltip md-delay="300">Rechtsbündig</md-tooltip>
        <i class="material-icons toolbar-icon">format_align_right</i>
      </button>
      <button type="button" class="btn btn-tmenu" @click="justifyFull">
        <md-tooltip md-delay="300">Blocksatz</md-tooltip>
        <i class="material-icons toolbar-icon">format_align_justify</i>
      </button>
    </div>

    <!-- Seventh Button Group -->
    <div class="btn-group" role="group">
      <md-menu md-size="small" md-align-trigger  >
        <md-tooltip md-delay="300">Zeilenabstand</md-tooltip>
        <button md-menu-trigger type="button" class="btn btn-tmenu btn-tmenu-menu-left" >
          <i class="material-icons toolbar-icon">format_line_spacing</i>
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

      <button type="button" class="btn btn-tmenu" @click="insertOrderedList">
        <md-tooltip md-delay="300">Nummerierte Liste</md-tooltip>
        <i class="material-icons toolbar-icon">format_list_numbered</i>
      </button>
      <button type="button" class="btn btn-tmenu" @click="insertUnorderedList">
        <md-tooltip md-delay="300">Aufzählungsliste</md-tooltip>
        <i class="material-icons toolbar-icon">format_list_bulleted</i>
      </button>
      <button type="button" class="btn btn-tmenu" @click="outdent">
        <md-tooltip md-delay="300">Einzug verkleinern</md-tooltip>
        <i class="material-icons toolbar-icon">format_indent_decrease</i>
      </button>
      <button type="button" class="btn btn-tmenu" @click="indent">
        <md-tooltip md-delay="300">Einzug vergrößern</md-tooltip>
        <i class="material-icons toolbar-icon">format_indent_increase</i>
      </button>
    </div>
  </main>
</template>


<script>
  import editorMixin from '../mixins/editorMixin'

  export default {
    name: 'ToolbarMobile',
    mixins: [editorMixin],
    data () {
      return {
        name: 'Delay',
        showDialogRename: false,
        showDialogPage: false,
        fontMessage: 'Arial',
        sizeMessage: '3'
      }
    },
    methods: {}
  }
</script>

<style scoped>
  body {
    background-color:#f3f2f1 !important;
  }

  main {
    position: -webkit-sticky;
    position: sticky;
    top: 0;
    background-color: #f3f2f1;
    padding: 0.2rem 1rem 0.7rem 1rem;
    z-index: 1;
    overflow: auto;
    white-space: nowrap;
    transition: 0.2s;
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

  sub, sup {
    position: relative;
  }

  .btn-tmenu-menu {
    padding: 0;
    padding-bottom: 2px;
  }
</style>
