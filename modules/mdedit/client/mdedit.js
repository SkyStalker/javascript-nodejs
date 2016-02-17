'use strict';

const CodeMirror = require('codemirror');
require('codemirror/mode/gfm/gfm');

var template = require('../templates/editor.jade');

var clientRender = require('client/clientRender');


const delegate = require('client/delegate');

const t = require('i18n');

const LANG = require('config').lang;

t.requirePhrase('mdedit', require('../locales/' + LANG + '.yml'));

class MdEdit {

  actionBold() {
    this.replaceSelection("**", "**", 2, t("bold"));
  }


  actionItalic() {
    this.replaceSelection("*", "*", 1, t("italic"));
  }

  actionCode() {
    this.replaceSelection("`", "`", 0, t("code"));
  }

  actionRedo() {
    this.codemirror.redo();
  }

  actionUndo() {
    this.codemirror.undo();
  }

  actionFencedCode() {
    this.replaceSelection("\n```js\n", "\n```\n", 0, t("code_multiline"));
  }

  actionLink() {

    let selection = this.codemirror.getSelection();
    let text = '';
    let link = 'http://';

    if (selection.match(/^https?:\/\//)) {
      link = selection;
    } else {
      text = selection;
    }

    if (link) {
      text = 'link text';
    }
    this.codemirror.replaceSelection('[' + text + '](' + link + ')');
    let cursorPos = this.codemirror.getCursor();
    this.codemirror.setCursor(cursorPos.line, cursorPos.ch - (3 + link.length));
  }

  actionOl() {
    this.replaceSelection("1. ", "\n", 0, t('ol_item'));
  }

  actionUl() {
    this.replaceSelection("- ", "\n", 0, t('ul_item'));
  }

  actionHeading() {
    this.replaceSelection("# ", "\n", 0, t("heading"));
  }

  actionImage() {
    let selection = this.codemirror.getSelection();
    let text = t("alt");

    if (!selection) {
      selection = "http://my.jpg";
    }
    this.codemirror.replaceSelection('![' + text + '](' + selection + ')');
    let cursorPos = this.codemirror.getCursor();
    this.codemirror.setCursor(cursorPos.line, cursorPos.ch - (1 + selection.length));
  }

  replaceSelection(before, after, moveCursorCharsCount, defaultText) {

    let selection = this.codemirror.getSelection();
    if (!selection)
      selection = defaultText;
    this.codemirror.replaceSelection(before + selection + after);

    let cursorPos = this.codemirror.getCursor();
    this.codemirror.setCursor(cursorPos.line, cursorPos.ch - moveCursorCharsCount);
  }

  render(textArea) {
    var allButtons = {
      Bold:       'bold [Ctrl-B]',
      Italic:     'italic [Ctrl-I]',
      Code:       'inline code',
      Undo:       'undo [Ctrl-Z]',
      Redo:       'redo [Ctrl-Y]',
      FencedCode: 'multiline code',
      Link:       'link',
      Ul:         'itemized list',
      Ol:         'ordered list',
      Heading:    'heading',
      Image:      'insert image'
    };

    function makeButtonsFromActions(actions) {
      var buttons = [];
      for (var i = 0; i < actions.length; i++) {
        buttons.push({action: actions[i], title: allButtons[actions[i]]});
      }
    }

    var buttons;
    switch (this.options.buttonSet) {
    default:
      buttons = makeButtonsFromActions('Bold Italic Code Undo Redo FencedCode Link Ul Ol Heading Image').split(' ')
    }

    textArea.insertAdjacentHTML("afterEnd", clientRender(template, {
      buttons: buttons,
      value:   this.value
    }));

    this.elem = textArea.nextElementSibling;

    let templateArea = this.elem.querySelector('textarea');
    templateArea.replace(textArea);

    // move all classes from template textarea to the existing one
    for (var i = 0; i < templateArea.classList.length; i++) {
      var cls = templateArea.classList[i];
      textArea.classList.add(cls);
    }
  }

  constructor(options) {
    this.render(options.elem);
    this.value = this.elem.value;

    this.options = options;

    this.delegate('[data-action]', function(e) {
      let actionName = 'action' + this.delegateTarget.getAtribute('data-action');
      if (!this[actionName]) return;

      e.preventDefault();
      this[actionName]();
    });

    this.codemirror = CodeMirror.fromTextArea(elem.querySelector('textarea'), {
      tabSize:     2,
      lineNumbers: false,
      mode:        'gfm'
    });

    this.codemirror.setOption("extraKeys", {
      'Ctrl-B': () => this.actionBold(),
      'Ctrl-I': () => this.actionItalic()
    });


    /*
     editor.on("change", function(cm, change) {
     document.getElementById("qa-preview").innerHTML = cm.getValue();
     });
     */

  }
}

delegate.delegateMixin(MdEdit.prototype);

module.export = MdEdit;
