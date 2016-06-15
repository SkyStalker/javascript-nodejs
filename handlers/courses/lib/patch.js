"use strict";

const CourseParticipant = require('../models/courseParticipant');
const CourseInvite = require('courses').CourseInvite;
const uniq = require('lodash/uniq');
const keyBy = require('lodash/keyBy');
const Order = require('payments').Order;
const createOrderInvites = require('./createOrderInvites');
const sendInvite = require('./sendInvite');

// called by payments/common/order
module.exports = function*() {

  //var group = yield CourseGroup.findById(this.order.data.group).exec();
  let participants = yield CourseParticipant.find({
    group: this.order.data.group
  }).populate('user');

  this.log.debug("participants", participants.map(p => {
    return {email: p.user.email, user: p.user.profileName};
  }));

  let participantsByEmail = keyBy(participants, function(participant) {
    return participant.user.email;
  });

  const invitesAccepted = yield CourseInvite.find({
    order: this.order._id,
    accepted: true
  });

  this.log.debug("invitesAccepted", invitesAccepted);

  const invitesAcceptedByEmail = keyBy(invitesAccepted, 'email');

  if ("emails" in this.request.body) {

    let emails = uniq(this.request.body.emails.split(',').filter(Boolean)).map(String).map(s => s.toLowerCase());

    this.log.debug("Incoming emails", emails);

    // email belongs to a participant
    // if invite for it was accepted (user's email may change, but invite still was accepted)
    // OR if it's participant (for old orders, invite had no order)
    let participatingEmails = uniq(
      Object.keys(participantsByEmail).concat(Object.keys(invitesAcceptedByEmail))
    );

    this.log.debug("Participanting emails", participatingEmails.sort());

    // clean up submitted emails from participants
    emails = emails.filter(function throwAwayParticipantsInSubmitted(email) {
      return participatingEmails.indexOf(email) == -1;
    });

    this.log.debug("Incoming emails except participants", emails);

    // create a new emails list
    // first, take participants from the order:
    let newEmails = this.order.data.emails.filter(function keepParticipantsInOrder(email) {
      // if participant, keep
      return participatingEmails.indexOf(email) != -1;
    });

    this.log.debug("Order participant emails", newEmails);

    // second, add new (non-participating see above) emails
    newEmails = newEmails.concat(emails);

    this.log.debug("Order new emails", newEmails);

    // should never happen (handwired request)
    if (newEmails.length > this.order.data.count) {
      this.throw(400, "Too many emails.");
    }

    this.order.data.emails = newEmails;
  }

  if ("contactName" in this.request.body) {
    this.order.data.contactName = this.request.body.contactName;
  }

  if ("contactPhone" in this.request.body) {
    this.order.data.contactPhone = this.request.body.contactPhone;
  }

  this.order.markModified('data');

  if (this.isAdmin) {
    if ("amount" in this.request.body) {
      this.order.amount = this.request.body.amount;
    }

    if ("currency" in this.request.body) {
      this.order.currency = this.request.body.currency;
    }

    if ("status" in this.request.body) {
      this.order.status = this.request.body.status;
    }
  }

  yield this.order.persist();


  let invites = [];
  if (this.order.status == Order.STATUS_SUCCESS) {

    // first create invites, (in case if mailer dies we have them all)
    invites = yield createOrderInvites(this.order);

    yield invites.map(function(invite) {
      return sendInvite(invite);
    });

  }

  if (invites.length) {
    let emails = invites.map(invite => invite.email);
    this.body = 'Информация обновлена, приглашения высланы на адреса: ' + emails.join(", ") + '.';
  } else {
    this.body = 'Информация об участниках обновлена.';
  }
};

