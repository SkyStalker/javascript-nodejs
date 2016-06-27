'use strict';

const CourseGroup = require('courses').CourseGroup;
const webClient = require('../lib/client');
const log = require('log')();

module.exports = function*() {

  let list = yield new Promise((resolve, reject) => {
    webClient.groups.list(function(err, list) {
      err ? reject(err) : resolve(list);
    });
  });

  for(let slackGroup of list.groups) {
    let group = yield CourseGroup.findOne({
      slug: slackGroup.name
    });

    if (!group) continue;

    group.slackGroup = slackGroup;
    log.debug("slack sync group", group.slug);
    yield group.persist();
  }

};
