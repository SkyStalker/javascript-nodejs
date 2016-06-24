var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
  account: {
    type: Schema.Types.ObjectId,
    ref: 'DropboxAccount',
    required: true
  },

  path: {
    type: String,
    required: true
  },

  sharedFolderId: {
    type: String,
    required: true
  },

  name: {
    type: String,
    required: true
  },

  timeInvited: {
    type: Date,
    required: true
  },

  parentSharedFolderId: {
    type: String
  }

}, {
  timestamps: true
});

module.exports = mongoose.model('DropboxSharedFolder', schema);

