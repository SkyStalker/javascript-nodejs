'use strict';

require('config');
require('lib/mongoose');

const co = require('co');
const send = require('../lib/send');

co(function*()  {
  while(true) {
    yield* send();

    yield function(callback) {
      setTimeout(callback, 5000);
    };
  }
}).catch(function(err) {
  console.error(err.message, err.stack);
});
