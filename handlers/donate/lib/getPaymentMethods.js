'use strict';

const payments = require('payments');

const methodsEnabled = ['yakassa', 'interkassa', 'webmoney', /*'yandexmoney',*/ 'banksimple', 'banksimpleua', 'payanyway', 'paypal'];

module.exports = function*() {

  var paymentMethods = {};

  methodsEnabled.forEach(function(key) {
    paymentMethods[key] = payments.methods[key].info;
  });

  /*
   if (this.user && this.user.hasRole('admin')) {
   paymentMethods.yakassa = payments.methods.yakassa.info;
   }*/

  return paymentMethods;
};
