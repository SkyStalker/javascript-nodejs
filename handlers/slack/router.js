'use strict';

const Router = require('koa-router');

const syncGroup = require('./controllers/syncGroup');
const syncUsers = require('./controllers/syncUsers');

const router = module.exports = new Router();

const mustBeAdmin = require('auth').mustBeAdmin;

router.get('/sync-users', mustBeAdmin, syncUsers.get);
router.get('/sync-group/:groupId', mustBeAdmin, syncGroup.get);
