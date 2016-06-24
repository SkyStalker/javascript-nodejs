'use strict';

const getOauthRequestUrl = require('../lib/getOauthRequestUrl');

// DEPRECATED, not used
exports.get = function*() {
  return;
  if (!this.user || !this.user.hasRole('teacher')) {
    this.throw(403);
  }

  this.body = this.render('oauth');
};

exports.post = function*() {
  return;
  if (!this.user || !this.user.hasRole('teacher')) {
    this.throw(403);
  }
  
  this.redirect(getOauthRequestUrl(this.request.body.state, '/dropbox/oauth-redirect'));
};
