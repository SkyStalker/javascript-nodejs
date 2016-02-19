'use strict';

const BasicParser = require('markit/basicParser');
const prism = require('client/prism');

const template = require('../templates/editor.jade');
const throttle = require('lodash/throttle');
const clientRender = require('client/clientRender');


const delegate = require('client/delegate');

const t = require('i18n');

const LANG = require('config').lang;

t.requirePhrase('mdeditor', require('../locales/' + LANG + '.yml'));

const buttonSets = {
  standard: 'bold italic | link ul ol | code fencedCode'.split(' ')
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


  actionFencedCode() {
    this.replaceSelection("\n```js\n", "\n```\n", t("mdeditor.text.fencedCode"));
  }

  actionLink() {
    let text;
    let link;

    let value = this.textArea.value;
    let hasSelection = (this.textArea.selectionStart != this.textArea.selectionEnd);

    let selection = hasSelection ? value.slice(this.textArea.selectionStart, this.textArea.selectionEnd) : '';

    if (selection) {
      if (selection.match(/^https?:\/\//)) {
        link = selection;
      } else {
        text = selection;
      }
    }

    let substitutionText = text || t('mdeditor.text.link'); // || link ?
    let substitution = '[' + substitutionText + '](' + (link || 'http://') + ')';

    let before = value.slice(0, this.textArea.selectionStart);
    let after = value.slice(this.textArea.selectionEnd);
    this.textArea.value = before + substitution + after;

    if (!text) {
      // select default text
      this.textArea.selectionStart = before.length + 1;
      this.textArea.selectionEnd = before.length + 1 + substitutionText.length;
    } else if (!link) {
      // place cursor after http://
      this.textArea.selectionEnd = before.length + substitution.length - 1;
      this.textArea.selectionStart = this.textArea.selectionEnd;
    }

  }

  actionOl() {
    this.replaceSelection("\n\n1. ", "\n", t('mdeditor.text.ol'));
  }

  actionUl() {
    this.replaceSelection("\n\n- ", "\n", t('mdeditor.text.ol'));
  }

  actionHeading() {
    this.replaceSelection("\n\n# ", "\n", t('mdeditor.text.heading'));
  }

  actionImage() {
    // todo
    /*
    let selection = this.codemirror.getSelection();
    let text = t("mdeditor.text.alt");

    if (!selection) {
      selection = "http://my.jpg";
    }
    this.codemirror.replaceSelection('![' + text + '](' + selection + ')');
    let cursorPos = this.codemirror.getCursor();
    this.codemirror.setCursor(cursorPos.line, cursorPos.ch - (1 + selection.length));
    */
  }


  replaceSelection(prefix, suffix, defaultText) {
    let value = this.textArea.value;
    let hasSelection = (this.textArea.selectionStart != this.textArea.selectionEnd);

    let selection = hasSelection ? value.slice(this.textArea.selectionStart, this.textArea.selectionEnd) : '';

    let substitution = hasSelection ?
      (prefix + selection + suffix) :
      (prefix + defaultText + suffix);

    let before = value.slice(0, this.textArea.selectionStart);
    let after = value.slice(this.textArea.selectionEnd);
    this.textArea.value = before + substitution + after;

    if (!hasSelection) {
      this.textArea.selectionStart = before.length + prefix.length;
      this.textArea.selectionEnd = before.length + prefix.length + defaultText.length;
    }
    this.renderPreviewThrottled();
  }

  render(textArea) {

    let buttonSet = buttonSets[this.options.buttonSet || 'standard'];

    textArea.insertAdjacentHTML("afterEnd", clientRender(template, {
      buttons: buttonSet
    }));

    this.elem = textArea.nextElementSibling;

    let templateArea = this.elem.querySelector('textarea');
    templateArea.replace(textArea);
    this.textArea = textArea;

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
    let height = e.clientY - this.textArea.getBoundingClientRect().top;
    if (height < 30) height = 30;
    this.textArea.style.height = height + 'px';
  }

  onResizeMouseUp(e) {
    this.elem.classList.remove('mdeditor_resizing');
    document.removeEventListener('mousemove', this.onResizeMouseMove);
    document.removeEventListener('mouseup', this.onResizeMouseUp);
  }

  constructor(options) {
    this.options = Object.create(options);
    if (!options.buttonSet) this.options.buttonSet = 'standard';

    this.renderPreviewThrottled = throttle(this.renderPreview.bind(this), 100);

    this.render(options.elem);
    this.renderPreviewThrottled();

    this.delegate('[data-action]', 'click', function(e) {
      let actionName = 'action' +
        e.delegateTarget.getAttribute('data-action')[0].toUpperCase() +
        e.delegateTarget.getAttribute('data-action').slice(1);

      if (!this[actionName]) return;

      e.preventDefault();
      this[actionName]();
      this.textArea.focus();
    });


    this.onResizeMouseDown = this.onResizeMouseDown.bind(this);
    this.onResizeMouseMove = this.onResizeMouseMove.bind(this);
    this.onResizeMouseUp = this.onResizeMouseUp.bind(this);

    this.delegate('[data-mdeditor-resize]', 'mousedown', this.onResizeMouseDown);

    this.textArea.addEventListener("input", this.renderPreviewThrottled);
  }

  highlightInPreview() {
    prism.highlight(this.elem.querySelector('[data-editor-preview]'));
  }

  renderPreview() {
    let value = this.textArea.value;
    let rendered = new BasicParser().render(value);
    this.elem.querySelector('[data-editor-preview]').innerHTML = rendered;
    this.highlightInPreview();
  }

}

delegate.delegateMixin(MdEditor.prototype);

module.exports = MdEditor;
