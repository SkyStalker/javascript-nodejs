'use strict';

const _ = require('lodash');
const path = require('path');
const Transaction = require('payments').Transaction;
const User = require('users').User;
const CourseParticipant = require('../../models/courseParticipant');
const CourseInvite = require('../../models/courseInvite');
const CourseGroup = require('../../models/courseGroup');
const registerParticipants = require('../../lib/registerParticipants');
const assert = require('assert');
const sendMail = require('mailer').send;

exports.post = function*() {

  let participant = yield CourseParticipant.findById(this.request.body.id).populate('user');

  this.log.debug("participant dismiss", participant);

  participant.isActive = false;

  yield participant.persist();

  this.body = 'Участник отчислен: ' + participant.user.email;

};

