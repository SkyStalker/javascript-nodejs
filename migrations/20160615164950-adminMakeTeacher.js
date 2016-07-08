'use strict';

var User = require('users').User;

exports.up = function*() {
  let users = yield User.find();

  for (var i = 0; i < users.length; i++) {
    let user = users[i];

    if (user.hasRole('admin')) {
      user.roles.addToSet('teacher');
      yield user.persist();
    }
  }

};

exports.down = function*() {
  throw new Error("Rollback not implemented");
};
