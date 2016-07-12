"use strict";

const moment = require('momentWithLocale');
const User = require('users').User;
const Course = require('../models/course');
const CourseGroup = require('../models/courseGroup');
const CourseTeacher = require('../models/courseTeacher');
const CourseFeedback = require('../models/courseFeedback');
const Discount = require('payments').Discount;
const renderFeedback = require('../lib/renderFeedback');
const countries = require('countries');
const getDiscounts = require('../lib/getDiscounts');

const money = require('money');

exports.get = function*() {

  let course = this.locals.course = yield Course.findOne({
    slug: this.params.course
  }).populate('featuredFeedbacks');

  if (!this.locals.course) {
    this.throw(404);
  }

  this.locals.title = course.title;

  this.locals.formatGroupDate = function(date) {
    return moment(date).format('D MMM YYYY').replace(/[а-я]/, function(letter) {
      return letter.toUpperCase();
    });
  };

  let discounts = yield* getDiscounts({
    user:   this.user,
    course: course
  });

  this.locals.teachers = yield CourseTeacher.find({
    course: course._id
  }).populate('teacher');

  this.locals.teachers = this.locals.teachers.map(t => t.teacher);

  let groups = yield CourseGroup.find({
    isListed:        true,
    isOpenForSignup: true,
    dateStart:       {
      $gt: new Date()
    },
    course:          course._id
  }).sort({
    dateStart: 1,
    created:   1
  }).populate('teacher');

  this.locals.groups = groups.map(group => ({
    teacher:           group.teacher,
    price:             Discount.adjustAmountAll(group.price, discounts),
    fullPrice:         (Discount.adjustAmountAll(group.price, discounts) == group.price) ? null : group.price,
    discount:          Discount.getBest(group.price, discounts),
    dateStart:         group.dateStart,
    dateEnd:           group.groupEnd,
    timeDesc:          group.timeDesc,
    participantsLimit: group.participantsLimit,
    slug:              group.slug
  }));

  // first discount
  let firstDiscountedGroup = this.locals.groups.find(g => g.discount);
  let firstDiscount = firstDiscountedGroup && firstDiscountedGroup.discount;

  if (firstDiscount && firstDiscount.discount != 1) {
    this.locals.discountDescription = firstDiscount.description ?
      firstDiscount.description.replace(/EMAIL/g, this.user.email) : 'Скидка предоставлена по коду.';
  }

  for (let i = 0; i < course.featuredFeedbacks.length; i++) {
    let feedback = course.featuredFeedbacks[i];
    yield CourseFeedback.populate(feedback, 'participant');
  }


  let feedbacksRendered = [];

  for (var i = 0; i < course.featuredFeedbacks.length; i++) {
    var feedback = course.featuredFeedbacks[i];

    feedbacksRendered.push(yield* renderFeedback(feedback, {cut: true}));
  }

  this.locals.countries = countries.all;


  this.locals.feedbacks = feedbacksRendered; /*.map(f => ({
    course:         f.course,
    stars:          f.stars,
    allReviewsHref: `/courses/${this.locals.course.slug}/feedbacks`,
    content:        f.content,
    author:         f.author,
    photo:          f.photo,
    country:        f.country,
    city:           f.city
  }));*/

  this.body = this.render('courses/' + this.locals.course.slug);
};
