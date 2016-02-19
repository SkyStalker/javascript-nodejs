'use strict';

var CourseGroup = require('../models/courseGroup');
var CourseGroupLetterTemplate = require('../models/courseGroupLetterTemplate');
var ObjectId = require('lib/mongoose').Types.ObjectId;

exports.getList = function*() {
  if (!this.user || this.user.roles.indexOf('teacher') == -1) {
    this.throw(403);
  }

  this.locals.title = "Шаблоны групповых рассылок";

  this.locals.templates = yield CourseGroupLetterTemplate.find({
    user: this.user
  }).sort({created: -1});

  this.body = this.render('groupLetter/templates');
};

function* loadTemplate(id) {
  if (!ObjectId.isValid(id)) {
    this.throw(400);
  }

  let letterTemplate = yield CourseGroupLetterTemplate.findById(id);
  if (!letterTemplate) {
    this.throw(404);
  }
  if (!this.isAdmin && !letterTemplate.user.equals(this.user._id)) {
    this.throw(403);
  }

  return letterTemplate;
}

exports.post = function*() {
  if (!this.user || this.user.roles.indexOf('teacher') == -1) {
    this.throw(403);
  }

  let letterTemplate;
  if (this.request.body.id) {
    letterTemplate = yield loadTemplate.call(this, this.request.body.id);
  } else {

    letterTemplate = new CourseGroupLetterTemplate({
      user:    this.user
    });

  }

  let form = this.locals.form = {
    content: this.request.body.content,
    title: this.request.body.title,
    id: this.request.body.id
  };

  letterTemplate.content = form.content;
  letterTemplate.title = form.title;

  try {
    yield letterTemplate.persist();
    this.addFlashMessage('success', 'Шаблон успешно сохранён.');

    this.redirect('/courses/group-letter-templates');
  } catch (e) {
    if (e.name != 'ValidationError') throw e;

    var errors = this.locals.errors = {};
    for (var key in e.errors) {
      errors[key] = e.errors[key].message;
    }

    this.locals.title = "Редактировать шаблон";

    this.body = this.render('groupLetter/template');
  }


};

exports.get = function*() {
  let letterTemplate = yield loadTemplate.call(this, this.params.id);

  this.body = {
    title:   letterTemplate.title,
    content: letterTemplate.content
  };
};

exports.edit = function*() {

  let letterTemplate;

  if (this.params.id) {
    letterTemplate = yield loadTemplate.call(this, this.params.id);
  }

  this.locals.title = letterTemplate ? "Редактировать шаблон" : "Создать шаблон";

  this.locals.form = {
    title: letterTemplate ? letterTemplate.title : '',
    content: letterTemplate ? letterTemplate.content : '',
    id: letterTemplate ? letterTemplate.id : ''
  };

  this.body = this.render('groupLetter/template');
};
