'use strict';

const Router = require('koa-router');
const mustBeAuthenticated = require('auth').mustBeAuthenticated;

const router = module.exports = new Router();

router.get('/', mustBeAuthenticated, function*(next) {

  if (!this.user.hasRole('teacher') && !this.user.hasRole('admin')) {
    this.throw(403);
  }

  yield* next;
}, require('./controller/frontpage').get);

