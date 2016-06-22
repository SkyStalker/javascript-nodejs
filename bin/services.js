#!/usr/bin/env node

'use strict';

require('config');
const mongoose = require('lib/mongoose');
const log = require('log')();
const NewsletterSenderService = require('newsletter').SenderService;
const MailerStatusService = require('mailer').StatusService;
const SlackBotService = require('slack').BotService;

const co = require('co');

let services = [
  new NewsletterSenderService(),
  new MailerStatusService(),
  new SlackBotService()
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
  if (process.send) { // if run by pm2 have this defined
    process.send('online');
  }
}, 500); // wait a bit to see that nothing dies

process.on('message', function(msg) {
  if (msg == 'shutdown') {

    log.info('Stopping all services...');

    services.forEach(service => service.stop());
  }
});
