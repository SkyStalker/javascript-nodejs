'use strict';

require('./styles');

require('mdeditor/client');
const NewsletterSendUi = require('./newsletterSendUi');
const NewsletterReleaseForm = require('./newsletterReleaseForm');

function init() {

  let form;

  form = document.querySelector('.newsletter-release-form');
  if (form) {
    new NewsletterReleaseForm({elem: form});
  }

  let elem = document.querySelector('.newsletter-send');
  if (elem) {
    new NewsletterSendUi({elem});
  }
}


init();
