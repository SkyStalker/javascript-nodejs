'use strict';

let Letter = require('mailer/models/letter');
let MandrillEvent = require('mailer/models/mandrillEvent');

exports.up = function*() {
  let letters = yield Letter.find({}, {transportResponse: 1});
  for (let i = 0; i < letters.length; i++) {
    let letter = letters[i];
    let transportState = [];
    for (let j = 0; j < letter.transportResponse.length; j++) {
      let response = letter.transportResponse[j];
      let event = yield MandrillEvent.findOne(
        {'payload.Id': response.Id},
        {'payload.event': 1, 'payload.msg.state': 1, 'payload.msg.bounceDescription': 1}
      ).sort({'payload.ts': -1}).limit(1);

      if (!event) {
        /* transportResponse like this:
         { email: 'x@x',
         status: 'invalid',
         Id: '7c2e4c33ee61464c9c82877aecabd56f',
         rejectReason: null }
         */

        // do nothing
      } else {
        transportState[j] = {
          state: event.payload.msg.state
        };
        if (event.payload.msg.bounceDescription) {
          transportState[j].bounceDescription = event.payload.msg.bounceDescription;
        }
      }
    }

    yield letter.persist({
      transportState
    });

  }
};

exports.down = function*() {
  console.log("It's safe to retry");
};
