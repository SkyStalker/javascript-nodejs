'use strict';

let syncUsers = require('../lib/syncUsers');

exports.get = function*() {

  yield* syncUsers();
  this.body = 'OK ' + new Date();
};

