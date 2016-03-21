'use strict';

let webClient = require('./client');
let User = require('users').User;
const log = require('log')();

module.exports = function*() {

  let list = yield new Promise((resolve, reject) => {
    webClient.users.list(function(err, list) {
      err ? reject(err) : resolve(list);
    });
  });

  for(let member of list.members) {
    if (!member.profile.email) continue; // e.g slackbot has no email
    yield User.update({
      email: member.profile.email
    }, {
      $set: {
        slackId: member.id
      }
    });
    log.debug("slack sync user", member.profile.email);
  }

};
