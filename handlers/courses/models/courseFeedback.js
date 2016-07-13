'use strict';

const ucWordStart = require('textUtil/ucWordStart');
const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const Schema = mongoose.Schema;
const countries = require('countries');
const CourseGroup = require('./courseGroup');
const CacheEntry = require('cache').CacheEntry;
const groupBy = require('lodash/groupBy');

const schema = new Schema({

  group: {
    type: Schema.Types.ObjectId,
    ref:  'CourseGroup',
    required: true,
    index: true
  },

  courseCache: {
    type: Schema.Types.ObjectId,
    ref:  'Course',
//    required: true, autoassigned by hook
    index: true
  },

  stars: {
    type: Number,
    required: "Не стоит оценка.",
    min: 1,
    max: 5
  },

  content: {
    type: String,
    trim: true,
    required: "Отсутствует текст отзыва."
  },

  teacherComment: {
    type: String,
    trim: true
  },

  participant: {
    type: Schema.Types.ObjectId,
    ref:  'CourseParticipant',
    required: true,
    index: true
  },

  teacherCache: {
    type: Schema.Types.ObjectId,
    ref:  'User',
    required: true,
    index: true
  },

  userCache: {
    type: Schema.Types.ObjectId,
    ref:  'User',
    required: true,
    index: true
  },

  // todo (not used now)
  // for selected reviews, to show at the courses main, cut them at this point
  // todo: add an intelligent cutting function like jQuery dotdotdot, but w/o jquery
  cutAtLength: {
    type: Number
  },

  // copy from avatar if exists
  photo: {
    type: String
  },

  country: {
    type: String,
    enum: Object.keys(countries.all),
    required: "Страна не указана."
  },

  city: {
    type: String,
    trim: true
  },

  isPublic: {
    type: Boolean,
    required: true
  },

  recommend: {
    type: Boolean,
    required: true
  },

  aboutLink: {
    type: String,
    trim: true
  },

  occupation: {
    type: String,
    trim: true
  },

  created: {
    type:    Date,
    default: Date.now
  }
});



schema.pre('save', function(next) {
  const self = this;

  if (this.group.course) {
    if (this.group.course._id) {
      this.courseCache = this.group.course._id;
    } else {
      this.courseCache = this.group.course;
    }
    next();
  } else {
    CourseGroup.findOne({_id: this.group}, function(err, group) {
      if (err) return next(err);
      self.courseCache = group.course;
      next();
    });
  }
});

schema.pre('save', function(next) {
  if (this.city) {
    this.city = ucWordStart(this.city);
  }
  next();
});

schema.statics.getFeedbackStats = function*(course, {nocache} = {}) {

  if (!nocache) {
    return yield* CacheEntry.getOrGenerate({
      key:  'courses:feedback:' + course.slug,
      tags: ['courses:feedback']
    }, this.getFeedbackStats.bind(this, course, {nocache: true}));
  }

  let groups = yield CourseGroup.find({
    course: course.id
  });

  let groupIds = groups.map(group => group._id);

  let stats = yield this.aggregate([
    {
      $match: {
        group: {
          $in: groupIds
        },
        isPublic: true
      }
    },
    {
      $group: {
        _id:   '$stars',
        count: {
          $sum: 1
        }
      }
    }
  ]).exec();

  let totalFeedbacks = stats.reduce(function(prev, next) { return prev + next.count; }, 0);

  //console.log(totalFeedbacks);
  // default stats (if no stars for a star)
  let starStatsPopulated = {};
  for(let i=1; i<=5; i++) starStatsPopulated[i] = {
    count: 0,
    fraction: 0
  };

  stats.forEach(function(stat) {
    starStatsPopulated[stat._id] = {
      count: stat.count,
      fraction: stat.count ? +(stat.count / totalFeedbacks).toFixed(2) : 0
    };
  });


  let recommendStats = yield this.aggregate([
    {
      $match: {
        group: {
          $in: groupIds
        },
        isPublic: true
      }
    },
    {
      $group: {
        _id:   '$recommend',
        count: {
          $sum: 1
        }
      }
    }
  ]).exec();


  recommendStats = groupBy(recommendStats, '_id');

  if (!recommendStats[true]) recommendStats[true] = [{count: 0}];
  if (!recommendStats[false]) recommendStats[false] = [{count: 0}];

  // 76% recommend
  let recommendFraction = recommendStats[true][0].count / (recommendStats[true][0].count + recommendStats[false][0].count) || 0;

  return {
    stars: starStatsPopulated,
    recommendFraction: recommendFraction,
    total: totalFeedbacks
  };
};


schema.plugin(autoIncrement.plugin, {model: 'CourseFeedback', field: 'number', startAt: 1});

module.exports = mongoose.model('CourseFeedback', schema);

