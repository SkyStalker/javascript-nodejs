var Router = require('koa-router');

var syncGroup = require('./controllers/syncGroup');
var syncUsers = require('./controllers/syncUsers');

var router = module.exports = new Router();

var mustBeAdmin = require('auth').mustBeAdmin;

router.get('/sync-users', mustBeAdmin, syncUsers.get);
router.get('/sync-group/:groupId', mustBeAdmin, syncGroup.get);
