'use strict';

const getUserSidebar = require('../lib/getUserSidebar');

exports.get = function*() {

  console.log("HERE!!!!");
  this.locals.sidebar = yield* getUserSidebar(this.user);

  this.body = this.render('frontpage');
};

