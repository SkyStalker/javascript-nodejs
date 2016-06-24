'use strict';

const DropboxAccount = require('dropbox').DropboxAccount;
const getOauthRequestUrl = require('dropbox').getOauthRequestUrl;
const config = require('config');
const request = require('request-promise');
const CourseGroup = require('../models/courseGroup');


// use ?slug= to pass group, because the same url is used for oauth-redirect
exports.get = function*() {

  let group = yield CourseGroup.findOne({
    slug: this.query.state || this.query.slug
  }).populate('teacher dropboxAccount');

  if (!group) {
    this.throw(404);
  }

  if (!group.teacher._id.equals(this.user._id) && !this.isAdmin) {
    this.throw(403, {info: 'Must be a teacher of this group or admin to link dropbox'});
  }

  if (group.dropboxAccount) {
    this.throw(400, {info: 'The group is already linked to ' + group.dropboxAccount.email});
  }

  if (!this.query.code) {
    // initial request
    this.redirect(getOauthRequestUrl(group.slug, '/courses/groups/dropbox-link'));
    return;
  }

  // redirected back with auth code
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

  let account = new DropboxAccount({
    state: this.query.state,
    code: this.query.code,
    accessToken: response.access_token,
    accountId: response.account_id
  });


  yield* account.fetchCurrentAccount();

  yield account.persist();

  yield group.persist({
    dropboxAccount: account._id
  });

  this.body = "Dropbox-аккаунт " + account.email + " прилинкован к группе " + group.slug;

};

