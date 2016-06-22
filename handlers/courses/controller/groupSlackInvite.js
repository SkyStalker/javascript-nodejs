'use strict';

var config = require('config');
var CourseParticipant = require('../models/courseParticipant');
var CourseGroup = require('../models/courseGroup');
var SlackUser = require('slack').SlackUser;
var User = require('users').User;
var _ = require('lodash');
var moment = require('momentWithLocale');
var path = require('path');
var mongoose = require('mongoose');
var slackClient = require('slack').client();
var slackAdd = require('../lib/slackAdd');

exports.post = function*() {

  let inviteTarget;

  if (this.groupBySlug.teacher._id.equals(this.user._id) || this.user.hasRole('admin')) {
    // this.user is the teacher or admin
    inviteTarget = this.user;
  } else {
    // this.user is a participant?
    let participant = yield CourseParticipant.findOne({
      user: this.user._id,
      group: this.groupBySlug._id,
      isActive: true
    });

    if (participant) {
      inviteTarget = this.user;
    }

  }

  if (!inviteTarget) {
    this.throw(403, {info: 'Не участник и не преподаватель'});
  }

  let inviteEmail = inviteTarget.email;

  let slackUser = yield SlackUser.findOne({
    email: inviteEmail
  });

  if (!slackUser) {
    this.status = 403;
    this.body = {
      error: 'Этот пользователь не зарегистрирован в Slack. Сначала зарегистрируйтесь это на <a href="https://slack.javascript.ru">https://slack.javascript.ru</a>.'
    };
    return;
  }

  let group = this.groupBySlug;

  if (!group.slackGroup) {
    // for old groups, new ones create w/ slack
    yield* slackAdd(group);
  }

  yield slackClient.groups.invite(group.slackGroup.id, slackUser.userId);

  this.body = {
    message: "Пользователь " + inviteEmail + ' добавлен в slack-канал ' + this.groupBySlug.slug + '.'
  };

};
