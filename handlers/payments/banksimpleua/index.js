const Transaction = require('../models/transaction');
const path = require('path');
const config = require('config');
const money = require('money');
const sendMail = require('mailer').send;

exports.renderForm = require('./renderForm');

// TX gets this status when created
exports.createTransaction = function*(order) {

  var transaction = new Transaction({
    order:  order._id,
    currency: 'UAH',
    amount: order.convertAmount('UAH'),
    status: Transaction.STATUS_PENDING,
    paymentMethod: path.basename(__dirname)
  });

  yield transaction.persist();

  yield sendMail({
    from: 'orders',
    templatePath: path.join(__dirname, 'templates/notificationEmail'),
    site: 'https://' + config.domain.main,
    invoiceUrl: `https://${config.domain.main}/payments/banksimpleua/invoice-${transaction.number}.docx`,
    order: order,
    profileOrdersUrl: `https://${config.domain.main}${order.user.getProfileUrl()}/orders`,
    to: order.email,
    subject: "Выписан счёт на оплату"
  });

  return transaction;
};

exports.info = {
  title:   "Банковский перевод в Украине (в гривнах)",
  name:    path.basename(__dirname),
  hasIcon: false,
  currency: 'UAH'
};
