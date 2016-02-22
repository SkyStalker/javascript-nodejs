'use strict';

var Router = require('koa-router');
var mustBeAuthenticated = require('auth').mustBeAuthenticated;

var action = require('./controllers/action');
var frontpage = require('./controllers/frontpage');
//var subscriptions = require('./controllers/subscriptions');
var subscribe = require('./controllers/subscribe');

var router = module.exports = new Router();
router.param('userById', require('users').routeUserById);

router.post("/subscribe", subscribe.post);
router.get("/", frontpage.get);
//router.post("/", frontpage.post);
router.get("/action/:accessKey", action.get);

router.get("/subscriptions/:accessKey", frontpage.get);

// for profile
router.get('/profile/:userById', mustBeAuthenticated, require('./controllers/subscriptionsByUser').get);


router.get("/admin/newsletter-templates", canMakeLetters, require('./controllers/admin/newsletterTemplates').getList);
router.post("/admin/newsletter-templates", canMakeLetters, require('./controllers/admin/newsletterTemplates').post);

router.get("/admin/newsletter-templates/add", canMakeLetters, require('./controllers/admin/newsletterTemplates').edit);
router.get("/admin/newsletter-templates/edit/:id", canMakeLetters, require('./controllers/admin/newsletterTemplates').edit);
router.get("/admin/newsletter-templates/rest/:id", canMakeLetters, require('./controllers/admin/newsletterTemplates').get);

router.post("/admin/newsletter-releases", canMakeLetters, require('./controllers/admin/newsletterReleases').post);
router.get('/admin/newsletter-releases', canMakeLetters, require('./controllers/admin/newsletterReleases').getList);
router.get('/admin/newsletter-releases/add', canMakeLetters, require('./controllers/admin/newsletterReleases').edit);
router.get('/admin/newsletter-releases/edit/:id', canMakeLetters, require('./controllers/admin/newsletterReleases').edit);

//router.get('/admin/newsletter-send/:id', canMakeLetters, require('./controllers/admin/newsletterSend').get);
//router.post('/admin/newsletter-send/:id?', canMakeLetters, require('./controllers/admin/newsletterSend').post);

function* canMakeLetters(next) {
  let hasAccess = this.isAdmin || (this.user && this.user.hasRole('teacher'));
  if (!hasAccess) {
    this.throw(403);
  }
  yield* next;
}
