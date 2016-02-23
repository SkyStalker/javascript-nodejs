'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseTimestamp = require('lib/mongooseTimestamp');

const schema = new Schema({
  title: {
    type:     String,
    required: true
  }
});

schema.plugin(mongooseTimestamp);

module.exports = mongoose.model('MailList', schema);
