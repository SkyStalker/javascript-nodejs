'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  sent: {
    type: Boolean,
    required: true,
    index: true,
    default: false
  },
  created: {
    type: Date,
    index: true,
    default: Date.now
  },

  // add a label to search through db for sent messages
  // e.g can send letters for the same label to those who didn't receive it
  label: {
    type: String,
    index: true
  },

  // or you can label with objectId
  // e.g NewsletterRelease
  labelId: {
    type:  Schema.Types.ObjectId,
    index: true
  },

  message: {},

  messageId: String, // from transport

  lastSqsNotification: {  },

  transportResponse: {
    messageId: String,
    envelope: {},
    accepted: {},
    rejected: {},
    pending: {},
    response: String
  }

});

schema.methods.getFailureDescription = function() {

  if (!this.sent) {
    return "The letter was not sent";
  }

  if (!this.lastSqsNotification) {
    return "unknown";
  }

  if (this.lastSqsNotification.notificationType == 'Bounce') {
    let desc = "";
    try {
      desc = this.lastSqsNotification.bounce.bouncedRecipients[0].diagnosticCode;
    } catch(e) {
      desc = this.lastSqsNotification.bounce.bounceType + '/' + this.lastSqsNotification.bounce.bounceSubType;
    }
    return desc;
  } else if (this.lastSqsNotification.notificationType == 'Complaint') {
    return "Complaint";
  } else {
    return "";
  }

};

schema.index({ 'message.to.address': 1 });
schema.index({ 'messageId': 1 });
var Letter = module.exports = mongoose.model('Letter', schema);
