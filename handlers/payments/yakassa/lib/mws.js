'use strict';

const querystring = require('querystring');
const yakassaConfig = require('config').payments.modules.yakassa;
const certPath = yakassaConfig.certDir + '/ipkantor.cer';
const keyPath = yakassaConfig.certDir + '/private.key.decrypted';
const caPath = yakassaConfig.certDir + '/ym.pem';
const log = require('log')();

const request = require('request-promise');
const fs = require('fs');
const spawn = require('child_process').spawn;
let cert;
let key;
let ca;

exports.sendFormRequest = function* (method, params) {

  return yield* sendRequest(method, params, 'x-www-form-urlencoded');

};

// ssh -L 4443:penelope.yamoney.ru:443 learn-ru
function* sendRequest(method, params, type) {

  cert = cert || fs.readFileSync(certPath);
  key = key || fs.readFileSync(keyPath);
  ca = ca || fs.readFileSync(caPath);

  let body = typeof params == 'string' ? params : querystring.stringify(params);

  log.debug("request cert " + method, params);
  let result = yield request({
    method: 'POST',
    headers: {
      'content-type': `application/${type}`
    },
    body: body,
    url: 'https://penelope.yamoney.ru:4443/webservice/mws/api/' + method,
    cert,
    key,
    ca
  });

  return result;

}

exports.sendPkcs7Request = function* (method, params) {

  log.debug("request cert " + method, params);
  cert = cert || fs.readFileSync(yakassaConfig.certDir + '/ipkantor.cer');
  key = key || fs.readFileSync(yakassaConfig.certDir + '/private.key.decrypted');
  ca = ca || fs.readFileSync(yakassaConfig.certDir + '/ym.pem');

  let body = '<?xml version="1.0" encoding="UTF-8"?>';
  body += '<' + method + 'Request ';
  for (var param in params) {
    let value = params[param];
    body += param + '="' + value + '" ';
  }
  body += '/>';

  body = yield signData(body);

  return yield* sendRequest(method, body, 'pkcs7-mime');
};


function signData(data) {
  let resolve, reject;
  let promise = new Promise((res, rej) => {
    resolve = res;
    reject = rej;
  });

  let process = spawn('openssl', `smime -sign -signer ${certPath} -inkey ${keyPath} -nochain -nocerts -outform PEM -nodetach`);
  process.stderr.on('error', function(err) {
    log.error(err);
    reject(err);
  });

  process.stdin.write(data);

  let result;
  process.stdout.setEncoding('utf-8');
  process.stdout.on('data', chunk => result += chunk);

  process.stdout.on('end', () => resolve(result));

  return promise;
}
