'use strict';

const NewsletterTemplate = require('../../models/newsletterTemplate');
const NewsletterRelease = require('../../models/newsletterRelease');
const Newsletter = require('../../models/newsletter');
const MailList = require('../../models/mailList');
const Letter = require('mailer').Letter;
const CourseGroup = require('courses').CourseGroup;
const ObjectId = require('mongoose').Types.ObjectId;
const sendNewsletterReleaseOne = require('../../lib/sendNewsletterReleaseOne');
const moment = require('momentWithLocale');

function* loadById(id) {
  if (!ObjectId.isValid(id)) {
    this.throw(400);
  }

  let newsletterRelease = yield NewsletterRelease.findById(id)
    .populate('to.courseGroup to.newsletter to.mailList');

  if (!newsletterRelease) {
    this.throw(404);
  }
  if (!this.isAdmin && !newsletterRelease.user.equals(this.user._id)) {
    this.throw(403);
  }

  return newsletterRelease;
}

function *getFailedReasons(newsletterRelease) {
  let letters = yield Letter.find({
    labelId: newsletterRelease._id,
    $or:     [{
      'transportResponse.status': {
        $ne: 'sent'
      }
    }, {
      'transportState.state': {
        $ne: 'sent'
      }
    }]
  }, {transportResponse: 1, transportState: 1});

  let results = {};

  for (let i = 0; i < letters.length; i++) {
    let letter = letters[i];
    Object.assign(results, letter.getFailureReasons());
  }

  return results;

}

function* getToVariants() {
  let variants = [];
  if (this.isAdmin) {
    let newsletters = yield Newsletter.find().sort({weight: 1});
    for (let i = 0; i < newsletters.length; i++) {
      let newsletter = newsletters[i];
      variants.push({
        key:   'newsletter:' + newsletter.id,
        value: newsletter.title
      });
    }
    let mailLists = yield MailList.find().sort({modified: -1});
    for (let i = 0; i < mailLists.length; i++) {
      let mailList = mailLists[i];
      variants.push({
        key:   'mailList:' + mailList.id,
        value: mailList.title
      });
    }
  }

  let dateGreater = new Date();
  dateGreater.setDate(dateGreater.getDate() - 30);
  let groups = yield CourseGroup.find({
    teacher: this.user._id,
    dateEnd: {
      $gt: dateGreater // finished not more than 1 month ago
    }
  }).sort({dateStart: -1});

  for (let i = 0; i < groups.length; i++) {
    let group = groups[i];

    variants.push({
      key:   'courseGroup:' + group.id,
      value: group.title
    });
  }

  return variants;
}

exports.getList = function*() {

  this.locals.title = "Рассылки";

  let query = this.isAdmin ? {} : {
    user: this.user
  };

  this.locals.newsletterReleases = yield NewsletterRelease.find(query)
    .sort({created: -1})
    .populate('to.courseGroup to.newsletter to.mailList');

  this.body = this.render('admin/newsletterReleases');

};

exports.edit = function*() {

  let newsletterRelease;

  if (this.params.id) {
    newsletterRelease = yield* loadById.call(this, this.params.id);
  } else {
    newsletterRelease = new NewsletterRelease({});
  }

  this.locals.title = this.params.id ? "Редактировать рассылку" : "Создать рассылку";

  yield* renderForm.call(this, newsletterRelease);

};

function* renderForm(newsletterRelease) {

  this.locals.failedReasons = yield* getFailedReasons(newsletterRelease);

  this.locals.toVariants = yield* getToVariants.call(this);

  this.locals.templates = yield NewsletterTemplate.find().sort({created: -1});

  this.locals.letterSentCount = yield Letter.count({
    labelId: newsletterRelease._id,
    sent:    true
  });

  this.locals.form = {
    id:              this.params.id ? this.params.id : '',
    title:           newsletterRelease.title,
    content:         newsletterRelease.content,
    to:              newsletterRelease.to,
    sendScheduledAt: newsletterRelease.sendScheduledAt,
    sendFinished:    newsletterRelease.sendFinished,
    sendingPid:      newsletterRelease.sendingPid
  };

  this.body = this.render('admin/newsletterRelease');
}


