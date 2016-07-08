const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },

  // freeform
  // so that any changes in the schema will not affect the store
  payload: {},

  // only message parsed
  message: {
  }
});

schema.index({ 'message.mail.messageId': 1 });



module.exports = mongoose.model('SQSNotification', schema);
