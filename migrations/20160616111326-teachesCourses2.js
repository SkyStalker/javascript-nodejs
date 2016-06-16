'use strict';

var User = require('users').User;
var CourseTeacher = require('courses').CourseTeacher;

exports.up = function*() {
  let users = yield User.find();

  for (var i = 0; i < users.length; i++) {
    let user = users[i];
    if (!user.teachesCourses) continue;

    for (let j = 0; j < user.teachesCourses.length; j++) {
      let courseId = user.teachesCourses[j];
      yield CourseTeacher.create({
        course: courseId,
        teacher: user._id,
        multipler: 0.27
      });
      console.log(courseId, user._id);

    }

    user.teachesCourses = undefined;

    // console.log("fix", user);
    yield user.persist();
  }

};

exports.down = function*() {
  throw new Error("Rollback not implemented");
};