exports.post = function*() {

  let newsletterRelease;

  if (this.request.body.id) {
    newsletterRelease = yield* loadById.call(this, this.request.body.id);
  } else {
    newsletterRelease = new NewsletterRelease({
      user: this.user
    });
  }

  // process delete early before reading (maybe invalid, no one cares) data
  if (this.request.body.action == 'delete') {
    let letterExists = yield Letter.findOne({
      labelId: newsletterRelease._id
    });

    if (letterExists) {
      this.addFlashMessage('error', 'Есть отосланные письма этой рассылки, удаление невозможно.');
      this.redirect('/newsletter/admin/newsletter-releases/edit/' + newsletterRelease.id);
    } else {
      yield newsletterRelease.remove();
      this.addFlashMessage('success', 'Рассылка удалена.');
      this.redirect('/newsletter/admin/newsletter-releases');
    }
    return;
  }

  // can have skips (to-1 to-2 to-3 then removed to-2)
  // toOptions= [ 'newsletter:5523d48d77d8f3225c0fb74e', , 'newsletter:5523d48d77d8f3225c0fb74d']
  // toExclude= [   , true,  ]
  let toOptions = [];
  let toExclude = [];
  for (let key in this.request.body) {
    if (key.startsWith('to-exclude-')) {
      toExclude[key.slice('to-exclude-'.length)] = true;
    } else if (key.startsWith('to-') && this.request.body[key]) {
      toOptions[key.slice('to-'.length)] = this.request.body[key];
    }
  }

  let to = [];
  for (let i = 0; i < toOptions.length; i++) {
    if (!toOptions[i]) continue;
    let optionParts = toOptions[i].split(':');
    let type = optionParts[0];
    let id = optionParts[1];
    let toItem = {
      [type]:  id,
      exclude: toExclude[i] || false
    };
    to.push(toItem);
  }

  newsletterRelease.content = this.request.body.content;
  newsletterRelease.title = this.request.body.title;
  newsletterRelease.to = to;

  // save the data, then apply actions
  try {
    yield newsletterRelease.persist();
  } catch (e) {
    if (e.name != 'ValidationError') throw e;

    var errors = this.locals.errors = {};
    for (var key in e.errors) {
      errors[key] = e.errors[key].message;
    }

    this.locals.title = "Редактировать шаблон";

    yield* renderForm.call(this, newsletterRelease);
    return;
  }


  switch (this.request.body.action) {
  case 'save':
    this.addFlashMessage('success', 'Рассылка сохранена.');
    // already saved
    break;

  case 'delete':
    // delete is handled above
    throw new Error("Must never reach here");

  case 'template':
    yield NewsletterTemplate.create({
      user:    this.user,
      title:   newsletterRelease.title,
      content: newsletterRelease.content
    });
    this.addFlashMessage('success', 'Шаблон создан.');
    break;

  case 'send':
    yield newsletterRelease.persist({
      sendScheduledAt: new Date()
    });

    this.addFlashMessage('success', 'Рассылка будет отослана в ближайшее время.');

    break;

  case 'schedule':
    newsletterRelease.sendScheduledAt = moment(this.request.body.scheduleAt).toDate();

    yield newsletterRelease.persist();

    this.addFlashMessage('success',
      `Рассылка запланирована в ${moment(newsletterRelease.sendScheduledAt).format('YYYY-MM-DD HH:mm Z')}.`
    );

    break;

  case 'cancelSend':
    newsletterRelease.sendScheduledAt = undefined;
    yield newsletterRelease.persist();

    this.addFlashMessage('success', 'Рассылка отменена.');
    break;

  case 'sendOne':
    let sendOneTo = this.request.body.sendOneTo.toLowerCase();
    yield NewsletterRelease.populate(newsletterRelease, 'user to.courseGroup to.newsletter to.mailList');
    yield* sendNewsletterReleaseOne(newsletterRelease, sendOneTo, {noLabel: true});
    this.addFlashMessage('success', `Письмо отослано ${sendOneTo}.`);

    break;

  }

  this.redirect('/newsletter/admin/newsletter-releases/edit/' + newsletterRelease.id);


};
