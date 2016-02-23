'use strict';

const NewsletterRelease = require('newsletter').NewsletterRelease;
const ObjectId = require('mongoose').Types.ObjectId;

exports.up = function*() {
  let releases = yield NewsletterRelease.find();
  for (let i = 0; i < releases.length; i++) {
    var release = releases[i];
    release.to = [];
    for (let j = 0; j < release.newsletters.length; j++) {
      release.to.push({
        newsletter: release.newsletters[j],
        exclude: false
      });
    }
    let except = release.newslettersExcept || [];
    for (let j = 0; j < except.length; j++) {
      release.to.push({
        newsletter: except[j],
        exclude: true
      });
    }
    releases[i].content = 'Content ' + i;
    releases[i].title = 'Title ' + i;
    releases[i].user = new ObjectId("5523d48d77d8f3225c0fb74f");
    yield releases[i].persist();
  }

};

exports.down = function*() {
  throw new Error("Rollback not implemented");
};
