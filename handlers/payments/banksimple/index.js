const Transaction = require('../models/transaction');
const path = require('path');
const money = require('money');
const sendMail = require('mailer').send;
const config = require('config');

exports.renderForm = require('./renderForm');

// TX gets this status when created
exports.createTransaction = function*(order) {

  var transaction = new Transaction({
    order:  order._id,
    amount: order.convertAmount('RUB'),
    currency: 'RUB',
    status: Transaction.STATUS_PENDING,
    paymentMethod: path.basename(__dirname)
  });

  yield transaction.persist();

  yield sendMail({
    from: 'orders',
    templatePath: path.join(__dirname, 'templates/notificationEmail'),
    site: 'https://' + config.domain.main,
    invoiceUrl: `https://${config.domain.main}/payments/banksimple/${transaction.number}/invoice.docx`,
    order: order,
    profileOrdersUrl: `https://${config.domain.main}${order.user.getProfileUrl()}/orders`,
    to: order.email,
    subject: "Выписан счёт на оплату"
  });

  return transaction;
};

exports.info = {
  title:   "Банковский перевод",
  name:    path.basename(__dirname),
  hasIcon: false,
  cards: ['sberbank'],
  subtitle: 'или другой банк',
  currency: 'RUB'
};
