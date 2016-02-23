var path = require('path');
var MandrillEvent = require('../models/mandrillEvent');
var Letter = require('../models/letter');
var config = require('config');
var crypto = require('crypto');
var capitalizeKeys = require('lib/capitalizeKeys');

exports.post = function*() {

  var signature = this.get('X-Mandrill-Signature');

  if (generateMandrillSignature(this.request.body) != signature) {
    this.throw(401, "Wrong signature");
  }

  var mandrillEvents;
  try {
     mandrillEvents = JSON.parse(this.request.body.mandrill_events);
  } catch(e) {}

  if (!Array.isArray(mandrillEvents)) {
    this.throw(400);
  }

  mandrillEvents = capitalizeKeys(mandrillEvents);

  for (let i = 0; i < mandrillEvents.length; i++) {
    let payload = mandrillEvents[i];
    yield MandrillEvent.create({payload});

    if (payload.Id) {
      let letter = yield Letter.findOne({
        'transportResponse.Id': payload.Id
      }, {transportResponse:1, transportState: 1});
      if (!letter) {
        // no such letter, maybe letter sent from home server?
        this.log.error("Webhook event: no letter for Id", payload);
        continue;
      }

      // write new state into transportState[j] where j is the number of the email in to/transportResponse
      for (let j = 0; j < letter.transportResponse.length; j++) {
        let response = letter.transportResponse[j];
        if (response.Id == payload.Id) {
          letter.transportState[j] = {
            state: payload.msg.state
          };
          if (payload.msg.bounceDescription) {
            letter.transportState[j].bounceDescription = payload.msg.bounceDescription;
          }
          break;
        }
      }
      yield letter.persist();

    }
  }

  this.body = '';
};


function generateMandrillSignature(body) {
  var signedData = config.mailer.mandrill.webhookUrl;

  var keys = Object.keys(body);

  keys.sort();

  for (var i = 0; i < keys.length; i++) {
    signedData += keys[i] + body[keys[i]];
  }

  return crypto.createHmac('sha1', config.mailer.mandrill.webhookKey).update(signedData, 'utf8', 'binary').digest('base64');
}


