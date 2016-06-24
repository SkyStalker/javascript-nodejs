'use strict';

const config = require('config');
const request = require('request-promise');
const log = require('log')();
const querystring = require('querystring');

module.exports = function getOauthRequestUrl(state, redirect) {
  const params = {
    response_type: 'code',
    client_id:     config.dropbox.key,
    state:         state,
    redirect_uri:  (process.env.NODE_ENV == 'production' ? ('https://' + config.domain.main) : 'http://localhost') + redirect
  };

  return 'https://www.dropbox.com/oauth2/authorize?' + querystring.stringify(params);
};

