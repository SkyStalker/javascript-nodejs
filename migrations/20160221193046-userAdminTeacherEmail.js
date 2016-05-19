'use strict';

var User = require('users').User;

// isAdmin -> admin role
// teacherEmail from publicEmail
exports.up = function*() {
  var users = yield User.find();

  for (var i = 0; i < users.length; i++) {
    var user = users[i];
    if (user.profileName.length < 2) user.profileName += '-';
    
    if (user.isAdmin) {
      user.roles.addToSet('admin');
      user.isAdmin = undefined;
    }

    if (!user.teachesCourses) {
      user.teachesCourses = [];
    }

    if (user.teachesCourses.length) {
      user.teacherEmail = user.publicEmail;
    }
    yield user.persist();
  }

};

exports.down = function*() {
  throw new Error("Rollback not implemented");
};
