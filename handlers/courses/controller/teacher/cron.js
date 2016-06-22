'use strict';

const path = require('path');
const multiparty = require('multiparty');
const config = require('config');
const sendMail = require('mailer').send;

const CourseGroup = require('../../models/courseGroup');

// CRONTAB at 12 am every day
exports.get = function*() {

  if (!this.isAdmin) {
    this.throw(403);
  }

  // groups finished less than 1 month ago
  let groups = yield CourseGroup.find({
    dateEnd: {
      $gt: new Date(new Date() - 86400 * 30 * 1e3)
    }
  }).populate('teacher');

  for (let i = 0; i < groups.length; i++) {
    let group = groups[i];

    let weekBeforeDate = new Date(group.dateStart);
    weekBeforeDate.setDate(weekBeforeDate.getDate() - 9);

    let dayBeforeDate = new Date(group.dateStart);
    dayBeforeDate.setDate(dayBeforeDate.getDate() - 2);

    if (group.dateStart < new Date(2016, 5, 20)) {
      // old groups
      return;
    }
    if (!group.teacherNotificationState) {
      group.teacherNotificationState = {};
    }

    if (new Date() > group.dateEnd + 2 * 86400 * 1000) { // 2 days after group end
      if (!group.teacherNotificationState.afterSent) {
        // send mail about finishing group
        yield sendMail({
          templatePath: path.join(this.templateDir, 'teacher/notification/after'),
          to: group.teacher.teacherEmail,
          group: group,
          subject: "Окончание группы: " + group.title
        });

        group.teacherNotificationState.afterSent = true;

        yield group.persist();
      }

    } else if (new Date() > dayBeforeDate) {

      if (!group.teacherNotificationState.rightBeforeSent) {
        // send mail to teacher about "finish sending letters for newcomers"
        yield sendMail({
          templatePath: path.join(this.templateDir, 'teacher/notification/rightBefore'),
          to: group.teacher.teacherEmail,
          group: group,
          subject: "Скоро группа: " + group.title
        });

        group.teacherNotificationState.rightBeforeSent = true;

        yield group.persist();
      }
    } else if (new Date() > weekBeforeDate) {
      if (!group.teacherNotificationState.weekBeforeSent) {
        yield sendMail({
          templatePath: path.join(this.templateDir, 'teacher/notification/weekBefore'),
          to: group.teacher.teacherEmail,
          group: group,
          subject: "Напоминание: " + group.title
        });

        group.teacherNotificationState.weekBeforeSent = true;

        yield group.persist();
      }

    }


  }

  this.body = 'OK';
};
