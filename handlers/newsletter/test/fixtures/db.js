const oid = require('oid');
require('users');
require('newsletter');
require('courses');
require('mailer');

exports.Letter = [];

exports.User = [
  {
    "_id":           oid('user-iliakan'),
    roles:           ["teacher"],
    teacherEmail:    "iliakan-teacher@javascript.ru",
    "created":       new Date(2014, 0, 1),
    "displayName":   "Ilya Kantor",
    "email":         "iliakan@gmail.com",
    "profileName":   "iliakan",
    "password":      "1234",
    "verifiedEmail": true
  },
  {
    "_id":           oid('user-student'),
    "created":       new Date(2015, 0, 1),
    "displayName":   "Student",
    "email":         "student@javascript.ru",
    "profileName":   "student",
    "password":      "1234",
    "verifiedEmail": true
  }
];

exports.Subscription = [
  {
    email:       'nodejs-and-js@javascript.ru',
    accessKey:   '1',
    newsletters: [oid('newsletter-nodejs'), oid('newsletter-js')]
  },
  {
    email:       'nodejs@javascript.ru',
    accessKey:   '2',
    newsletters: [oid('newsletter-nodejs')]
  },
  {
    email:       'student@javascript.ru',
    accessKey:   '3',
    newsletters: [oid('newsletter-nodejs')]
  }
];

exports.Newsletter = [
  {
    "_id":  oid('newsletter-nodejs'),
    title:  "Курс и скринкасты по Node.JS",
    slug:   "nodejs",
    period: "несколько раз в год",
    weight: 1
  },
  {
    "_id":  oid('newsletter-js'),
    title:  "Курс JavaScript/DOM/интерфейсы",
    period: "раз в 1.5-2 месяца",
    weight: 0,
    slug:   "js"
  },
  {
    "_id":  oid('newsletter-advanced'),
    title:  "Продвинутые курсы, мастер-классы и конференции по JavaScript",
    period: "редко",
    weight: 2,
    slug:   "advanced"
  }
];


exports.Course = [
  {
    "_id":            oid('course-js'),
    slug:             "js",
    videoKeyTag:      "js",
    title:            "Курс JavaScript/DOM/интерфейсы",
    titleShort:       "JavaScript/DOM/интерфейсы",
    shortDescription: "Desc",
    isListed:         true,
    price:            1000,
    weight:           1
  }
];

exports.CourseGroup = [
  {
    _id:               oid('coursegroup-js'),
    course:            oid('course-js'),
    dateStart:         new Date(2016, 0, 1),
    dateEnd:           new Date(2016, 10, 10),
    timeStart:         '19:30',
    timeEnd:           '21:00',
    timeDesc:          "пн/чт 19:30 - 21:00 GMT+3",
    slug:              'js-1',
    price:             1,
    participantsLimit: 30,
    webinarId:         '123',
    isListed:          true,
    isOpenForSignup:   false,
    title:             "Курс JavaScript/DOM/интерфейсы (01.01)",
    teacher:           [oid('user-iliakan')]
  },
  {
    _id:               oid('coursegroup-nodejs-1'),
    course:            oid('course-nodejs'),
    dateStart:         new Date(2016, 6, 22),
    dateEnd:           new Date(2016, 7, 10),
    timeStart:         '19:30',
    timeEnd:           '21:00',
    timeDesc:          "пн/ср/сб 19:30 - 21:00 GMT+3",
    slug:              'nodejs-20160722',
    price:             1,
    webinarId:         '456',
    participantsLimit: 30,
    isListed:          true,
    isOpenForSignup:   true,
    title:             "Курс по Node.JS (22.07)",
    teacher:           [oid('user-iliakan')]
  },
  {
    _id:               oid('coursegroup-nodejs-2'),
    course:            oid('course-nodejs'),
    dateStart:         new Date(2016, 6, 1),
    dateEnd:           new Date(2016, 11, 10),
    timeStart:         '21:30',
    timeEnd:           '23:00',
    timeDesc:          "пн/чт 21:30 - 23:00 GMT+3",
    slug:              "nodejs-01",
    price:             1,
    webinarId:         '789',
    participantsLimit: 30,
    isListed:          true,
    isOpenForSignup:   false,
    title:             "Курс по Node.JS",
    teacher:           [oid('user-iliakan')]
  }
];

exports.CourseParticipant = [{
  group:     oid('coursegroup-js'),
  firstName: "Firstname",
  surname:   "Surname",
  country:   'ru',
  user:      oid('user-student')
}];


exports.NewsletterRelease = [{
  _id:     oid('newsletter-release-js'),
  user:    oid('user-iliakan'),
  title:   'Release js',
  content: 'Content js',
  to:      [{
    newsletter: oid('newsletter-js')
  }]
}, {
  _id:     oid('newsletter-release-nodejs'),
  user:    oid('user-iliakan'),
  title:   'Release nodejs',
  content: 'Content nodejs',
  to:      [{
    newsletter: oid('newsletter-nodejs')
  }]
}, {
  _id:     oid('newsletter-release-nodejs-except-js'),
  user:    oid('user-iliakan'),
  title:   'Release nodejs no js',
  content: 'Content nodejs no js',
  to:      [{
    newsletter: oid('newsletter-nodejs')
  }, {
    newsletter: oid('newsletter-js'),
    exclude:    true
  }]
}, {
  _id:     oid('newsletter-release-coursegroup-js'),
  user:    oid('user-iliakan'),
  title:   'Release js',
  content: 'Content js',
  to:      [{
    courseGroup: oid('coursegroup-js')
  }]
}];

