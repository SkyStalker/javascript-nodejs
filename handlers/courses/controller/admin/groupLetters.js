'use strict';

const CourseGroupLetterTemplate = require('../../models/courseGroupLetterTemplate');
const CourseGroupLetter = require('../../models/courseGroupLetter');

exports.getList = function*() {

  var group = this.locals.group = this.groupBySlug;

  this.locals.title = "Рассылки по группе\n" + group.title;

  this.locals.letters = yield CourseGroupLetter.find({
    user: this.user,
    group: group._id
  }).sort({created: -1});

  this.body = this.render('admin/groupLetter/letters');

};
