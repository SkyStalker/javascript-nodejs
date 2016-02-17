'use strict';

var bytes = require('bytes');
var Course = require('../models/course');
var sendMail = require('mailer').send;
var path = require('path');
var CourseGroup = require('../models/courseGroup');
var CourseParticipant = require('../models/courseParticipant');
var _ = require('lodash');
var multiparty = require('multiparty');
var config = require('config');
var fs = require('mz/fs');
var fse = require('fs-extra');
var transliterate = require('textUtil/transliterate');
var exec = require('child_process').exec;
var glob = require('glob');
var iprotect = require('iprotect');
var moment = require('momentWithLocale');
var stripTags = require('textUtil/stripTags');

exports.get = function*() {

  var group = this.locals.group = this.groupBySlug;

  this.locals.title = "Рассылки по группе\n" + group.title;


  this.body = this.render('groupMaterials');
};
