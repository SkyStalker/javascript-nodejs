'use strict';

var CourseGroup = require('courses').CourseGroup;

exports.up = function*() {
  let groups = yield CourseGroup.find();

  for (let i = 0; i < groups.length; i++) {
    let group = groups[i];
    if (!group.teacherNotificationState) {
      group.teacherNotificationState = {
        skip: true
      };
      yield group.persist();
    }
  }

};

exports.down = function*() {
  throw new Error("Rollback not implemented");
};
