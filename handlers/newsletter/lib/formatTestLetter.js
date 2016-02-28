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
const formatLetter = require('./formatLetter');
const User = require('users').User;
const findRecipients = require('./findRecipients');

/**
 *
 * @param newsletterRelease
 * @param email
 * @returns {*}
 */
module.exports = function* (newsletterRelease, email) {

  let recipientsByEmail = yield* findRecipients(newsletterRelease);

  let recipient = recipientsByEmail[email];

  // create a dummy recipient
  if (!recipient) {
    let toItem = newsletterRelease.to[0];
    if (toItem.newsletter) {
      recipient = new Subscription({
        newsletters: [newsletterRelease.newsletter],
        email:       email,
        accessKey:   '' + Math.random()
      });
    } else if (toItem.courseGroup) {
      recipient = new CourseParticipant({
        group:     toItem.courseGroup,
        isActive:  true,
        user:      (yield User.findOne({email: email})) || new User({
          email:       email,
          displayName: "Tester",
          profileName: "tester"
        }),
        firstName: "FirstName",
        surname:   "Surname"
      });
    } else {
      recipient = email;
    }
  }

  let letter = yield* formatLetter(newsletterRelease, recipient, {noLabel: true});
  return letter;

};
