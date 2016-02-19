'use strict';

const BasicParser = require('markit/basicParser');
const CodeMirror = require('codemirror');
const prism = require('client/prism');
require('codemirror/mode/gfm/gfm');

const template = require('../templates/editor.jade');
const throttle = require('lodash/throttle');
const clientRender = require('client/clientRender');


const delegate = require('client/delegate');

const t = require('i18n');

const LANG = require('config').lang;

t.requirePhrase('mdeditor', require('../locales/' + LANG + '.yml'));

const buttonSets = {
  standard: 'bold italic | link ul ol | code fencedCode | undo redo'.split(' ')
};

class MdEditor {

  actionBold() {
    this.replaceSelection("**", "**", t("mdeditor.text.bold"));
  }


  actionItalic() {
    this.replaceSelection("*", "*", t("mdeditor.text.italic"));
  }

  actionCode() {
    this.replaceSelection("`", "`", t("mdeditor.text.code"));
  }

  actionRedo() {
    this.codemirror.redo();
  }

  actionUndo() {
    this.codemirror.undo();
  }

  actionFencedCode() {
    let hadSelection = this.codemirror.getSelection();
    this.replaceSelection("\n```js\n", "\n```\n", t("mdeditor.text.fencedCode"));

    let cursorPos = this.codemirror.getCursor();
    let line = cursorPos.line - 2;
    this.codemirror.setCursor(line, 9999);
    if (!hadSelection) {
      // select default
      this.codemirror.setSelection(
        {line, ch: 0},
        {line, ch: 9999}
      );
    }
  }

