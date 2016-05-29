'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  email: {
    type: String,
    required: true,
    index: true,
    lowercase: true
  },
  reasonSqs: {
    type:  Schema.Types.ObjectId,
    ref: 'SQSNotification'
  },

  created: {
    type: Date,
    index: true,
    default: Date.now
  }
  
});

module.exports = mongoose.model('SuppressedEmail', schema);
