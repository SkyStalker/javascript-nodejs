'use strict';

require('config');
require('lib/mongoose');

const co = require('co');
const send = require('../lib/send');

co(function*()  {
  yield* send();
}).catch(console.error);
