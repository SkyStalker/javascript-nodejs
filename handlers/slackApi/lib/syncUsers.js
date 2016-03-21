'use strict';

let User = require('users').User;
let webClient = require('./client');

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
    console.log("updated user", member.profile.email);
  }

};
