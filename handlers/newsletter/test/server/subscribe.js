/* globals describe, it, before */

const _ = require('lodash');
const db = require('lib/dataUtil');
const mongoose = require('mongoose');
const path = require('path');
const request = require('supertest');
const fixtures = require(path.join(__dirname, '../fixtures/db'));
const app = require('app');
const assert = require('better-assert');
const Subscription = require('../../models/subscription');
const should = require('should');

describe('Subscribe', function() {

  var server;
  before(function*() {
    server = app.listen();
  });

  beforeEach(function*() {
    yield* db.loadModels(fixtures, {reset: true});
  });

  after(function() {
    server.close();
  });

  describe('registered user', function() {

    describe("when email matches user's email", function() {

      it("when newsletter exists and no subscription exists => creates a new subscription", function*() {

        var user = fixtures.User[0];
        yield function(done) {
          request(server)
            .post('/newsletter/subscribe')
            .set('X-Test-User-Id', user._id)
            .send({
              email: user.email,
              slug:  'js'
            })
            .expect(200, done);
        };

        var subscription = yield Subscription.findOne({
          email: user.email
        }).exec();

        subscription.newsletters.map(String).should.be.eql(
          fixtures.Newsletter.filter(n => n.slug == 'js').map(n => n._id)
        );

      });

      it("when newsletter exists and subscription exists and action add => adds to the list", function*() {
        var user = fixtures.User[1];

        yield function(done) {
          request(server)
            .post('/newsletter/subscribe')
            .set('X-Test-User-Id', user._id)
            .send({
              email: user.email,
              slug:  'js'
            })
            .expect(200, done);
        };


        var subscription = yield Subscription.findOne({
          email: user.email
        }).exec();

        subscription.newsletters.map(String).should.be.eql(
          fixtures.Newsletter
            .filter(function(n) { return n.slug == 'js' || n.slug == 'nodejs'; } )
            .map(n => n._id)
        );
      });

      it("when newsletter exists and subscription exists and multiple slugs given & replace action => replaces subscription newsletters", function*() {
        var user = fixtures.User[1];

        yield function(done) {
          request(server)
            .post('/newsletter/subscribe')
            .set('X-Test-User-Id', user._id)
            .send({
              email: user.email,
              replace: true,
              slug:  ['nodejs', 'advanced']
            })
            .expect(200, done);
        };


        var subscription = yield Subscription.findOne({
          email: user.email
        }).exec();

        subscription.newsletters.map(String).sort().should.be.eql(
          fixtures.Newsletter
            .filter(function(n) { return n.slug == 'nodejs' || n.slug == 'advanced'; } )
            .map(n => n._id)
            .sort()
        );
      });

      it("when newsletter exists and subscription exists and remove => deletes subscription", function*() {
        var user = fixtures.User[1];

        yield function(done) {
          request(server)
            .post('/newsletter/subscribe')
            .set('X-Test-User-Id', user._id)
            .send({
              email: user.email,
              slug:  ['nodejs', 'advanced'],
              remove: true
            })
            .expect(200, done);
        };


        var subscription = yield Subscription.findOne({
          email: user.email
        }).exec();

        should.not.exist(subscription);

      });


    });


  });

});
