'use strict';

require('config');
require('lib/mongoose');

const co = require('co');
const log = require('log')();
const running = require('is-running');
const path = require('path');
const Newsletter = require('../models/newsletter');
const NewsletterRelease = require('../models/newsletterRelease');
const Subscription = require('../models/subscription');
const MailListEmail = require('../models/mailListEmail');
const CourseParticipant = require('courses').CourseParticipant;
const mailer = require('mailer');
const Letter = require('mailer').Letter;
const config = require('config');
const PromisePool = require('es6-promise-pool');
const formatLetter = require('./formatLetter');
const User = require('users').User;
const findRecipients = require('./findRecipients');

const CONCURRENCY = 10;

module.exports = class SenderService {

  *start() {
    this.state = 'running';

    while (this.state != 'stopping') {
      yield* this.send();

      yield function(callback) {
        setTimeout(callback, 5000);
      };
    }
  }

  stop() {
    this.state = 'stopping';
  }

  *send() {

    let newsletterRelease = yield NewsletterRelease.findOneAndUpdate({
      sendScheduledAt: {
        $lt: new Date()
      },
      sendingPid:      0 // not sending yet
    }, {
      sendingPid: process.pid
    }, {
      new: true
    }).populate('user to.courseGroup to.newsletter to.mailList');

    if (!newsletterRelease) {
      log.debug("Nothing scheduled w/ sendingPid=0, trying to find stale");

      let newsletterReleasesMaybeStale = yield NewsletterRelease.find({
        sendScheduledAt: {
          $lt: new Date()
        },
        modified:        {
          $lt: new Date(Date.now() - 300 * 1e5)
        }
      }).populate('user to.courseGroup to.newsletter to.mailList');

      for (let i = 0; i < newsletterReleasesMaybeStale.length; i++) {
        let newsletterReleaseMaybeStale = newsletterReleasesMaybeStale[i];

        if (running(newsletterReleaseMaybeStale.pid)) {
          continue;
        }

        log.info("Found a stale newsletterRelase", newsletterRelease);
        newsletterRelease = newsletterReleaseMaybeStale;
        yield newsletterRelease.persist({
          sendingPid: process.pid
        });
        break;
      }

    }

    if (!newsletterRelease) {
      log.debug("Nothing to send");
      return true;
    }

    log.info("Sending newsletter", newsletterRelease.toObject());

    // form recipients list
    // email => Subscription || Participant || MailListEmail
    let recipientsByEmail = yield* findRecipients(newsletterRelease);

    // now remove those who received the newsletter already
    let received = yield Letter.find({
      labelId: newsletterRelease._id
    }, {'message.to': 1}).lean();

    for (let i = 0; i < received.length; i++) {
      if (!received[i].message.to.address) {
        throw new Error("Message to is not an object???" + JSON.stringify(received[i]));
      }
      delete recipientsByEmail[received[i].message.to.address];
    }


    log.debug("recipientsByEmail", recipientsByEmail);

    let recipientsQueue = [];
    for (let email in recipientsByEmail) {
      recipientsQueue.push(recipientsByEmail[email]);
    }

    let sendFinished = yield* sendBatch(newsletterRelease, recipientsQueue);

    if (sendFinished) {
      newsletterRelease.sendScheduledAt = undefined;
      newsletterRelease.sendFinished = true;
    }
    newsletterRelease.sendingPid = 0;
    yield newsletterRelease.persist();

    log.info("sendFinished: " + sendFinished);

  }

  *sendBatch(newsletterRelease, recipientsQueue) {

    let currentQueueNo = 0;

    let cancelled = false;

    setTimeout(() => {
      if (this.state == 'stopping') {
        cancelled = true;
        return;
      }

      NewsletterRelease.findById(newsletterRelease._id).then(function(doc) {
        if (!doc) {
          log.debug("Cancel: doc lost");
          cancelled = true;
          return;
        }

        if (!doc.sendScheduledAt || doc.sendScheduledAt > Date.now()) {
          log.debug("Cancel: doc sendScheduledAt is now " + doc.sendScheduledAt);
          cancelled = true;
          return;
        }

        setTimeout(checkCancel, 500);
      }, function(err) {
        log.error("Cancel: query error", err);
        cancelled = true;
      });

    }, 500);

    function producer() {
      if (cancelled) {
        return null;
      }
      if (currentQueueNo == recipientsQueue.length) {
        return null;
      }
      let recipient = recipientsQueue[currentQueueNo];
      currentQueueNo++;

      return co(function*() {

        let letter = yield* formatLetter(newsletterRelease, recipient);
        yield* mailer.sendLetter(letter);

        log.debug("Sent letter to " + letter.message.to.address);
      });
    }

    let pool = new PromisePool(producer, CONCURRENCY);

    pool.addEventListener('rejected', function(event) {
      // The event contains:
      // - target:    the PromisePool itself
      // - data:
      //   - promise: the Promise that got rejected
      //   - error:   the Error for the rejection.
      log.error('Send error:', event.data.error.message, event.data.error.stack);
    });

    yield pool.start();

    if (cancelled) return false;
    return true;
  }
};

