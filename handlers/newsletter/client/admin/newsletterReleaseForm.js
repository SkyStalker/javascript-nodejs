'use strict';

const xhr = require('client/xhr');
const Spinner = require('client/spinner');
const clientRender = require('client/clientRender');
const notification = require('client/notification');
const delegate = require('client/delegate');
const toItemEmpty = require('../../templates/admin/toItemEmpty.jade');
const MdEditorPreview = require('mdeditor/client/mdEditorPreview');
const MdEditor = require('mdeditor/client/mdEditor');


module.exports = class NewsletterReleaseForm {

  constructor(options) {
    let form = options.elem;
    form.querySelector('[data-newsletter-template-select]').onchange = function() {

      if (!confirm('Текущий заголовок и содержимое будут заменены, продолжать?')) {
        this.value = '';
        return;
      }

      var request = xhr({
        method: 'GET',
        url:    '/newsletter/admin/newsletter-templates/rest/' + this.value
      });

      request.addEventListener('success', (event) => {
        this.value = '';

        form.elements.title.value = event.result.title;
        form.elements.content.editor.setValue(event.result.content);
      });
    };


    delegate(form, '[data-newsletter-to-delete]', 'click', function(e) {
      e.preventDefault();
      e.target.closest('.newsletter-release-edit__group').remove();
    });


    form.querySelector('[data-newsletter-send-one]').onclick = function(e) {

      let formData = new FormData(form);
      formData.append('action', 'sendOne');
      let request = xhr({
        method:         'POST',
        url:            form.getAttribute('action'),
        normalStatuses: [200, 400],
        body:           formData
      });


      let spinner = new Spinner({
        elem:  e.target,
        size:  'small',
        class: '',
        elemClass: 'button_loading'
      });
      spinner.start();

      request.addEventListener('loadend', function() {
        spinner.stop();
      });


      request.addEventListener('success', (event) => {
        if (request.status == 400) {
          let message = "Ошибки:<ul>";
          for (let key in event.result.errors) {
            message += "<li>"+event.result.errors[key]+"</li>";
          }
          message += "</ul>";
          new notification.Error(message);
        } else {
          new notification.Success(event.result.message);
        }
      });


    };



    delegate(form, '[data-newsletter-to-add]', 'click', function(e) {
      e.preventDefault();

      let selectBlocks = form.querySelectorAll('.newsletter-release-edit__group');
      let insertPoint = selectBlocks[selectBlocks.length - 1];

      let toVariants = [];
      let selectExampleOptions = form.querySelector('[data-newsletter-release-to] select').options;

      for (let i = 0; i < selectExampleOptions.length; i++) {
        let option = selectExampleOptions[i];
        toVariants.push({value: option.value, text: option.innerHTML});
      }


      insertPoint.insertAdjacentHTML('afterEnd', clientRender(toItemEmpty, {
           toVariants,
        i: selectBlocks.length
      }));
    });

    let previewWindow;
    delegate(form, '[data-newsletter-preview-full]', 'click', function(e) {
      e.preventDefault();
      if (!form.checkValidity()) {
        alert('Пожалуйста, завершите заполнение формы.');
        return;
      }

      if (!previewWindow || previewWindow.closed) {
        previewWindow = window.open("about:blank", "newsletterPreview", "width=600,height=" + (window.innerHeight - 100));
      }

      previewWindow.focus();

      form.target = 'newsletterPreview';
      let actionElem = document.createElement('input');
      actionElem.type = 'hidden';
      actionElem.name = 'action';
      actionElem.value = 'preview';
      form.appendChild(actionElem);
      form.submit();
      setTimeout(function() {
        form.target = '';
        actionElem.remove();
      }, 100);
    });

    let editor = new MdEditor({
      elem: form.querySelector('.mdeditor')
    });

    let preview = new MdEditorPreview({
      editor: editor,
      elem: form.querySelector('[data-editor-preview-content]')
    });

    form.querySelector('[data-editor-preview-toggler]').onclick = e => {
      e.preventDefault();
      form.querySelector('[data-editor-preview]').classList.toggle('newsletter-release-edit__preview_active');
    };

    form.elements.sendType.onchange = function() {
      let elem = form.querySelector('[data-newsletter-schedule]');
      if (this.value == 'schedule') {
        elem.hidden = false;
      } else {
        elem.hidden = true;
      }
    };

  }
};
