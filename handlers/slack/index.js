'use strict';

let mountHandlerMiddleware = require('lib/mountHandlerMiddleware');

exports.init = function(app) {
  app.use(mountHandlerMiddleware('/slack', __dirname));
};

exports.client = require('./lib/client');
exports.BotService = require('./lib/botService');
exports.SlackUser = require('./models/slackUser');
exports.SlackChannel = require('./models/slackChannel');
exports.SlackChannelMember = require('./models/slackChannelMember');


