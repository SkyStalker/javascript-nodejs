'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CourseGroup = require('courses').CourseGroup;
const Newsletter = require('./newsletter');
const MailList = require('./mailList');
const log = require('log')();

const mongooseTimestamp = require('lib/mongooseTimestamp');

const toSchema = new Schema({
  courseGroup: { // courseGroup OR newsletter
    type: Schema.Types.ObjectId,
    ref:  'CourseGroup'
  },
  newsletter:  {
    type: Schema.Types.ObjectId,
    ref:  'Newsletter'
  },
  mailList:  {
    type: Schema.Types.ObjectId,
    ref:  'MailList'
  },
  exclude:     {
    type: Boolean,
    default: false
  }
});

toSchema.methods.getKey = function() {
  if (!this.courseGroup && !this.newsletter && !this.mailList) {
    throw new Error("Malformed 'to' item:" + this.toJSON());
  }
  return this.courseGroup ? 'courseGroup:' + (this.courseGroup._id || this.courseGroup) :
      this.newsletter ?  'newsletter:' +  (this.newsletter._id || this.newsletter) :
        this.mailList ? 'mailList:' +  (this.mailList._id || this.mailList) : undefined;
};

toSchema.methods.getTitle = function() {
  return this.courseGroup ? (this.courseGroup.title || 'Not populated group') :
    this.newsletter ? (this.newsletter.title || 'Not populated newsletter') :
      (this.mailList.title || 'Not populated mailList');
};

// keeps all important features for a letter release
// can use it to send more to the same newsleters subscribers (when they appear)
const schema = new Schema({

  user: {  // this release created by who?
    type:     Schema.Types.ObjectId,
    ref:      'User',
    required: true
  },

  title: {
    type:     String,
    required: true,
    trim:     true
  },

  content: {
    type:     String,
    required: true,
    trim:     true
  },

  // new style
  to: [toSchema],

  /* DEPRECATED... */
  newsletters:       {
    type: [{
      type: Schema.Types.ObjectId,
      ref:  'Newsletter'
    }]
  },
  newslettersExcept: {
    type: [{
      type: Schema.Types.ObjectId,
      ref:  'Newsletter'
    }]
  },

  /* ...DEPRECATED */

  // date when the need for the CRON script to send it
  sendScheduledAt: {
    type: Date
  },

  // send process finished at least once
  // TO becomes non-editable
  sendFinished: {
    type: Boolean
  },

  // pid of CRON is working on it
  // 0 when finished
  sendingPid: {
    type: Number,
    default: 0
  }
});

schema.plugin(mongooseTimestamp);

// ensure ids exist for groups & newsletters
schema.path('to').validate(function(value, respond) {
  if (!value) return respond(false, 'Не указано поле "Кому"');
  if (!value.length) return respond(false, 'Не указано поле "Кому"');

  let jobs = [];
  for (var i = 0; i < value.length; i++) {
    var toItem = value[i];

    if (!toItem.courseGroup && !toItem.newsletter && !toItem.mailList) {
      respond(false, 'No "to" entities are set');
      return;
    }
    if (toItem.courseGroup && !toItem.courseGroup._id) {
      jobs.push(CourseGroup.findById(toItem.courseGroup));
    }
    if (toItem.newsletter && !toItem.newsletter._id) {
      jobs.push(Newsletter.findById(toItem.newsletter));
    }
    if (toItem.mailList && !toItem.mailList._id) {
      jobs.push(MailList.findById(toItem.mailList));
    }
  }

  Promise.all(jobs).then(function(results) {
    for (let i = 0; i < results.length; i++) {
      let result = results[i];
      if (!result) {
        respond(false, 'Some of the "to" entities are missing');
        return;
      }
    }
    respond(true);
  }, function(error) {
    log.error(error);
    respond(false, error.message);
  });

});

module.exports = mongoose.model('NewsletterRelease', schema);
