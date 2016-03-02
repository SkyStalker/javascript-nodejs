#!/usr/bin/env node

'use strict';

const config = require('config');

const slackin = require('slackin').default;

slackin({
  token: config.slack.token,
  org: config.slack.org
}).listen(config.slack.port, config.slack.host, function(err){
  if (err) throw err;
  console.log('%s – listening', new Date());
});
