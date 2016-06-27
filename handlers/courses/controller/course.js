"use strict";

var moment = require('momentWithLocale');
var User = require('users').User;
var Course = require('../models/course');
var CourseGroup = require('../models/courseGroup');
var CourseTeacher = require('../models/courseTeacher');
var CourseFeedback = require('../models/courseFeedback');
const renderFeedback = require('../lib/renderFeedback');
const countries = require('countries');

var money = require('money');

exports.get = function*() {

  this.locals.course = yield Course.findOne({
    slug: this.params.course
  });

  if (!this.locals.course) {
    this.throw(404);
  }

  this.locals.title = this.locals.course.title;

  this.locals.formatGroupDate = function(date) {
    return moment(date).format('D MMM YYYY').replace(/[а-я]/, function(letter) {
      return letter.toUpperCase();
    });
  };

  this.locals.teachers = yield CourseTeacher.find({
    course: this.locals.course._id
  }).populate('teacher');

  this.locals.teachers = this.locals.teachers.map(t => t.teacher);

  this.locals.groups = yield CourseGroup.find({
    isListed: true,
    isOpenForSignup: true,
    dateStart: {
      $gt: new Date()
    },
    course: this.locals.course._id
  }).sort({
    dateStart: 1,
    created: 1
  }).populate('teacher');

  /*
  let feedbacks = yield CourseFeedback.find({
    number: {
      $in: [84, 78,16, 9, 7]
    }
  }).populate('participant');


  let feedbacksRendered = [];

  for (var i = 0; i < feedbacks.length; i++) {
    var feedback = feedbacks[i];

    feedbacksRendered.push(yield* renderFeedback(feedback));
  }

  this.locals.countries = countries.all;


  this.locals.feedbacks = feedbacksRendered.map(f => ({
    course: f.course,
    stars: f.stars,
    allReviewsHref: `/courses/${this.locals.course.slug}/feedbacks`,
    content: f.content,
    author: f.author,
    photo: f.photo,
    country: f.country,
    city: f.city
  }));
   */

  this.body = this.render('courses/' + this.locals.course.slug);
};
