'use strict';

const _ = require('lodash');
const db = require('lib/dataUtil');
const mongoose = require('mongoose');
const path = require('path');
const fixtures = require(path.join(__dirname, './fixtures/db'));
const app = require('app');
const Subscription = require('../models/subscription');
const NewsletterRelease = require('../models/newsletterRelease');
const Letter = require('mailer').Letter;
const should = require('should');
const sendReleaseOne = require('../lib/sendReleaseOne');

describe('Send NewsletterRelease', function() {

  beforeEach(function*() {
    yield* db.loadModels(fixtures, {reset: true});
  });

  context('send', function() {

    it('sends', function*() {
      let release = yield NewsletterRelease.findOne({})
        .populate('user to.courseGroup to.newsletter to.mailList');

      yield* sendReleaseOne(release, 'to@mail.ru');
      //(yield Letter.find()).length.should.eql(0);
    });

  });



});
