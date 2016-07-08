'use strict';

const NewsletterRelease = require('../models/newsletterRelease');
const Subscription = require('../models/subscription');
const MailListEmail = require('../models/mailListEmail');
const CourseParticipant = require('courses').CourseParticipant;

/**
 * Find all recipients for the release
 * @param newsletterRelease
 * @returns {{}}
 */
module.exports = function*(newsletterRelease) {
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
      }).populate('user group');

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

  return recipientsByEmail;

};
