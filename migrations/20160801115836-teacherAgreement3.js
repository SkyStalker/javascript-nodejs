'use strict';

var CourseTeacher = require('courses').CourseTeacher;

exports.up = function*() {
  let courseTeachers = yield CourseTeacher.find().populate('teacher');

  for (let i = 0; i < courseTeachers.length; i++) {
    let teacher = courseTeachers[i];
    yield teacher.persist({
      teacherAgreement: {
        company: teacher.teacher.profileName,
        name: teacher.teacher.profileName,
        date: new Date(2016,3,1)
      }
    });
  }
};

exports.down = function*() {
  throw new Error("Rollback not implemented");
};
