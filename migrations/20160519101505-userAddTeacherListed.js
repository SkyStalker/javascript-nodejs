'use strict';

var User = require('users').User;

exports.up = function*() {
  var users = yield User.find();

  for (var i = 0; i < users.length; i++) {
    var user = users[i];
    while (user.profileName.length < 2) user.profileName += '-';

    if (!user.teachesCourses) {
      user.teachesCourses = [];
    }
    if (user.teachesCourses.length && user.isTeacherFrontpage !== false) {
      user.isTeacherFrontpage = true;
    }
    // console.log(user);
    yield user.persist();
  }

};

exports.down = function*() {
  throw new Error("Rollback not implemented");
};
