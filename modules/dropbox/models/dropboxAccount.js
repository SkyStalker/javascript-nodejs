var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var request = require('request-promise');

var DropboxError = require('../lib/dropboxError');
var log = require('log')();

var schema = new Schema({

  accountId: {
    type: String,
    unique: true,
    required: true
  },

  // key, for courses usually group slug, to identify the account, bound to it
  state: {
    type: String,
    unique: true,
    required: true
  },

  // current oauth
  code: {
    type: String,
    unique: true,
    required: true
  },

  accessToken: {
    type: String,
    unique: true,
    required: true
  },

  name: {
    givenName: String,
    surname: String,
    familiarName: String,
    displayName: String
  },

  email: {
    type: String,
    required: true
  },

  locale: String,
  country: String


}, {
  timestamps: true
});

schema.methods.request = function* (endpoint, body) {

  log.debug("dropbox request", endpoint, body);

  let result = yield request.post({
    url: 'https://api.dropboxapi.com/2/' + endpoint,
    headers: {
      'Authorization': 'Bearer ' + this.accessToken
    },
    json: true,
    simple: false,
    body: body
  });


  log.debug("dropbox response", result);

  if (result.error) {
    throw new DropboxError(result);
  }

  return result;
};

schema.methods.fetchCurrentAccount = function*() {
  let response = yield* this.request('users/get_current_account');

  this.name = {
    givenName: response.name.given_name,
    surname: response.name.surname,
    familiarName: response.name.familiar_name,
    displayName: response.name.display_name
  };

  this.email = response.email;
  this.locale = response.locale;
  this.country = response.country;
};

module.exports = mongoose.model('DropboxAccount', schema);

