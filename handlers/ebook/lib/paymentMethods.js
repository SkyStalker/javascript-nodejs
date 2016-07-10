const payments = require('payments');

var paymentMethods = {};

var methodsEnabled = ['yakassa', 'interkassa', 'webmoney'/*, 'yandexmoney',*/ 'payanyway', 'paypal'];

methodsEnabled.forEach(function(key) {
  paymentMethods[key] = payments.methods[key].info;
});

module.exports = paymentMethods;
