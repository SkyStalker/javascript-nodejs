
let WebClient = require('@slack/client').WebClient;
let config = require('config');

let options = {};
if (process.env.NODE_ENV == 'development') {
  options.logLevel = 'debug';
}

module.exports = new WebClient(config.slack.token, options);

