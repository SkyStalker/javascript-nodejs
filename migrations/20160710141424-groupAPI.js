'use strict';

var fs = require('fs');

var CourseGroup = require('courses').CourseGroup;

exports.up = function*() {

  var groups = yield CourseGroup.find().populate('course');
  for (var i = 0; i < groups.length; i++) {
    var group = groups[i];
    yield group.persist();
  }

};

exports.down = function*() {
  throw new Error("Rollback not implemented");
};
