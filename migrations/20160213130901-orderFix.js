'use strict';

const Order = require('payments').Order;
const Transaction = require('payments').Transaction;

exports.up = function*() {

  let txs = yield Transaction.find({status: Transaction.STATUS_SUCCESS}).sort({created: 1});

  for (var i = 0; i < txs.length; i++) {
    var tx = txs[i];
    let order = yield Order.findById(tx.order);
    if (order.status == Order.STATUS_PENDING || order.status == Order.STATUS_PAID) {
      console.log("will call order onPaid module=" + order.module);
      console.log("PROCESS ORDER", order);
      yield* order.onPaid();
    }
  }

};

exports.down = function*() {
  throw new Error("Rollback not implemented");
};
