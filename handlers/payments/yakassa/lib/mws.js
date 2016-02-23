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

  log.debug("MWS sendRequest " + method, params);
  let result = yield request({
    method: 'POST',
    headers: {
      'content-type': `application/${type}`
    },
    body: body,
    url: 'https://penelope.yamoney.ru/webservice/mws/api/' + method,
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

  let signedBody = yield signData(body);

  return yield* sendRequest(method, signedBody, 'pkcs7-mime');
};


function signData(data) {
  return new Promise((resolve, reject) => {

    let args = `smime -sign -signer ${certPath} -inkey ${keyPath} -nochain -nocerts -outform PEM -nodetach`;
    let process = spawn('openssl', args.split(' '), {stdio: 'pipe'});
    process.stderr.setEncoding('utf-8');
    process.stderr.on('data', function(err) {
      log.error(err);
      reject(err);
    });
    process.on('error', function(err) {
      log.error(err);
      reject(err);
    });

    process.stdin.end(data);

    let result = '';
    process.stdout.setEncoding('utf-8');
    process.stdout.on('data', function(chunk) {
      result += chunk;
    });

    process.stdout.on('end', function() {
      resolve(result);
    });

  });
}
