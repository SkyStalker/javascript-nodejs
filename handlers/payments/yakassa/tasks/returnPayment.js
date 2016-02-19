'use strict';

const co = require('co');
const mws = require('../lib/mws');
const yakassaConfig = require('config').payments.modules.yakassa;
const currencyRate = require('currencyRate');
var Transaction = require('../models/transaction');
var Order = require('../models/order');
const ObjectId = require('mongoose').Types.ObjectId;
/**
 * Mark TX as paid
 * @returns {Function}
 */
module.exports = function() {

  var args = require('yargs')
    .example('gulp payments:yakassa:returnPayment --number 12345678 --amount 1234')
    .demand(['number'])
    .argv;

  return function() {

    return co(function*() {
      yield* currencyRate.boot();

      var transaction = yield Transaction.findOne({number: args.number}).populate('order').exec();

      if (!transaction) {
        throw new Error("No transaction with number " + args.number);
      }

      gutil.log("Order number:" + transaction.order.number);

      if (transaction.status != Transaction.STATUS_SUCCESS) {
        throw new Error("TX is not successful");
      }

      if (transaction.paymentMethod != 'yakassa') {
        throw new Error("TX paymentMethod isn't yakassa");
      }


      yield transaction.log('payments:transaction:yakassa:refund');


      let date = new Date();
      let params = {
        clientOrderId: +date,
        requestDT:     date.toJSON(),
        invoiceId:     transaction.paymentDetails.invoiceId,
        shopId:        yakassaConfig.shopId,
        amount:        args.amount || transaction.amount,
        currency:      transaction.currency,
        cause:         'возврат оплаты'
      };

      let result = yield* mws.sendPkcs7Request('returnPayment', params);

      console.log(result);


    });

  };
};

