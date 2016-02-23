'use strict';

var co = require('co');
var fs = require('fs');
var log = require('log')();
var glob = require('glob');
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
const sendNewsletterReleaseOne = require('./sendNewsletterReleaseOne');

// simultaneous mandrill api requests count
const MANDRILL_CONCURRENCY = 10;

// returns true if sending was finished (or never started)
module.exports = function*() {


  let newsletterRelease = yield NewsletterRelease.findOneAndUpdate({
    sendScheduledAt: {
      $lt: new Date()
    },
    sendingPid: 0 // not sending yet
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
      modified: {
        $lt: new Date(Date.now() - 300*1e5)
      }
    }).populate('user to.courseGroup to.newsletter to.mailList');

    for (let i = 0; i < newsletterReleasesMaybeStale.length; i++) {
      let newsletterReleaseMaybeStale = newsletterReleasesMaybeStale[i];

      if (running(newsletterReleaseMaybeStale.pid)) {
        continue;
      }

      log.debug("Found a stale newsletterRelase", newsletterRelease);
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

  log.debug("Sending newsletter", newsletterRelease.toObject());

  // form recipients list
  // email => Subscription || Participant || MailListEmail
  let recipientsByEmail = yield* makeRecipients(newsletterRelease);

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

  return sendFinished;

};

function* makeRecipients(newsletterRelease) {
  let recipientsByEmail = {};
  for (let i = 0; i < newsletterRelease.to.length; i++) {
    var toItem = newsletterRelease.to[i];
    if (toItem.newsletter) {
      let subscriptions = yield Subscription.find({
        newsletters: toItem.newsletter
      }, {email: true, accessKey: true, _id: false});
      for (let j = 0; j < subscriptions.length; j++) {
        var subscription = subscriptions[j];
        if (toItem.exclude) {
          delete recipientsByEmail[subscription.email];
        } else {
          recipientsByEmail[subscription.email] = subscription;
        }
      }
    } else if (toItem.courseGroup) {
      let participants = yield CourseParticipant.find({
        isActive: true,
        group:    toItem.courseGroup
      }).populate('user', 'email'); // only user email

      for (let j = 0; j < participants.length; j++) {
        let participant = participants[j];
        if (toItem.exclude) {
          delete recipientsByEmail[participant.user.email];
        } else {
          recipientsByEmail[participant.user.email] = participant;
        }
      }
    } else if (toItem.mailList) {
      let emails = yield MailListEmail.find({
        mailList: toItem.mailList
      }, {email: true, _id: false}); // only user email
      for (let j = 0; j < emails.length; j++) {
        let entry = emails[j];
        if (toItem.exclude) {
          delete recipientsByEmail[entry.email];
        } else {
          recipientsByEmail[entry.email] = entry;
        }
      }
    } else {
      throw new Error("Not implemented toItem type " + JSON.stringify(toItem.toObject()));
    }
  }

  // now remove those who received the newsletter already
  let received = yield Letter.find({
    labelId: newsletterRelease._id
  }, {'message.to': 1, _id: false}).lean();

  for (let i = 0; i < received.length; i++) {
    let emails = received[i].message.to.map(t => t.email);
    emails.forEach(email => delete recipientsByEmail[email]);
  }

  return recipientsByEmail;

}


function* sendBatch(newsletterRelease, recipientsQueue) {

  let currentQueueNo = 0;

  let cancelled = false;
  setTimeout(function checkCancel() {

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
      yield* sendNewsletterReleaseOne(newsletterRelease, recipient);
    });
  }

  let pool = new PromisePool(producer, MANDRILL_CONCURRENCY);

  pool.addEventListener('rejected', function (event) {
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
