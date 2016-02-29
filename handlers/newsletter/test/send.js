'use strict';

const oid = require('oid');
const db = require('lib/dataUtil');
const mongoose = require('mongoose');
const path = require('path');
const fixtures = require(path.join(__dirname, './fixtures/db'));
const app = require('app');
const SenderService = require('../lib/senderService');
const Subscription = require('../models/subscription');
const NewsletterRelease = require('../models/newsletterRelease');
const Letter = require('mailer').Letter;
const should = require('should');


describe('Send NewsletterRelease', function() {

  beforeEach(function*() {
    yield* db.loadModels(fixtures, {reset: true});
  });

  context('when no scheduled releases', function() {
    it('does nothing', function*() {
      yield* new SenderService({once: true}).start();
      (yield Letter.find({})).length.should.eql(0);
    });
  });


  context('send', function() {

    it('filters except newsleters', function*() {
      let nl = yield NewsletterRelease.findById(oid('newsletter-release-nodejs-except-js'));

      yield nl.persist({
        sendScheduledAt: new Date()
      });

      yield* new SenderService({once: true}).start();
      (yield Letter.find()).length.should.eql(2);
    });

    it('sends a newsletter', function*() {
      let nl = yield NewsletterRelease.findById(oid('newsletter-release-nodejs'));

      yield nl.persist({
        sendScheduledAt: new Date()
      });

      yield* new SenderService({once: true}).start();
      (yield Letter.find()).length.should.eql(3);
    });

    it('sends one more letter when new subscription appears', function*() {
      let nl = yield NewsletterRelease.findById(oid('newsletter-release-js'));

      yield nl.persist({
        sendScheduledAt: new Date()
      });

      yield* new SenderService({once: true}).start();
      (yield Letter.find()).length.should.eql(1);

      // no more to send, same count
      yield* new SenderService({once: true}).start();
      (yield Letter.find()).length.should.eql(1);

      yield Subscription.create({
        email: 'new@javascript.ru',
        accessKey:   '' + Math.random(),
        newsletters: [oid('newsletter-js')]
      });

      // not rescheduled yet, same count
      yield* new SenderService({once: true}).start();
      (yield Letter.find()).length.should.eql(1);

      yield nl.persist({
        sendScheduledAt: new Date()
      });

      // now send more
      yield* new SenderService({once: true}).start();
      (yield Letter.find()).length.should.eql(2);

    });

    it('sends for course group participants', function*() {
      let nl = yield NewsletterRelease.findById(oid('newsletter-release-coursegroup-js'));

      yield nl.persist({
        sendScheduledAt: new Date()
      });

      yield* new SenderService({once: true}).start();
      (yield Letter.find()).length.should.eql(1);
    });

  });



});
