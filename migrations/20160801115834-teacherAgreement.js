'use strict';

var CourseTeacher = require('courses').CourseTeacher;

exports.up = function*() {
  let courseTeachers = yield CourseTeacher.find().populate('teacher');

  for (let i = 0; i < courseTeachers.length; i++) {
    let teacher = courseTeachers[i];
    yield teacher.persist({
      teacherAgreementCompany: teacher.teacher.profileName,
      teacherAgreementName: teacher.teacher.profileName
    });
  }
};

exports.down = function*() {
  throw new Error("Rollback not implemented");
};
