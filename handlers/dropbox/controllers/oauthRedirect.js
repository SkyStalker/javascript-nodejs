'use strict';

// DEPRECATED NOT USED
const request = require('request-promise');
const DropboxAccount = require('../models/dropboxAccount');
const config = require('config');


exports.get = function*() {
  return;
  
  const formData = {
    code: this.query.code,
    grant_type: 'authorization_code',
    client_id: config.dropbox.key,
    client_secret: config.dropbox.secret,
    redirect_uri: this.protocol + '://' + this.host + this.originalUrl.split('?')[0]
  };

  this.log.debug('Dropbox oauth2/token', formData);

  let response = yield request.post({
    url: 'https://api.dropboxapi.com/oauth2/token',
    json: true,
    simple: false,
    formData: formData
  });

  this.log.debug(response);

  if (response.error) {
    this.throw(500, {info: response.error_summary});
  }

  yield DropboxAccount.create({
    state: this.query.state,
    code: this.query.code,
    accessToken: response.access_token,
    accountId: response.account_id
  });


  this.body = 'OK';
};
