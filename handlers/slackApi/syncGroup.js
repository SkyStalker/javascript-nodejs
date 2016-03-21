'use strict';

let User = require('users').User;
let config = require('config');
let WebClient = require('@slack/client').WebClient;

let options = {};
if (process.env.NODE_ENV == 'development') {
  options.logLevel = 'debug';
}

let webClient = new WebClient(config.slack.token, options);


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
  }

};
