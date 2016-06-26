'use strict';

const config = require('config');
require('lib/mongoose'); // the right mongoose for a standalone run

const co = require('co');
const AWS = require('aws');
const crypto = require('crypto');
const Letter = require('../models/letter');
const SQSNotification = require('../models/sqsNotification');
const SuppressedEmail = require('../models/suppressedEmail');
const sqs = new AWS.SQS();
const log = require('log')();

module.exports = class StatusService {


  *start() {
    this.state = 'running';

    while (this.state != 'stopping') {
      yield* this.update();
    }
  }

  stop() {
    this.state = 'stopping';
  }


  *update() {

    let response = yield function(callback) {
      sqs.receiveMessage({
        QueueUrl:        config.mailer.sqs.queueUrl,
        WaitTimeSeconds: 20
      }, callback);
    };

    log.debug(response);
    if (!response.Messages) return;

    for (let i = 0; i < response.Messages.length; i++) {
      let message = response.Messages[i];

      let hash = crypto.createHash('md5').update(message.Body).digest('hex');

      if (hash != message.MD5OfBody) {
        throw new Error(`Bad Body ${i} hash ${hash} for ` + JSON.stringify(response));
      }

      let messageInfo = JSON.parse(JSON.parse(message.Body).Message);

      log.debug(messageInfo);
      let notification = yield SQSNotification.create({
        payload: message,
        message: messageInfo
      });

      let letter = yield Letter.findOne({messageId: messageInfo.mail.messageId});

      if (!letter) {
        log.error("No letter with messageId", message);
        continue;
      }

      yield letter.persist({
        lastSqsNotification: messageInfo
      });

      if (message.bounce && message.bounce.bounceType == 'Permanent') {
        let recipients = message.bounce.bouncedRecipients;

        for (let i = 0; i < recipients.length; i++) {
          let email = recipients[i].emailAddress;
          let processed = yield SuppressedEmail.findOne({email: email});
          if (!processed) {
            yield SuppressedEmail.create({
              email,
              notification: notification._id
            })
          }
        }

      }

      let receiptHandle = message.ReceiptHandle;

      yield function(callback) {
        sqs.deleteMessage({
          QueueUrl:      config.mailer.sqs.queueUrl,
          ReceiptHandle: receiptHandle
        }, callback);
      };

    }

  }
};
