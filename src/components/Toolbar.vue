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
          <md-menu-item><div class="md-item-filled"><img src="../assets/baseline-check-24px.svg" /></div>zuletzt: {{ fontMessage }}</md-menu-item>
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
          <md-menu-item><div class="md-item-filled"><img src="../assets/baseline-check-24px.svg" /></div>zuletzt: {{ sizeMessage }} </md-menu-item>
          <md-divider></md-divider>
          <md-menu-item v-on:click="sizeMessage='7.5'" @click="fontSize (1)" > <div class="md-item-empty"></div><p>7.5</p> </md-menu-item>
          <md-menu-item v-on:click="sizeMessage='10'" @click="fontSize (2)" > <div class="md-item-empty"></div><p>10</p> </md-menu-item>
          <md-menu-item v-on:click="sizeMessage='12'" @click="fontSize (3)" > <div class="md-item-empty"></div><p>12</p> </md-menu-item>
          <md-menu-item v-on:click="sizeMessage='13.5'" @click="fontSize (4)" > <div class="md-item-empty"></div><p>13.5</p> </md-menu-item>
          <md-menu-item v-on:click="sizeMessage='18'" @click="fontSize (5)" > <div class="md-item-empty"></div><p>18</p> </md-menu-item>
          <md-menu-item v-on:click="sizeMessage='24'" @click="fontSize (6)" > <div class="md-item-empty"></div><p>24</p> </md-menu-item>
          <md-menu-item v-on:click="sizeMessage='36'" @click="fontSize (7)" > <div class="md-item-empty"></div><p>36</p> </md-menu-item>
          <!--
          <md-menu-item v-on:click="sizeMessage='1'" @click="fontSize (1)" > <div class="md-item-empty"></div><p style="font-size: x-small">Größe 1</p> </md-menu-item>
          <md-menu-item v-on:click="sizeMessage='2'" @click="fontSize (2)" > <div class="md-item-empty"></div><p style="font-size: small">Größe 2</p> </md-menu-item>
          <md-menu-item v-on:click="sizeMessage='3'" @click="fontSize (3)" > <div class="md-item-empty"></div><p style="font-size: medium">Größe 3 (Standard)</p> </md-menu-item>
          <md-menu-item v-on:click="sizeMessage='4'" @click="fontSize (4)" > <div class="md-item-empty"></div><p style="font-size: large">Größe 4</p> </md-menu-item>
          <md-menu-item v-on:click="sizeMessage='5'" @click="fontSize (5)" > <div class="md-item-empty"></div><p style="font-size: x-large">Größe 5</p> </md-menu-item>
          <md-menu-item v-on:click="sizeMessage='6'" @click="fontSize (6)" > <div class="md-item-empty"></div><p style="font-size: xx-large">Größe 6</p> </md-menu-item>
          <md-menu-item v-on:click="sizeMessage='7'" @click="fontSize (7)" > <div class="md-item-empty"></div><p style="font-size: 3rem">Größe 7</p> </md-menu-item>-->
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
        <button md-menu-trigger type="button" class="btn btn-light btn-tmenu btn-tmenu-menu btn-tmenu-menu-center" >
          <i class="material-icons">format_color_text</i>
        </button>

        <md-menu-content class="menu-content">
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
          <!--
          <md-menu-item @click="foreColor ('#000000')" > <div class="md-item-filled"><div class="color color-black"></div></div> Schwarz </md-menu-item>
          <md-menu-item @click="foreColor ('#0000FF')" > <div class="md-item-filled"><div class="color color-blue"></div></div> Blau </md-menu-item>
          <md-menu-item @click="foreColor ('#33CC33')" > <div class="md-item-filled"><div class="color color-green"></div></div> Grün </md-menu-item>
          <md-menu-item @click="foreColor ('#FF0000')" > <div class="md-item-filled"><div class="color color-red"></div></div> Rot </md-menu-item>
          <md-menu-item @click="foreColor ('#FFEE84')" > <div class="md-item-filled"><div class="color color-yellow"></div></div> Gelb </md-menu-item>
          -->
        </md-menu-content>
      </md-menu>

      <md-menu md-size="small" md-align-trigger  >
        <md-tooltip md-delay="300">Hervorhebungsfarbe</md-tooltip>
        <button md-menu-trigger type="button" class="btn btn-light btn-tmenu btn-tmenu-menu btn-tmenu-menu-right" >
          <i class="material-icons">border_color</i>
        </button>

        <md-menu-content class="menu-content">
          <md-menu-item @click="hiliteColor ('#ffffff')"><div class="md-item-filled"><img src="../assets/baseline-format_color_reset-24px.svg" /></div>Keine Farbe</md-menu-item>
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
          <!--
          <md-menu-item @click="foreColor ('#000000')" > <div class="md-item-filled"><div class="color color-black"></div></div> Schwarz </md-menu-item>
          <md-menu-item @click="foreColor ('#0000FF')" > <div class="md-item-filled"><div class="color color-blue"></div></div> Blau </md-menu-item>
          <md-menu-item @click="foreColor ('#33CC33')" > <div class="md-item-filled"><div class="color color-green"></div></div> Grün </md-menu-item>
          <md-menu-item @click="foreColor ('#FF0000')" > <div class="md-item-filled"><div class="color color-red"></div></div> Rot </md-menu-item>
          <md-menu-item @click="foreColor ('#FFEE84')" > <div class="md-item-filled"><div class="color color-yellow"></div></div> Gelb </md-menu-item>
          -->
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
        sizeMessage: '12'
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

  .btn-tmenu-menu-center {
    border-radius: 0 !important;
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

  .colorPicker {
    margin: 12px 14px 4px 14px;
    line-height: 1.2;
  }

  .row-colorPicker {
    margin: 0 5px 2px 5px;
  }

  .color-colorPicker {
    display: inline-block;
    border: 1px solid #ffffff;
    height: 19px;
    width: 19px;
    cursor: pointer;
    transition: .1s;
  }

  .color-colorPicker:hover {
    border-color: white;
    -webkit-box-shadow: 0px 0px 0px 2px rgba(0,0,0,1) !important;
    -moz-box-shadow: 0px 0px 0px 2px rgba(0,0,0,1) !important;
    box-shadow: 0px 0px 0px 2px rgba(0,0,0,1) !important;
  }
</style>
