var Router = require('koa-router');

var router = module.exports = new Router();

var invoice = require('./controller/invoice');
var agreement = require('./controller/agreement');
var documents = require('./controller/documents');

router.get('/invoice-:transactionNumber(\\d+).docx', invoice.get);
router.get('/agreement-:transactionNumber(\\d+).docx', agreement.get);
router.get('/documents-:transactionNumber(\\d+).zip', documents.get);

// old links
router.get('/:transactionNumber(\\d+)/invoice.docx', invoice.get);
router.get('/:transactionNumber(\\d+)/agreement.docx', agreement.get);
router.get('/:transactionNumber(\\d+)/documents.zip', documents.get);
