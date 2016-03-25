'use strict';

var fs = require('fs');
var config = require('config');
var exec = require('child_process').exec;
var fse = require('fs-extra');
var Order = require('payments').Order;
var Transaction = require('payments').Transaction;
var User = require('users').User;
var CourseParticipant = require('../../models/courseParticipant');
var CourseInvite = require('../../models/courseInvite');
var CourseGroup = require('../../models/courseGroup');
var busboy = require('co-busboy');
var path = require('path');
const sendMail = require('mailer').send;

function* loadTransactionAdmin() {

  yield* this.loadTransaction();

  if (!this.order) {
    this.throw(404, {
      info: 'Нет такого заказа.'
    });
  }

  if (!this.order.data.group) {
    this.throw(404, {
      info: 'Нет такого заказа на курс'
    });
  }

}

exports.post = function*() {

  yield* loadTransactionAdmin.call(this);

  let parts = busboy(this);
  let part;

  let transactionDirName = String(this.transaction.number);
  let transactionDirPath = config.downloadRoot + '/transactionDocuments/' + transactionDirName;
  fse.ensureDirSync(transactionDirPath);

  let hasDocuments;
  while (part = yield parts) {
    if (part.length) {
      this.request.body[part[0]] = part[1];
    } else {
      if (!part.filename) {
        part.resume();
        continue;
      } // empty part

      hasDocuments = true;
      let filePath = transactionDirPath + '/' + part.filename.replace(/[^-.\wа-яё]/gi, '');
      this.log.debug("Creating file " + filePath);
      let stream = part.pipe(fs.createWriteStream(filePath));
      part.on('error', function() {
        try {
          stream.destroy();
          fse.removeSync(filePath);
        } catch(e) {}
      });
    }
  }

  try {
    fse.removeSync(path.dirname(transactionDirPath) + '/' + transactionDirName + '.zip');
  } catch (e) {
    /* remove if exists */
  }

  if (hasDocuments) {
    this.log.debug(`Zipping ${transactionDirName} in ${path.dirname(transactionDirPath)}`);
    let output = yield function(callback) {
      exec(`zip -r ${transactionDirName} ${transactionDirName}`, {cwd: path.dirname(transactionDirPath)}, callback);
    };
    this.log.debug(output);
    fse.removeSync(transactionDirPath);
  }

  let transaction = this.transaction;

  transaction.paymentDetails.hasDocuments = hasDocuments;
  transaction.markModified('paymentDetails');

  // console.log(this.transaction.toObject());
  yield transaction.persist();

  if (hasDocuments && this.request.body.notify) {
    yield sendMail({
      from: 'orders',
      templatePath: path.join(__dirname, '../../templates/admin/documentsEmail'),
      site: 'https://' + config.domain.main,
      documentsUrl: `https://${config.domain.main}/payments/invoice/documents-${transaction.number}.zip`,
      order: this.order,
      profileOrdersUrl: `https://${config.domain.main}${this.order.user.getProfileUrl()}/orders`,
      to: this.order.email,
      subject: "Администратор загрузил документы для вас"
    });

  }

  this.log.debug("Updated tx " + this.transaction.number);

  this.redirect('/courses/admin/orders/' + this.order.number);

};

