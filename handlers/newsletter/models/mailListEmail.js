'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseTimestamp = require('lib/mongooseTimestamp');
require('./mailList');

const schema = new Schema({
  mailList: {
    type: Schema.Types.ObjectId,
    ref:  'MailList',
    required: true
  },
  email: {
    type: String,
    required: true
  }
});

schema.index({mailList: 1, email: 1}, {unique: true});

schema.plugin(mongooseTimestamp);

module.exports = mongoose.model('MailListEmail', schema);
