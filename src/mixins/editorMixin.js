export default {
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
    paste () { // dosn't work on Chrome
      document.execCommand('paste', false, null)
    },
    deleteFrom () {
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
      if (document.body.clientWidth >= 700) {
        var url = prompt("'ALT' drücken, um Links im Dokument anzuwählen bzw. zu öffnen!\nLink einfügen: ", 'blnk-io.herokuapp.com/')
        // console.log(url)
        if (url != null) {
          document.execCommand('createLink', false, 'https://' + url)
        }
      } else {
        var url2 = prompt('Link einfügen: ', 'blnk-io.herokuapp.com/')
        // console.log(url2)
        if (url2 != null) {
          document.execCommand('createLink', false, 'https://' + url2)
        }
      }
    },
    unlink () {
      document.execCommand('unlink', false, null)
    },
    foreColor (textColor) {
      document.execCommand('foreColor', false, textColor)
    },
    fontName (textFont) {
      document.execCommand('fontName', false, textFont)
    },
    fontSize (textSize) {
      document.execCommand('fontSize', false, textSize)
    },
    hiliteColor (backgroundColor) {
      document.execCommand('hiliteColor', false, backgroundColor)
    },
    contentReadOnly () {
      document.execCommand('contentReadOnly', false, true)
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
    },
    print () {
      window.print()
    },
    contrast () {
      var paper = document.getElementById('paper')
      var back = document.getElementsByClassName('container-fluid')[0]
      var title = document.getElementsByTagName('h1')[0]
      var menu = document.getElementById('barDiv')
      var editName = document.getElementById('editName')
      var menubarClose = document.getElementById('menubarClose')
      // var sidebar = document.getElementById('sidebar')
      if (paper.style.backgroundColor !== '#22262a') {
        paper.style.backgroundColor = '#22262a'
        back.style.backgroundColor = '#343a40'
        menu.style.backgroundColor = '#343a40'
        title.style.color = 'white'
        paper.style.color = 'white'
        editName.style.filter = 'invert(1)'
        paper.children.color = 'white'
        menubarClose.getElementsByTagName('img')[0].style.filter = 'invert(1)'
      } else {
        console.log('test')
      }
      window.onscroll = function () {
        paper.style.backgroundColor = '#22262a'
      }
    }
  }
}
