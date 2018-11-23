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
        pagecolor: 'white'
      }
    },
    methods: {

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

  sub, sup {
    position: relative;
  }

</style>
