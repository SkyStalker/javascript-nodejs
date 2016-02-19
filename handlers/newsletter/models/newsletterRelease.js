const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Letter = require('mailer').Letter;

var mongooseTimestamp = require('lib/mongooseTimestamp');

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

  newsletters:       {
    type: [{
      type: Schema.Types.ObjectId,
      ref:  'Newsletter'
    }]
  },
  courseGroup:       {
    type: Schema.Types.ObjectId,
    ref:  'CourseGroup'
  },
  newslettersExcept: {
    type: [{
      type: Schema.Types.ObjectId,
      ref:  'Newsletter'
    }]
  },
  firstSentAt:       {
    type: Date
  }
});

schema.plugin(mongooseTimestamp);

module.exports = mongoose.model('NewsletterRelease', schema);
