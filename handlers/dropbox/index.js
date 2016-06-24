
var mountHandlerMiddleware = require('lib/mountHandlerMiddleware');

exports.init = function(app) {
  app.use(mountHandlerMiddleware('/dropbox', __dirname));
};

exports.DropboxAccount = require('./models/dropboxAccount');

exports.getOauthRequestUrl = require('./lib/getOauthRequestUrl');
exports.shareFolder = require('./lib/shareFolder');

