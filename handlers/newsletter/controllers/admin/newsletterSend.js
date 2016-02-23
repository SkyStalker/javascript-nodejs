// DEPRECATED NOT USED
'use strict';

throw new Error("DEPRECATED");

const NewsletterTemplate = require('../../models/newsletterTemplate');
const NewsletterRelease = require('../../models/newsletterRelease');
const Newsletter = require('../../models/newsletter');
const CourseGroup = require('courses').CourseGroup;
const ObjectId = require('mongoose').Types.ObjectId;
const moment = require('momentWithLocale');

function* loadById(id) {
  if (!ObjectId.isValid(id)) {
    this.throw(400);
  }

  let newsletterRelease = yield NewsletterRelease.findById(id)
    .populate('to.courseGroup to.newsletter to.mailList');

  if (!newsletterRelease) {
    this.throw(404);
  }
  if (!this.isAdmin && !newsletterRelease.user.equals(this.user._id)) {
    this.throw(403);
  }

  return newsletterRelease;
}

exports.get = function*() {

  this.locals.title = "Отправка";

  this.locals.newsletterRelease = yield* loadById.call(this, this.params.id);

  this.body = this.render('admin/newsletterSend');
};



exports.post = function*() {

  let newsletterRelease = yield* loadById.call(this, this.request.body.id);

  if (this.request.body.action == 'send') {
    newsletterRelease.sendScheduledAt = this.request.body.sendScheduledAt ?
      moment(this.request.body.sendScheduledAt).toDate() :
      new Date();

    yield newsletterRelease.persist();

    this.addFlashMessage('success', 'Рассылка поставлена в очередь.');

    this.redirect(this.originalUrl);
    return;
  }

  if (this.request.body.action == 'cancelSend') {
    newsletterRelease.sendScheduledAt = undefined;
    yield newsletterRelease.persist();

    this.addFlashMessage('success', 'Рассылка отменена.');

    this.redirect(this.originalUrl);
    return;
  }

  if (this.request.body.action == 'sendOne') {
    let mail = this.request.body.sendOneMail.toLowerCase();
    console.log(this.request.body);

    this.addFlashMessage('success', 'TODO.');

    this.redirect(this.originalUrl);
    return;
  }

// todo

};
