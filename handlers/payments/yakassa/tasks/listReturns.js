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
        .example("gulp payments:yakassa:listReturns --from 2016-01-01 --to 2016-01-31")
        .demand(['from', 'to'])
        .argv;

      let date = new Date();
      let params = {
        requestDT:    date.toJSON(),
        outputFormat: 'XML',
        shopId:       yakassaConfig.shopId,
        till:         new Date(args.to).toJSON(),
        from:         new Date(args.from).toJSON()
      };

      let result = yield* mws.sendFormRequest('listReturns', params);

      let resultObj = yield function(callback) {
        parseString(result, callback);
      };

      console.log(result);

      let returns = resultObj.listReturnsResponse.$.returnPayment;

      console.log(returns);
/*
      let sum = 0;
      for (let i = 0; i < orders.length; i++) {
        let order = orders[i];
        if (order.paid != 'true') {
          console.error(order);
          throw new Error("Order not paid?");
        }
        sum += ++order.orderSumAmount;
      }

      console.log("Sum ", sum);
      // console.log(require('util').inspect(orders, false, null));
*/
    });

  };
};

