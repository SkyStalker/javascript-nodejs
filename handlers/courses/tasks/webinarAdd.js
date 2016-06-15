'use strict';

const path = require('path');
const config = require('config');
const co = require('co');
const yargs = require('yargs');

const CourseGroup = require('../models/courseGroup');
const request = require('request-promise');

module.exports = function() {

  return function() {

    const argv = require('yargs')
      .usage('gulp courses:webinar:add --group js-1')
      .describe('group', 'Group slug')
      .demand(['group'])
      .argv;

    return co(function*() {
      var group = yield CourseGroup.findOne({
        slug: argv.group
      }).populate('course teacher');

      if (!group) {
        throw new Error("No group:" + argv.group);
      }


      let gotowebinar = group.teacher.gotowebinar;
      if (!gotowebinar) {
        throw new Error("No gotowebinar config for user:" + group.teacher.profileName);
      }

      if (!group.webinarId) {
        console.log("Creating the webinar");
        let end = new Date(group.dateStart);
        end.setMinutes(end.getMinutes() + group.duration);

        let options = {
          url:     `https://api.citrixonline.com/G2W/rest/organizers/${gotowebinar.organizer_key}/webinars`,
          json:    true,
          headers: {
            'Authorization': gotowebinar.access_token,
            'content-type':  'application/json; charset=utf-8'
          },
          body:    {
            subject:  group.title,
            times:    [
              {
                startTime: group.dateStart.toJSON().replace('.000', ''),
                endTime:   end.toJSON().replace('.000', '')
              }
            ],
            timeZone: "Europe/Moscow"
          }
        };

        let response = yield request.post(options);

        console.log("Response ", response);

        group.webinarKey = response.webinarKey;

        let webinars = yield request({
          url:     `https://api.citrixonline.com/G2W/rest/organizers/${gotowebinar.organizer_key}/webinars/`,
          json:    true,
          headers: {
            'Authorization': gotowebinar.access_token
          }
        });

        let newWebinar = webinars.find(w => w.webinarKey == group.webinarKey);
        group.webinarId = newWebinar.webinarID;

        console.log("Created", newWebinar);
        yield group.persist();

        console.log("Adding the end date");

        // take last date, increase by 1 months and add to the webinar
        let extraEndDate = new Date(group.dateEnd);
        extraEndDate.setMonth(extraEndDate.getMonth() + 1);
        let extraEndDateTo = new Date(+extraEndDate + group.duration * 60 * 1000);

        let responsePut = yield request({
          method: 'PUT',
          url:     `https://api.citrixonline.com/G2W/rest/organizers/${gotowebinar.organizer_key}/webinars/${group.webinarKey}`,
          json:    true,
          headers: {
            'Authorization': gotowebinar.access_token,
            'content-type':  'application/json; charset=utf-8'
          },
          body:    {
            times:    [
              {
                startTime: group.dateStart.toJSON().replace('.000', ''),
                endTime:   end.toJSON().replace('.000', '')
              },
              {
                startTime: extraEndDate.toJSON().replace('.000', ''),
                endTime:   extraEndDateTo.toJSON().replace('.000', '')
              }
            ],
            timeZone: "Europe/Moscow"
          }
        });

        console.log("Added end date", responsePut);

      }


    });

  };

};
