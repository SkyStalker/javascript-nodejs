'use strict';

let mountHandlerMiddleware = require('lib/mountHandlerMiddleware');

exports.init = function(app) {
  app.use(mountHandlerMiddleware('/slack-api', __dirname));
};


