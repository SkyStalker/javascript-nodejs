'use strict';

const NewsletterTemplate = require('../../models/newsletterTemplate');
const NewsletterRelease = require('../../models/newsletterRelease');
const Newsletter = require('../../models/newsletter');
const CourseGroup = require('courses').CourseGroup;

function* loadById(id) {
  if (!ObjectId.isValid(id)) {
    this.throw(400);
  }

  let newsletterRelease = yield NewsletterRelease.findById(id);
  if (!newsletterRelease) {
    this.throw(404);
  }
  if (!this.isAdmin && !newsletterRelease.user.equals(this.user._id)) {
    this.throw(403);
  }

  return newsletterRelease;
}

function* getToVariants() {
  let variants = [];
  if (this.isAdmin) {
    let newsletters = yield Newsletter.find().sort({weight: 1});
    for (let i = 0; i < newsletters.length; i++) {
      let newsletter = newsletters[i];
      variants.push({
        key: 'newsletter:' + newsletter.id,
        value: newsletter.title
      });
    }
  }

  let dateGreater = new Date();
  dateGreater.setDate(dateGreater.getDate() - 30);
  let groups = yield CourseGroup.find({
    teacher: this.user._id,
    dateEnd: {
      $gt: dateGreater // finished not more than 1 month ago
    }
  }).sort({dateStart: -1});

  for (let i = 0; i < groups.length; i++) {
    let group = groups[i];

    variants.push({
      key: 'courseGroup:' + group.id,
      value: group.title
    });
  }

  return variants;
}

exports.getList = function*() {

  this.locals.title = "Рассылки";

  this.locals.newsletterReleases = yield NewsletterRelease.find({
    user: this.user
  })
    .sort({created: -1})
    .populate('newsletters courseGroup newslettersExcept');

  this.body = this.render('admin/newsletterReleases');

};

exports.edit = function*() {

  let newsletterRelease;

  if (this.params.id) {
    newsletterRelease = yield* loadById.call(this, this.params.id);
  } else {
    newsletterRelease = new NewsletterRelease({});
  }

  let toVariants = this.locals.toVariants = yield* getToVariants.call(this);

  this.locals.templates = yield NewsletterTemplate.find().sort({created: -1});

  this.locals.title = this.params.id ? "Редактировать рассылку" : "Создать рассылку";

  this.locals.form = {
    title: newsletterRelease.title,
    content: newsletterRelease.content,
    firstSentAt: newsletterRelease.firstSentAt,
    id: this.params.id ? this.params.id : ''
  };

  this.body = this.render('admin/newsletterRelease');
};



exports.post = function*() {


  let newsletterRelease;

  if (this.params.id) {
    newsletterRelease = yield* loadById.call(this, this.params.id);
  } else {
    newsletterRelease = new NewsletterRelease({
      user: this.user
    });
  }

  if (this.request.body.action == 'delete') {
    if (newsletterRelease.firstSentAt) {
      this.addFlashMessage('error', 'Рассылка была отослана, удаление невозможно.');
    } else {
      yield newsletterRelease.remove();
      this.addFlashMessage('success', 'Черновик рассылки удалён.');
    }

    this.redirect('/newsletter/admin/newsletter-releases');
    return;
  }


  let form = this.locals.form = {
    content: this.request.body.content,
    title: this.request.body.title,
    to: this.request.body.to,
    id: this.params.id
  };

  newsletterRelease.content = form.content;
  newsletterRelease.title = form.title;

  delete newsletterRelease.newslettersExcept;
  delete newsletterRelease.newsletters;
  delete newsletterRelease.courseGroup;

  let to = this.request.body.to.split(':');
  if (to[0] == 'newsletter') {
    newsletterRelease.newsletters
  }

  newsletterRelease.title = form.title;

  try {
    yield letterTemplate.persist();
    this.addFlashMessage('success', 'Шаблон успешно сохранён.');

    this.redirect('/newsletter/admin/newsletter-templates');
  } catch (e) {
    if (e.name != 'ValidationError') throw e;

    var errors = this.locals.errors = {};
    for (var key in e.errors) {
      errors[key] = e.errors[key].message;
    }

    this.locals.title = "Редактировать шаблон";

    this.body = this.render('admin/newsletterTemplate');
  }


};
