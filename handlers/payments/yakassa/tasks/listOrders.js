'use strict';

const co = require('co');
const mws = require('../lib/mws');
const yakassaConfig = require('config').payments.modules.yakassa;

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
        orderCreatedDatetimeLessOrEqual:    new Date(args.from).toJSON(),
        orderCreatedDatetimeGreaterOrEqual: new Date(args.to).toJSON()
      };

      let result = yield* mws.sendFormRequest('listOrders', params);

      console.log(result);


    });

  };
};

