'use strict';

const Router = require('koa-router');
const mustBeAdmin = require('auth').mustBeAdmin;

const router = module.exports = new Router();

const update = require('./lib/update');
const money = require('money');

// CRONTAB: run me hourly
router.get('/update', mustBeAdmin, function*() {
  yield* update();

  this.body = {
    status: "ok",
    time: new Date()
  };
});

router.get('/rates', function*() {
  this.body = money.rates;
});
