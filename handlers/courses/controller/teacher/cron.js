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

exports.get = function*() {

  if (!this.isAdmin) return;

  // groups finished less than 1 month ago
  let groups = yield CourseGroup.find({
    dateEnd: {
      $gt: new Date(new Date() - 86400 * 30 * 1e3)
    }
  });

  for (let i = 0; i < groups.length; i++) {
    let group = groups[i];

    let weekBeforeDate = new Date(group.dateStart);
    weekBeforeDate.setDate(weekBeforeDate.getDate() - 9);

    if (!group.teacherNotificationState.weekBeforeSent && new Date() > weekBeforeDate) {
      // send mail to teacher
    }


    let dayBeforeDate = new Date(group.dateStart);
    dayBeforeDate.setDate(dayBeforeDate.getDate() - 2);
    if (!group.teacherNotificationState.rightBeforeSent && new Date() > dayBeforeDate) {
      // send mail to teacher about "finish sending letters for newcomers"
    }

    if (!group.teacherNotificationState.afterSent && new Date() > group.dateEnd) {
      // send mail about finishing group
    }

  }

  this.body = 'OK';
};
