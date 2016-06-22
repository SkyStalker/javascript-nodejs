'use strict';

const mongoose = require('lib/mongoose');


const schema = new mongoose.Schema({
  // slack ids instead of OIDs, because they are more useful, easier to insert/delete by slack data
  channelId:  {
    type:     String,
    required: true,
    index:    true
  },
  userId:  {
    type:     String,
    required: true,
    index:    true
  }
});

schema.index({userId: 1, channelId: 1}, {unique: true});

module.exports = mongoose.model('SlackChannelMember', schema);

