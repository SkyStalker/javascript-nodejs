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
        till:         args.to + 'T23:59:59.999+03:00',
        from:         args.from + 'T00:00:00.000+03:00'
      };

      let result = yield* mws.sendFormRequest('listReturns', params);

      //let result = '<?xml version="1.0" encoding="UTF-8" ?><listReturnsResponse status="0" error="0" processedDT="2016-04-01T15:21:43.379+03:00" techMessage="Успех"><returnPayment returnId="324772819" status="0" error="0" invoiceId="2000369081340" shopId="113215" amount="25272.00" currency="643" articleAmount="25272.00" articleCurrency="643" createdDT="2016-02-09T15:05:14.622+03:00" cause="ВозвратыПоИм" sender="1cuser" processedDT="2016-02-09T15:05:14.879+03:00" orderNumber="700928545" clientOrderId="57817"></returnPayment><returnPayment returnId="335652212" status="0" error="0" invoiceId="2000367423725" shopId="113215" amount="26000.00" currency="643" articleAmount="26000.00" articleCurrency="643" createdDT="2016-02-25T14:27:02.819+03:00" cause="ВозвратыПоИм" sender="1cuser" processedDT="2016-02-25T14:27:02.756+03:00" orderNumber="770537198" clientOrderId="58576"></returnPayment></listReturnsResponse>';

      let resultObj = yield function(callback) {
        parseString(result, callback);
      };

      console.log(resultObj);

      let returns = resultObj.listReturnsResponse.returnPayment;

      returns = returns.map(ret => ret.$);
      console.log(returns);

      let sum = 0;
      for (let i = 0; i < returns.length; i++) {
        let ret = returns[i];
        if (ret.status != '0') {
          console.error(ret);
          throw new Error("Return not done?");
        }
        sum += ++ret.amount;
      }

      console.log("Sum ", sum);
      // console.log(require('util').inspect(orders, false, null));

    });

  };
};

