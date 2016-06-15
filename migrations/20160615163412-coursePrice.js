'use strict';

var Course = require('courses').Course;
exports.up = function*() {

  yield Course.update({slug:'js'}, {price: 26000});
  yield Course.update({slug:'nodejs'}, {price: 17000});
  yield Course.update({slug:'angular'}, {price: 17000});
  yield Course.update({slug:'react'}, {price: 17000});
  yield Course.update({slug:'typescript'}, {price: 6500});

};

exports.down = function*() {
  throw new Error("Rollback not implemented");
};
