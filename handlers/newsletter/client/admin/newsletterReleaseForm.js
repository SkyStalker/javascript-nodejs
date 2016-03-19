'use strict';

const xhr = require('client/xhr');
var Spinner = require('client/spinner');
const clientRender = require('client/clientRender');
var notification = require('client/notification');
var delegate = require('client/delegate');
const toItemEmpty = require('../../templates/admin/toItemEmpty.jade');

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
      e.target.closest('.newsletter-release-form__select').remove();
    });


    delegate(form, '[data-newsletter-send-one]', 'click', function(e) {

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


    });



    delegate(form, '[data-newsletter-to-add]', 'click', function(e) {
      e.preventDefault();

      let selectBlocks = form.querySelectorAll('[data-newsletter-release-to-line]');
      let insertPoint = selectBlocks[selectBlocks.length - 1];


      let toVariants = [];
      let selectExampleOptions = form.querySelector('[data-newsletter-release-to-line] select').options;

      for (let i = 0; i < selectExampleOptions.length; i++) {
        let option = selectExampleOptions[i];
        toVariants.push({key: option.value, value: option.innerHTML});
      }


      insertPoint.insertAdjacentHTML('afterEnd', clientRender(toItemEmpty, {
           toVariants,
        i: selectBlocks.length
      }));
    });

    let previewWindow;
    delegate(form, '[data-newsletter-preview]', 'click', function(e) {

      if (!previewWindow || previewWindow.closed) {
        previewWindow = window.open("about:blank", "newsletterPreview", "width=600,height=" + (window.innerHeight - 100));
      }
      form.target = 'newsletterPreview';
      setTimeout(function() {
        form.target = '';
      }, 100);
    });
  }
};
