'use strict';

const path = require('path');
const multiparty = require('multiparty');
const config = require('config');
const fs = require('mz/fs');

const CourseTeacher = require('../../models/courseTeacher');
const CourseGroup = require('../../models/courseGroup');
const Course = require('../../models/course');
const moment = require('momentWithLocale');
const stripTags = require('textUtil/stripTags');
const webinarAdd = require('../../lib/webinarAdd');
const slackAdd = require('../../lib/slackAdd');

exports.get = function*() {

  let courseTeachers = yield CourseTeacher.find({
    teacher: this.user
  }).populate('course');

  this.locals.courses = courseTeachers.map(t => t.course);

  this.body = this.render('teacher/groupCreate');
};

exports.post = function*() {

  let course = yield Course.findById(this.request.body.course);

  if (!course) {
    this.throw(404, {info: 'Нет такого курса'});
  }

  let courseTeacher = yield CourseTeacher.findOne({
    teacher: this.user,
    course:  course._id
  });

  if (!courseTeacher) {
    this.throw(403, {info: 'Вы не ведёте данный курс'});
  }

  let dayNames = ['', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];

  let dateStart = moment(this.request.body.dateStart + ' ' + this.request.body.timeStart, "YYYY-MM-DD HH:mm").toDate();
  let dateEnd = moment(this.request.body.dateEnd + ' ' + this.request.body.timeEnd, "YYYY-MM-DD HH:mm").toDate();

  let group = yield CourseGroup.create({
    course:            course,
    dateStart:         dateStart,
    dateEnd:           dateEnd,
    participantsLimit: this.request.body.participantsLimit,
    price:             course.price,
    weekDays:          this.request.body.weekday.map(v => +v),
    datesSkip:         (this.request.body.dateSkip || []).map(d => moment(d, 'YYYY-MM-DD').toDate()),
    timeStart:         this.request.body.timeStart,
    timeEnd:           this.request.body.timeEnd,
    timeDesc:          this.request.body.weekday.map(n => dayNames[n]).join('/') + ' ' +
                       this.request.body.timeStart + ' – ' + this.request.body.timeEnd + ' GMT+3',
    title:             course.title + ' (' + moment(dateStart).format('DD.MM') + ', ' + this.request.body.timeStart + ')',
    isOpenForSignup:   true,
    isListed:          true,
    materials:         [],
    teacher:           this.user,
    slug:              course.slug + '-' + moment(dateStart).format('YYYYMMDD-HHmm'),
    videoKeyTagCached: course.videoKeyTag
  });

  this.log.debug(group);

  yield* webinarAdd(group);

  yield* slackAdd(group);

  this.body = 'OK';
};
