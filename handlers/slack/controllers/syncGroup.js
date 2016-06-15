'use strict';

const syncUsers = require('../lib/syncUsers');
const syncGroups = require('../lib/syncGroups');
const CourseGroup = require('courses').CourseGroup;
const webClient = require('../lib/client');
const CourseParticipant = require('courses').CourseParticipant;
const config = require('config');

exports.get = function*() {

  yield* syncUsers();
  yield* syncGroups();

  let groups;
  if (this.params.groupId) {
    let group = yield CourseGroup.findOne({slug: this.params.groupId}).populate('teacher');

    if (!group) {
      this.throw(404);
    }

    groups = [group];
  } else {
    if (!this.isAdmin) {
      this.throw(403);
    }
    groups = yield CourseGroup.find().populate('teacher');
  }

  let results = {};
  for (let i = 0; i < groups.length; i++) {
    let group = groups[i];
    results[group.slug] = yield* inviteGroup.call(this, group);
  }

  this.locals.results = results;

  this.body = this.render('syncGroup');

};

function* inviteGroup(group) {
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

  let inSlack = [];
  let notInSlack = [];

  let users = participants.map(p => p.user);
  users.push(group.teacher);


  for (let i = 0; i < users.length; i++) {
    let user = users[i];

    if (user.email == config.slack.email) continue; // can't invite self

    if (!user.slackId) {
      notInSlack.push(user.email);
      continue;
    }

    this.log.debug("Invite", user.slackId, user.email);

    let response = yield new Promise((resolve, reject) => {
      webClient.groups.invite(group.slackGroup.id, user.slackId, function(err, result) {
        err ? reject(err) : resolve(result);
      });
    });

    if (response.ok !== true) {
      this.log.error("Failed to invite to slack group", group.slackGroup, response);
      throw new Error("Failed to invite to slack group " + group.slug);
    }

    inSlack.push(user.email);

  }

  return {inSlack, notInSlack };
}
