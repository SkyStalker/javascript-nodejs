'use strict';

var co = require('co');
var fs = require('fs');
var log = require('log')();
var gutil = require('gulp-util');
var glob = require('glob');
const path = require('path');
const Newsletter = require('../models/newsletter');
const Subscription = require('../models/subscription');
const mailer = require('mailer');
const Letter = require('mailer').Letter;
const config = require('config');
const send = require('../lib/send');


// Sends all newsletter letters
module.exports = function(options) {

  return function() {

    return co(function* () {

      let sendFinished = yield* send();

      gutil.log("sendFinished: " + sendFinished);

    });

  };
};


