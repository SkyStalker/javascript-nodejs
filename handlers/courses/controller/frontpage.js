'use strict';

const Course = require('../models/course');
const User = require('users').User;
const moment = require('momentWithLocale');
const renderFeedback = require('../lib/renderFeedback');
const countries = require('countries');
const CourseFeedback = require('../models/courseFeedback');
const ObjectId = require('mongoose').Types.ObjectId;

exports.get = function*() {

  var courses = yield Course.find({
    isListed: true
  }).sort({weight: 1});

  this.locals.coursesInfo = [];

  this.locals.feedbacks = [];

  for (var i = 0; i < courses.length; i++) {
    var course = courses[i];
    this.locals.coursesInfo.push({
      url:              course.getUrl(),
      title:            course.title,
      shortDescription: course.shortDescription,
      hasOpenGroups:    yield* course.hasOpenGroups()
    });

    if (course.featuredFeedbacks && course.featuredFeedbacks.length) {
      let feedback = yield CourseFeedback.findById(course.featuredFeedbacks[0]).populate('participant');

      feedback = yield* renderFeedback(feedback, {cut: true});
      this.locals.feedbacks.push(feedback);
    }


  }

  let teachers = yield User.find({
    isTeacherFrontpage: true
  }).sort({created: 1});

  this.locals.teachers = teachers;

  this.locals.formatGroupDate = function(date) {
    return moment(date).format('D MMM YYYY').replace(/[а-я]/, function(letter) {
      return letter.toUpperCase();
    });
  };

  this.locals.countries = countries.all;


  // console.log(JSON.stringify(this.locals.feedbacks));


  // this.locals.feedbacks = [{"course":{"link":"/courses/js","titleShort":"JavaScript/DOM/интерфейсы","title":"Курс JavaScript/DOM/интерфейсы"},"stars":5,"allReviewsHref":"/courses/js/feedbacks","content":"<p>Самый емкий курс из всех, что я проходил. Отличный стиль донесения материала.</p>\n","author":{"userId":"554ba3fc3f2ee62f61a54bf9","link":"/profile/dadubinin","name":"Денис Дубинин"},"photo":"http://i.imgur.com/Gg8bCZZ.jpg","country":"ua","city":"Kyiv"},{"course":{"link":"/courses/js","titleShort":"JavaScript/DOM/интерфейсы","title":"Курс JavaScript/DOM/интерфейсы"},"stars":5,"allReviewsHref":"/courses/js/feedbacks","isCut":true,"content":"<p>Прекрасное начало для желающих овладеть современным Javascript. Курс открывает все грани Javascript разработки от нативного кода до сопутствующих дисциплин: систем сборки, тестирования, JS-фреймворков. Причем, программа курса постоянно обновляется, предлагая студентам самые актуальные на момент обучения знания. Структура занятий позволяет легко усваивать теоретический материал и сразу же применять знания на практике, разбираясь с неизбежно…</p>\n","author":{"userId":"555066b1a7a9d03806fac74c","link":"/profile/alexei-zhuravski","name":"Алексей Журавский"},"photo":"http://i.imgur.com/GkNmrPb.jpg","country":"de","city":"Мюнхен"},{"course":{"link":"/courses/js","titleShort":"JavaScript/DOM/интерфейсы","title":"Курс JavaScript/DOM/интерфейсы"},"stars":5,"allReviewsHref":"/courses/js/feedbacks","isCut":true,"content":"<p>Благодарю Михаила и Илью за организацию достойного курса о языке Javascript.</p>\n<p>Курсом очень доволен. Уверен что потраченные усилия на курс в скором времени окупятся.</p>\n<p>На курсе Михаил Гринько четким и внятным голосом объяснил и показал работу с Javascript на профессиональном уровне, использовал новые технологии и сервисы, за что огромное спасибо! Ответил на все мои вопросы. И сделал записи…</p>\n","author":{"userId":"55bbfaf6bedbd73806df9577","link":"/profile/denis-efremov","name":"Денис Ефремов"},"photo":"http://i.imgur.com/g5vI4Tb.jpg","country":"ru","city":"Новосибирск"},{"course":{"link":"/courses/js","titleShort":"JavaScript/DOM/интерфейсы","title":"Курс JavaScript/DOM/интерфейсы"},"stars":5,"allReviewsHref":"/courses/js/feedbacks","isCut":true,"content":"<p>Михаил показал себя прекрасным преподавателем, который знает о чем он говорит (до мельчайших подробностей). На занятиях никогда не было скучно, занятия проходили динамично, с обсуждениями, ответами на вопросы и конечно же кодом.  От студентов нужно только желание учиться, а Михаил создаст благоприятные условия для этого :)\nКак итог: современные знания (на завершающих этапах писали приложение на es6); примеры кода, который применим в реальной работе…</p>\n","author":{"userId":"56753cffe26c021904c5a346","link":"/profile/andrey-gnilitskiy","name":"Андрей Гнилицкий"},"photo":"http://i.imgur.com/Av9VnDB.jpg","country":"ua","city":"Киев"},{"course":{"link":"/courses/js","titleShort":"JavaScript/DOM/интерфейсы","title":"Курс JavaScript/DOM/интерфейсы"},"stars":5,"allReviewsHref":"/courses/js/feedbacks","isCut":true,"content":"<p>Курс очень понравился! Михаил Гринько – отличный преподаватель. Мне кажется, ни один вопрос ни остался без ответа. Объяснения были доступными, Михаил стремился, чтоб поняли все, повторял по нескольку раз. Очень к месту были и его советы как работающего специалиста, о том на что стоит обратить внимание при написании кода.\nКонечно чтоб был толк от курса – требуется много работать самостоятельно: читать учебник, смотреть видео уроки…</p>\n","author":{"userId":"569b9a224a2fc72204ae7ffe","link":"/profile/igor-mitropan","name":"Игорь Митропан"},"photo":"http://i.imgur.com/CKoOeKC.jpg","country":"ua","city":"Харьков"}];

  this.body = this.render('frontpage');
};
