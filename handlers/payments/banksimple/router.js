var Router = require('koa-router');

var router = module.exports = new Router();

var invoice = require('./controller/invoice');

router.get('/invoice-:transactionNumber(\\d+).docx', invoice.get);

router.get('/:transactionNumber(\\d+)/invoice.docx', invoice.get);


