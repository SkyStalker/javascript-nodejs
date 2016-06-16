'use strict';

exports.get = function*() {
  this.body = this.render('teacher/instructions');
};

