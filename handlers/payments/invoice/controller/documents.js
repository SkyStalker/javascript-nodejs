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

  this.nocache();

  this.set({
    'Content-Type': 'application/octet-stream',
    'Content-Disposition': 'attachment; filename=documents-' + this.transaction.number + '.zip',
    'X-Accel-Redirect': '/_download/transactionDocuments/' + this.transaction.number + '.zip'
  });

  this.body = '';

};
