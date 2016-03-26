const payments = require('payments');

var paymentMethods = {};

var methodsEnabled = ['yakassa', 'webmoney', 'yandexmoney', 'payanyway', 'paypal', 'interkassa'];

methodsEnabled.forEach(function(key) {
  paymentMethods[key] = payments.methods[key].info;
});

module.exports = paymentMethods;
