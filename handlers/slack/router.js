'use strict';

const Router = require('koa-router');

const syncGroup = require('./controllers/syncGroup');
const syncUsers = require('./controllers/syncUsers');

const router = module.exports = new Router();

function* canSync(next) {

  if (this.isAdmin || this.user && this.user.hasRole('teacher')) {
    yield* next;
  } else {
    this.throw(403);
  }

}

// router.get('/sync-users', canSync, syncUsers.get);
// router.get('/sync-group/:groupId?', canSync, syncGroup.get);

