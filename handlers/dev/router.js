var Router = require('koa-router');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Article = require('tutorial').Article;
var _ = require('lodash');

const slackClient = require('slack').client();

var router = module.exports = new Router();
let slug = 'react-20160812-2130';

router.get('/slack', function*() {
  console.log("HERE 1");
  try {
    let response = yield slackClient.groups.create(slug);
    console.log("HERE 2", response);

  } catch(e) {
    console.log("HERE 3", e.message);

    if (e.message == 'name_taken') {
      // already exists
      let response = yield slackClient.groups.list();
      let existingGroup = response.groups.find(g => g.name == slug);

      console.log("HERE 4", existingGroup);
    } else {
      console.log("HERE 5");
      throw e;
    }

  }
});

router.get('/die', function*() {
  setTimeout(function() {
    throw new Error("die");
  }, 10);
});

var d = new Date() + '';

router.get('/test', function*() {

  this.log.debug("BLABLA");

  this.body = '<a href="/blabla">gbkjgjf</a>';
});

