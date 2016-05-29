'use strict';

const request = require('request-promise');
const config = require('config');

exports.checkCtx = function*(ctx) {

  if (process.env.NODE_ENV == 'test') return true;
  
  let response = yield request.post('https://www.google.com/recaptcha/api/siteverify', {
    json: true,
    form: {
      secret: config.recaptcha.secret,
      response: ctx.request.body['g-recaptcha-response'],
      remoteip: ctx.ip
    }
  });

  return response.success;

};
