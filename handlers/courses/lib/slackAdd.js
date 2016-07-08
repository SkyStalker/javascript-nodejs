'use strict';

const path = require('path');
const config = require('config');
const log = require('log')();
const request = require('request-promise');
const slackClient = require('slack').client();

module.exports = function*(group) {

  let response = yield slackClient.groups.create(group.slug);

  group.slackGroup = response.group;
  yield group.persist();

  yield slackClient.groups.invite(group.slackGroup.id, config.slack.bot.id);

};
