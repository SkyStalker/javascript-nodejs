var fs = require('fs');
var path = require('path');

exports.get = function*() {
  yield this.loadTransaction();

  if (!this.transaction) {
    this.log.debug("No transaction");
    this.throw(404);
  }

  if (this.transaction.paymentMethod != 'invoice') {
    this.log.debug("Only invoice transactions are allowed", this.transaction.toObject());
    this.throw(400);
  }

  var orderModule = require(this.transaction.order.module);
  var invoiceDoc = yield orderModule.getAgreement(this.transaction);

  this.type = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
  this.body = invoiceDoc.getZip().generate({type:"nodebuffer"});

};
