'use strict';

const querystring = require('querystring');
const yakassaConfig = require('config').payments.modules.yakassa;
const request = require('request-promise');
const fs = require('fs');
let cert;
let key;
let ca;

exports.request = function* (method, params) {

  cert = cert || fs.readFileSync(yakassaConfig.certDir + '/ipkantor.cer');
  key = key || fs.readFileSync(yakassaConfig.certDir + '/private.key.decrypted');
  ca = ca || fs.readFileSync(yakassaConfig.certDir + '/ym.pem');

  let result = yield request({
    method: 'POST',
    form: params, //  sets content-type "application/x-www-form-urlencoded";
    url: 'https://penelope.yamoney.ru:443/webservice/mws/api/' + method,
    cert,
    key,
    ca
  });

  return result;

};
