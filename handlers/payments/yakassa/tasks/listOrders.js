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

      let date = new Date();
      let params = {
        requestDT:                       date.toJSON(),
        outputFormat:                    'XML',
        shopId:                          yakassaConfig.shopId,
        orderCreatedDatetimeLessOrEqual: date.toJSON()
      };

      let result = yield* mws.request('listOrders', params);

      console.log(result);


    });

  };
};

