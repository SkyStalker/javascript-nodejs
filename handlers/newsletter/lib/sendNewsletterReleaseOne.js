'use strict';

const path = require('path');
const Newsletter = require('../models/newsletter');
const NewsletterRelease = require('../models/newsletterRelease');
const Subscription = require('../models/subscription');
const MailListEmail = require('../models/mailListEmail');
const CourseParticipant = require('courses').CourseParticipant;
const mailer = require('mailer');
const Letter = require('mailer').Letter;
const config = require('config');
const log = require('log')();
const jade = require('lib/serverJade');
const BasicParser = require('markit').BasicParser;
const logoBase64 = require('fs').readFileSync(path.join(config.projectRoot, 'assets/img/logo.png')).toString('base64');
const assert = require('assert');

function* sendNewsletterReleaseOne(newsletterRelease, recipient) {

  let message = {
    subject:      newsletterRelease.title,
    // auto generate text by default (spamassassin wants that)
    auto_text:    true,
    track_opens:  false,
    track_clicks: false,
    headers:      {
      Precedence: 'bulk'
    }
  };

  let locals = Object.assign({
    lang:       config.lang,
    domain:     config.domain,
    logoBase64: logoBase64
  }, config.jade);


  // from = informer
  if (recipient instanceof Subscription) {
    locals.unsubscribeUrl = config.server.siteHost + '/newsletter/subscriptions/' + recipient.accessKey;
    let sender = config.mailer.senders.informer;

    message.from_email = sender.fromEmail;
    message.from_name = sender.fromName;

    message.to = [{email: recipient.email}];
    message.headers['List-ID'] = '<from.javascript.ru>';
    message.headers['List-Unsubscribe'] = `<${locals.unsubscribeUrl}>`;
    locals.signagure = sender.signature;

  } else if (recipient instanceof CourseParticipant) {
    // from release author
    assert(recipient.user.email);
    message.to = [{
      email: recipient.user.email,
      name:  recipient.fullName
    }];


    if (newsletterRelease.user.teacherEmail) {
      message.from_email = newsletterRelease.user.teacherEmail;
      message.from_name = newsletterRelease.user.displayName + ' (JavaScript.ru)';
    } else {
      let sender = config.mailer.senders.informer;

      message.from_email = sender.fromEmail;
      message.from_name = sender.fromName;
    }

    locals.signature = newsletterRelease.user.emailSignature ?
      new BasicParser().render(newsletterRelease.user.emailSignature) :
      `<em>Успешной разработки!<br>${newsletterRelease.user.displayName}</em>`;

  } else if (recipient instanceof MailListEmail) {

    let sender = config.mailer.senders.informer;

    message.from_email = sender.fromEmail;
    message.from_name = sender.fromName;
    message.to = [{email: recipient.email}];
    locals.signagure = sender.signature;

  } else if (typeof recipient == 'string') {
    // "test letter" to string email

    message.to = [{email: recipient}];
    if (newsletterRelease.user.teacherEmail) {
      message.from_email = newsletterRelease.user.teacherEmail;
      message.from_name = newsletterRelease.user.displayName + ' (JavaScript.ru)';
    } else {
      let sender = config.mailer.senders.informer;

      message.from_email = sender.fromEmail;
      message.from_name = sender.fromName;
    }
    locals.signature = newsletterRelease.user.emailSignature ?
      new BasicParser().render(newsletterRelease.user.emailSignature) :
      `<em>Успешной разработки!<br>${newsletterRelease.user.displayName}</em>`;

  } else {
    log.error("Unknown recipient", recipient);
    throw new Error("Unknown recipient type: " + recipient);
  }

  // no content templating yet
  let parser = new BasicParser();
  locals.messageBody = parser.render(newsletterRelease.content);

  log.debug("Created letter to " + message.to[0].email, message, locals);

  let letterHtml = jade.renderFile(__dirname + '/../templates/admin/email.jade', Object.assign({}, locals, message));
  letterHtml = yield mailer.inlineCss(letterHtml);

  message.html = letterHtml;

  let letter = new Letter({
    message: message,
    labelId: newsletterRelease._id
  });

  yield* mailer.sendLetter(letter);

  log.debug("Sent letter to " + message.to[0].email);
}


module.exports = sendNewsletterReleaseOne;
