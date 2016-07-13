'use strict';

const mongoose = require('mongoose');
const countries = require('countries');
const CourseFeedback = require('../models/courseFeedback');
const CourseGroup = require('../models/courseGroup');
const CourseTeacher = require('../models/courseTeacher');
const Course = require('../models/course');
const User = require('users').User;
const groupBy = require('lodash/groupBy');
const CacheEntry = require('cache').CacheEntry;

exports.get = function*() {

  this.locals.course = yield Course.findOne({
    slug: this.params.course
  });

  if (!this.locals.course) {
    this.throw(404);
  }

  this.locals.title = "Отзыв о курсе\n" + this.locals.course.title;

  // star => count

  let feedbackStats = yield* CourseFeedback.getFeedbackStats(this.locals.course);

  let teachers = yield CourseTeacher.find({
    course: this.locals.course._id
  }).populate('teacher');

  teachers = teachers.map(t => t.teacher);

  this.body = this.render('feedback/list', {
    stats: feedbackStats,
    teachers
  });

};

