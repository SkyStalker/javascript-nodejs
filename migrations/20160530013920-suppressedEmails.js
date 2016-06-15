'use strict';

const SuppressedEmail = require('mailer').SuppressedEmail;
const SQSNotification = require('mailer/models/sqsNotification');


exports.up = function*() {
  yield SuppressedEmail.remove({});

  let notifications = yield SQSNotification.find({'message.bounce.bounceType': 'Permanent'}, {'message.bounce.bouncedRecipients': 1});
  for (let i = 0; i < notifications.length; i++) {
    let notification = notifications[i];
    let recipients = notification.message.bounce.bouncedRecipients;

    for (let j = 0; j < recipients.length; j++) {
      let email = recipients[j].emailAddress;
      let processed = yield SuppressedEmail.findOne({email: email});
      if (!processed) {
        console.log(email);
        yield SuppressedEmail.create({
          email,
          reasonSqs: notification._id
        })
      }
    }
  }

};

exports.down = function*() {
  throw new Error("Rollback not implemented");
};
