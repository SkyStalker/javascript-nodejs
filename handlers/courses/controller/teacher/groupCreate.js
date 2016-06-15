'use strict';

var bytes = require('bytes');
var path = require('path');
var multiparty = require('multiparty');
var config = require('config');
var fs = require('mz/fs');
var fse = require('fs-extra');
var transliterate = require('textUtil/transliterate');
var exec = require('child_process').exec;
var glob = require('glob');
var CourseTeacher = require('../../models/courseTeacher');
var moment = require('momentWithLocale');
var stripTags = require('textUtil/stripTags');

// Group info for a participant, with user instructions on how to login
exports.get = function*() {

  if (!this.user || !this.user.hasRole('teacher')) {
    this.throw(403);
  }

  let courseTeachers = yield CourseTeacher.find({
    teacher: this.user
  }).populate('course');

  this.locals.courses = courseTeachers.map(t => t.course);

  this.body = this.render('teacher/groupCreate');
};
