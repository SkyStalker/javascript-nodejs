'use strict';

const DropboxAccount = require('../models/dropboxAccount');
const DropboxError = require('./dropboxError');
const DropboxSharedFolder = require('../models/dropboxSharedFolder');
const request = require('request-promise');
const log = require('log')();

module.exports = function*({account, path, email}) {

  let sharedFolder = yield DropboxSharedFolder.findOne({
    account: account._id,
    path: path
  });

  if (!sharedFolder) {
    // Create shared folder
    let result = yield* account.request('sharing/share_folder', {
        path
    });

    sharedFolder = yield DropboxSharedFolder.create({
      account: account._id,
      path: path,
      sharedFolderId: result.shared_folder_id,
      name: result.name,
      timeInvited: new Date(result.time_invited),
      parentSharedFolderId: result.parentSharedFolderId
    });


  }

  let result = yield* account.request('sharing/add_folder_member', {
      shared_folder_id: sharedFolder.sharedFolderId,
      members: [
        {
          "member": {
            ".tag": "email",
            "email": email
          },
          "access_level": {
            ".tag": "viewer"
          }
        }
      ]
  });


  return result;
};
