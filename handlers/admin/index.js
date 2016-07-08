
var mountHandlerMiddleware = require('lib/mountHandlerMiddleware');

exports.init = function(app) {

  app.use(mountHandlerMiddleware('/admin', __dirname));
};

exports.getUserSidebar = require('./lib/getUserSidebar');
