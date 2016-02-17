'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongooseTimestamp = require('lib/mongooseTimestamp');

var schema = new Schema({
  user: {  // this template belongs to who?
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
  }
});

schema.plugin(mongooseTimestamp, {useVirtual: false});

module.exports = mongoose.model('CourseGroupLetterTemplate', schema);

