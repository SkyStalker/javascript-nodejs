'use strict';

const syncUsers = require('../lib/syncUsers');
const CourseGroup = require('courses').CourseGroup;
const webClient = require('../lib/client');
const CourseParticipant = require('courses').CourseParticipant;

exports.get = function*() {
  let group = yield CourseGroup.findOne({slug: this.params.groupId});

  if (!group) {
    this.throw(404);
  }

  yield* syncUsers();

  if (!group.slackGroup) {
    let response = yield new Promise((resolve, reject) => {
      webClient.groups.create(group.slug, function(err, result) {
        err ? reject(err) : resolve(result);
      });
    });

    if (response.ok !== true || !response.group.id) {
      this.log.error("Failed to create slack group", group.slug, response);
      throw new Error("Failed to create slack group " + group.slug);
    }

    group.slackGroup = response.group;
    yield group.persist();
  }


  let participants = yield CourseParticipant.find({
    group:    group._id,
    isActive: true
  }).populate('user');

  let failures = [];

  for (let i = 0; i < participants.length; i++) {
    let participant = participants[i];
    let user = participant.user;

    if (!user.slackId) {
      failures.push(`${participant.fullName} ${user.email} not in slack`);
      continue;
    }

    let response = yield new Promise((resolve, reject) => {
      webClient.groups.invite(group.slackGroup.id, user.slackId, function(err, result) {
        err ? reject(err) : resolve(result);
      });
    });

    if (response.ok !== true) {
      this.log.error("Failed to invite to slack group", group.slackGroup, response);
      throw new Error("Failed to invite to slack group " + group.slug);
    }

  }

  this.body = failures.join("<br>") + '<br>DONE ' + new Date();

};
