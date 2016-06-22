'use strict';

const SlackChannelMember = require('slack').SlackChannelMember;
const SlackUser = require('slack').SlackUser;
const SlackChannel = require('slack').SlackChannel;
const slackClient = require('slack').client();
const config = require('config');

exports.up = function*() {

  return;
  // already executed
  let response = yield new Promise((resolve, reject) => {
    slackClient.groups.list(function(err, result) {
      err ? reject(err) : resolve(result);
    });
  });

  for (let i = 0; i < response.groups.length; i++) {
    let group = response.groups[i];
    let res = yield new Promise((resolve, reject) => {
      slackClient.groups.invite(group.id, config.slack.bot.id, function(err, result) {
        err ? reject(err) : resolve(result);
      });
    });

  }

};

exports.down = function*() {
  throw new Error("Rollback not implemented");
};
