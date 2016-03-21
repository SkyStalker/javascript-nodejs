'use strict';

let webClient = require('../lib/client');
let User = require('users').User;

exports.get = function*() {

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
    console.log("updated user", member.profile.email);
  }

  this.body = 'OK ' + new Date();
};
