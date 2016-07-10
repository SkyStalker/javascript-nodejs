'use strict';

const config = require('config');
const request = require('request-promise');
const CourseGroup = require('../../models/courseGroup');
const CourseParticipants = require('../../models/courseParticipant');

exports.get = function*() {

  let group = yield CourseGroup.findOne({
    apiKey: this.query.key
  });

  if (!group) {
    this.throw(404);
  }

  let participants = yield CourseParticipants.find({
    group: group._id,
    isActive: true
  });


  this.set('Access-Control-Allow-Origin', this.get('Origin'));
  this.set('Access-Control-Allow-Credentials', 'true');
  this.set('Access-Control-Allow-Methods', 'POST,GET,DELETE,PATCH');
  this.set('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type');
  this.set('Access-Control-Max-Age', 86400);

  this.body = participants.map(p => ({
    firstName: p.firstName,
    surname: p.surname,
    photo: p.photo,
    country: p.country
  }));


};

