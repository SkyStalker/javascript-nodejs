var User = require('users').User;

exports.up = function*() {
  var users = yield User.find();

  for (var i = 0; i < users.length; i++) {
    var user = users[i];
    user.roles = [];
    yield user.persist();
  }

};

exports.down = function*() {
  throw new Error("Not implemented");
};
