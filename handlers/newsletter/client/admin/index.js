'use strict';

require('./styles');

require('mdeditor/client');

let xhr = require('client/xhr');

function initNewsletterReleaseForm() {
  let form = document.querySelector('.newsletter-release-form');
  if (!form) return;

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
}


function init() {
  initNewsletterReleaseForm();
}


init();
