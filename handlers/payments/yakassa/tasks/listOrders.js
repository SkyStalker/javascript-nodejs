'use strict';

const co = require('co');
const mws = require('../lib/mws');
const yakassaConfig = require('config').payments.modules.yakassa;
const parseString = require('xml2js').parseString;

/**
 * Mark TX as paid
 * @returns {Function}
 */
module.exports = function() {

  return function() {

    return co(function*() {


      var args = require('yargs')
        .example("gulp payments:yakassa:listOrders --from 2016-01-01 --to 2016-01-31")
        .demand(['from', 'to'])
        .argv;

      let date = new Date();

      let params = {
        requestDT:                          date.toJSON(),
        outputFormat:                       'XML',
        shopId:                             yakassaConfig.shopId,
        orderCreatedDatetimeLessOrEqual:    args.to + 'T23:59:59.999+03:00',
        orderCreatedDatetimeGreaterOrEqual: args.from + 'T00:00:00.000+03:00',
        outputFields:                       'shopId;shopName;articleId;articleName;invoiceId;orderNumber;paymentSystemOrderNumber;customerNumber;createdDatetime;paid;orderSumAmount;orderSumCurrencyPaycash;orderSumBankPaycash;paidSumAmount;paidSumCurrencyPaycash;paidSumBankPaycash;receivedSumAmount;receivedSumCurrencyPaycash;receivedSumBankPaycash;shopSumAmount;shopSumCurrencyPaycash;shopSumBankPaycash;paymentDatetime;paymentAuthorizationTime;payerCode;payerAddress;payeeCode;paymentSystemDatetime;avisoReceivedDatetime;avisoStatus;agentId;uniLabel;avisoRegistryId'
      };

      let result = yield* mws.sendFormRequest('listOrders', params);

      console.log(result);

      let resultObj = yield function(callback) {
        parseString(result, callback);
      };

      let orders = resultObj.listOrdersResponse.order;

      orders = orders.map(order => order.$);
      console.log(orders);

      let sum = 0;
      for (let i = 0; i < orders.length; i++) {
        let order = orders[i];
        if (order.paid != 'true') {
          console.error(order);
          throw new Error("Order not paid?");
        }

        if (order.avisoStatus != '1000') {
          console.log(`Strange avisoStatus ${order.avisoStatus} for order`, order);
        }
        sum += ++order.orderSumAmount;
      }

      console.log("Sum ", sum);
      // console.log(require('util').inspect(orders, false, null));

    });

  };
};

