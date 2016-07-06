'use strict';

const Course = require('../models/course');
const User = require('users').User;
const moment = require('momentWithLocale');
const renderFeedback = require('../lib/renderFeedback');
const countries = require('countries');
const CourseFeedback = require('../models/courseFeedback');

exports.get = function*() {

  var courses = yield Course.find({
    isListed: true
  }).sort({weight: 1});

  this.locals.coursesInfo = [];
  for (var i = 0; i < courses.length; i++) {
    var course = courses[i];
    this.locals.coursesInfo.push({
      url: course.getUrl(),
      title: course.title,
      shortDescription: course.shortDescription,
      hasOpenGroups: yield* course.hasOpenGroups()
    });
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

  let feedbacks = yield CourseFeedback.find({
    number: {
      $in: [84, 78,16, 9, 7]
    }
  }).populate('participant');

  this.locals.countries = countries.all;

  /*
  let feedbacksRendered = [];

  for (var i = 0; i < feedbacks.length; i++) {
    var feedback = feedbacks[i];

    feedbacksRendered.push(yield* renderFeedback(feedback));
  }


  this.locals.feedbacks = feedbacksRendered.map(f => ({
    course: f.course,
    stars: f.stars,
    allReviewsHref: f.course.link + '/feedbacks',
    content: f.content,
    author: f.author,
    photo: f.photo,
    country: f.country,
    city: f.city
  }));

  console.log(JSON.stringify(this.locals.feedbacks));
*/

  this.locals.feedbacks = [{"course":{"link":"/courses/js","titleShort":"JavaScript/DOM/интерфейсы","title":"Курс JavaScript/DOM/интерфейсы"},"stars":5,"allReviewsHref":"/courses/js/feedbacks","content":"<p>Самый емкий курс из всех, что я проходил. Отличный стиль донесения материала.</p>\n","author":{"userId":"554ba3fc3f2ee62f61a54bf9","link":"/profile/dadubinin","name":"Денис Дубинин"},"photo":"http://i.imgur.com/Gg8bCZZ.jpg","country":"ua","city":"Kyiv"},{"course":{"link":"/courses/js","titleShort":"JavaScript/DOM/интерфейсы","title":"Курс JavaScript/DOM/интерфейсы"},"stars":5,"allReviewsHref":"/courses/js/feedbacks","content":"<p>Прекрасное начало для желающих овладеть современным Javascript. Курс открывает все грани Javascript разработки от нативного кода до сопутствующих дисциплин: систем сборки, тестирования, JS-фреймворков. Причем, программа курса постоянно обновляется, предлагая студентам самые актуальные на момент обучения знания. Структура занятий позволяет легко усваивать теоретический материал и сразу же применять знания на практике, разбираясь с неизбежно возникающими вопросами при помощи преподавателя. Илья не только высококлассный программист с богатым опытом, которым он щедро делится, но и талантливый учитель, способный просто преподать сложные вещи. На мой взгляд, это лучший русскоязычный онлайн курс Javascript на сегодня.</p>\n","author":{"userId":"555066b1a7a9d03806fac74c","link":"/profile/alexei-zhuravski","name":"Алексей Журавский"},"photo":"http://i.imgur.com/GkNmrPb.jpg","country":"de","city":"Мюнхен"},{"course":{"link":"/courses/js","titleShort":"JavaScript/DOM/интерфейсы","title":"Курс JavaScript/DOM/интерфейсы"},"stars":5,"allReviewsHref":"/courses/js/feedbacks","content":"<p>Благодарю Михаила и Илью за организацию достойного курса о языке Javascript.</p>\n<p>Курсом очень доволен. Уверен что потраченные усилия на курс в скором времени окупятся.</p>\n<p>На курсе Михаил Гринько четким и внятным голосом объяснил и показал работу с Javascript на профессиональном уровне, использовал новые технологии и сервисы, за что огромное спасибо! Ответил на все мои вопросы. И сделал записи своих уроков, которые я еще обязательно буду просматривать и изучать в будущем.</p>\n<p>Большое Спасибо за курс!</p>\n","author":{"userId":"55bbfaf6bedbd73806df9577","link":"/profile/denis-efremov","name":"Денис Ефремов"},"photo":"http://i.imgur.com/g5vI4Tb.jpg","country":"ru","city":"Новосибирск"},{"course":{"link":"/courses/js","titleShort":"JavaScript/DOM/интерфейсы","title":"Курс JavaScript/DOM/интерфейсы"},"stars":5,"allReviewsHref":"/courses/js/feedbacks","content":"<p>Михаил показал себя прекрасным преподавателем, который знает о чем он говорит (до мельчайших подробностей). На занятиях никогда не было скучно, занятия проходили динамично, с обсуждениями, ответами на вопросы и конечно же кодом.  От студентов нужно только желание учиться, а Михаил создаст благоприятные условия для этого :)\nКак итог: современные знания (на завершающих этапах писали приложение на es6); примеры кода, который применим в реальной работе; ну и товарищеские наставления на последнем занятии.\nВсе на высоте, однозначно стоит потраченыx денег и времени!</p>\n","author":{"userId":"56753cffe26c021904c5a346","link":"/profile/andrey-gnilitskiy","name":"Андрей Гнилицкий"},"photo":"http://i.imgur.com/Av9VnDB.jpg","country":"ua","city":"Киев"},{"course":{"link":"/courses/js","titleShort":"JavaScript/DOM/интерфейсы","title":"Курс JavaScript/DOM/интерфейсы"},"stars":5,"allReviewsHref":"/courses/js/feedbacks","content":"<p>Курс очень понравился! Михаил Гринько – отличный преподаватель. Мне кажется, ни один вопрос ни остался без ответа. Объяснения были доступными, Михаил стремился, чтоб поняли все, повторял по нескольку раз. Очень к месту были и его советы как работающего специалиста, о том на что стоит обратить внимание при написании кода.\nКонечно чтоб был толк от курса – требуется много работать самостоятельно: читать учебник, смотреть видео уроки, решать задачи, а также делать более обширные дополнительные задания.\nИз небольших замечаний: было бы неплохо обновить видео уроки с учетом ухода в небытие IE8 и новых браузерных возможностей.\nА в целом, я считаю курс однозначно стоит вложенных денег и времени.</p>\n","author":{"userId":"569b9a224a2fc72204ae7ffe","link":"/profile/igor-mitropan","name":"Игорь Митропан"},"photo":"http://i.imgur.com/CKoOeKC.jpg","country":"ua","city":"Харьков"}];

  this.body = this.render('frontpage');
};
