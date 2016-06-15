'use strict';

require('../../templates/blocks/newsletter.styl');

const NewsletterSendUi = require('./newsletterSendUi');
const NewsletterReleaseForm = require('./newsletterReleaseForm');

function init() {

  let form = document.querySelector('.newsletter-release-form');
  if (form) {
    new NewsletterReleaseForm({elem: form});
  }

  let elem = document.querySelector('.newsletter-send');
  if (elem) {
    new NewsletterSendUi({elem});
  }
}


init();
