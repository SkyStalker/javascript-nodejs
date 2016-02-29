#!/usr/bin/env node

'use strict';

require('config');
const mongoose = require('lib/mongoose');
const log = require('log')();
const NewsletterSenderService = require('newsletter').SenderService;
const MailerStatusService = require('mailer').StatusService;

const co = require('co');

let services = [
  new NewsletterSenderService(),
  new MailerStatusService()
];

co(function*()  {
  log.info("Starting services");
  yield services.map(service => service.start());
  log.info("Services finished");
}).catch(function(err) {
  console.error(err.message, err.stack);
}).then(function() {
  mongoose.disconnect();
});

setTimeout(function() {
  process.send('online');
}, 500); // wait a bit to see that nothing dies

process.on('message', function(msg) {
  if (msg == 'shutdown') {

    log.info('Stopping all services...');

    services.forEach(service => service.stop());
  }
});
