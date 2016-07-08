'use strict';

let User = require('users').User;

exports.up = function*() {

  let users = yield User.find({
    email: {
      $regex: /migration.\d+.deleted/
    }
  });

  for (let i = 0; i < users.length; i++) {
    let user = users[i];
    console.log(user);
    yield* user.softDelete();
  }
};

exports.down = function*() {
  throw new Error("Rollback not implemented");
};