  actionLink() {
    let text;
    let link;

    let selection = this.codemirror.getSelection();

    if (selection) {
      if (selection.match(/^https?:\/\//)) {
        link = selection;
      } else {
        text = selection;
      }
    }
    let substitution = '[' + (text || t('mdeditor.text.link')) + '](' + (link || 'http://') + ')';

    this.codemirror.replaceSelection(substitution);

    let cursorPos = this.codemirror.getCursor();

    if (!text) {
      this.codemirror.setCursor(cursorPos.line, cursorPos.ch - substitution.length + 1 + t('mdeditor.text.link').length);
      this.codemirror.setSelection(
        {line: cursorPos.line, ch: cursorPos.ch - substitution.length + 1},
        {line: cursorPos.line, ch: cursorPos.ch -  substitution.length + 1 + t('mdeditor.text.link').length}
      );
    } else if (!link) {
      this.codemirror.setCursor(cursorPos.line, cursorPos.ch - 1);
    }

  }

  actionOl() {
    let cursorPos = this.codemirror.getCursor();
    this.codemirror.setSelection(
      {line: cursorPos.line, ch: 0},
      {line: cursorPos.line, ch: 99999}
    );

    this.replaceSelection("1. ", "\n", t('mdeditor.text.ol'));
  }

  actionUl() {
    let cursorPos = this.codemirror.getCursor();
    this.codemirror.setSelection(
      {line: cursorPos.line, ch: 0},
      {line: cursorPos.line, ch: 99999}
    );

    this.replaceSelection("- ", "\n", t('mdeditor.text.ol'));
  }

  actionHeading() {
    let cursorPos = this.codemirror.getCursor();
    this.codemirror.setSelection(
      {line: cursorPos.line, ch: 0},
      {line: cursorPos.line, ch: 99999}
    );

    this.replaceSelection("# ", "\n", t('mdeditor.text.heading'));
  }

  actionImage() {
    // todo
    let selection = this.codemirror.getSelection();
    let text = t("mdeditor.text.alt");

    if (!selection) {
      selection = "http://my.jpg";
    }
    this.codemirror.replaceSelection('![' + text + '](' + selection + ')');
    let cursorPos = this.codemirror.getCursor();
    this.codemirror.setCursor(cursorPos.line, cursorPos.ch - (1 + selection.length));
  }

  replaceSelection(before, after, defaultText) {

    let selection = this.codemirror.getSelection();

    let defaultTextUsed = !selection;

    let substitution = defaultTextUsed ? (before + defaultText + after) : (before + selection + after);
    this.codemirror.replaceSelection(substitution);

    let cursorPos = this.codemirror.getCursor();

    if (defaultTextUsed) {
      this.codemirror.setCursor(cursorPos.line, cursorPos.ch - after.length);
      this.codemirror.setSelection(
        {line: cursorPos.line, ch: cursorPos.ch - defaultText.length - after.length},
        {line: cursorPos.line, ch: cursorPos.ch - after.length}
      );
    }
  }

  render(textArea) {

    let buttonSet = buttonSets[this.options.buttonSet || 'standard'];

    textArea.insertAdjacentHTML("afterEnd", clientRender(template, {
      buttons: buttonSet
    }));

    this.elem = textArea.nextElementSibling;

    let templateArea = this.elem.querySelector('textarea');
    templateArea.replace(textArea);

    textArea.classList.remove('mdeditor');
    // move all classes from template textarea to the existing one
    for (var i = 0; i < templateArea.classList.length; i++) {
      var cls = templateArea.classList[i];
      textArea.classList.add(cls);
    }
  }

  onResizeMouseDown(e) {
    this.elem.classList.add('mdeditor_resizing');
    document.addEventListener('mousemove', this.onResizeMouseMove);
    document.addEventListener('mouseup', this.onResizeMouseUp);
    e.preventDefault();
  }

  onResizeMouseMove(e) {
    let editorElem = this.codemirror.getWrapperElement();
    let height = e.clientY - editorElem.getBoundingClientRect().top;
    console.log(height);
    if (height < 30) height = 30;
    this.codemirror.setSize('100%', height);
  }

  onResizeMouseUp(e) {
    this.elem.classList.remove('mdeditor_resizing');
    document.removeEventListener('mousemove', this.onResizeMouseMove);
    document.removeEventListener('mouseup', this.onResizeMouseUp);
  }

  constructor(options) {
    this.options = Object.create(options);
    if (!options.buttonSet) this.options.buttonSet = 'standard';

    this.render(options.elem);
    this.value = this.elem.value;

    this.delegate('[data-action]', 'click', function(e) {
      let actionName = 'action' +
        e.delegateTarget.getAttribute('data-action')[0].toUpperCase() +
        e.delegateTarget.getAttribute('data-action').slice(1);

      if (!this[actionName]) return;

      e.preventDefault();
      this[actionName]();
      this.codemirror.focus();
    });


    this.onResizeMouseDown = this.onResizeMouseDown.bind(this);
    this.onResizeMouseMove = this.onResizeMouseMove.bind(this);
    this.onResizeMouseUp = this.onResizeMouseUp.bind(this);

    this.renderPreviewThrottled = throttle(this.renderPreview.bind(this), 100);
    this.highlightInPreviewThrottled = throttle(this.highlightInPreview.bind(this), 500);

    this.delegate('[data-mdeditor-resize]', 'mousedown', this.onResizeMouseDown);

    this.codemirror = CodeMirror.fromTextArea(this.elem.querySelector('textarea'), {
      tabSize: 2,
      //lineNumbers: false,
      mode:    'gfm'
    });

    this.codemirror.setOption("extraKeys", {
      'Ctrl-B': () => this.actionBold(),
      'Ctrl-I': () => this.actionItalic(),
      'Cmd-B': () => this.actionBold(),
      'Cmd-I': () => this.actionItalic()
    });


    this.codemirror.on("change", this.renderPreviewThrottled);

  }

  highlightInPreview() {
    prism.highlight(this.elem.querySelector('[data-editor-preview]'));
  }

  renderPreview() {
    let value = this.codemirror.getValue();
    let rendered = new BasicParser().render(value);
    this.elem.querySelector('[data-editor-preview]').innerHTML = rendered;
    this.highlightInPreviewThrottled();
  }

}

delegate.delegateMixin(MdEditor.prototype);

module.exports = MdEditor;
