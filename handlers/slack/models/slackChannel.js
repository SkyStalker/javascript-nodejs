'use strict';

const mongoose = require('lib/mongoose');


const schema = new mongoose.Schema({
  channelId:  {
    type:     String,
    required: true,
    unique:   true
  },
  name:       {
    type:     String,
    required: true
  },
  isArchived: {
    type:     Boolean,
    required: true
  },
  isGeneral:  {
    type:     Boolean,
    required: true
  },
  isGroup:    { // is private group?
    type:     Boolean,
    required: true
  }
}, {
  timestamps: true
});


schema.statics.readSlack = function(channel) {
  return {
    channelId:  channel.id,
    name:       channel.name,
    isArchived: channel.is_archived,
    isGeneral:  Boolean(channel.is_general), // not exists for groups
    isGroup:    Boolean(channel.is_group) // not exists for channels
  };
};

schema.statics.fromSlack = function(channel) {
  return new this(this.readSlack(channel));
};

module.exports = mongoose.model('SlackChannel', schema);

