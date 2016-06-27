'use strict';

var Course = require('../models/course');
var User = require('users').User;
var moment = require('momentWithLocale');

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

  this.locals.reviews = {
    slides: [{
      title: 'Курс JavaScript/DOM/Интерфейсы',
      rating: 3,
      allReviewsHref: './js',
      text: 'Очень доволен данным курсом.Я сам из Республики Беларусь.Практический все, с кем я общался по js, хоть раз да заходили на ваш сайт. Если кто-то решится из РБ пройти этот курс, рекомендую. Понравилось: подача материала, расставленные приоритеты в изучении, только актуальные данные , а не устаревшая информация. Мне не хватило пару занятий по организации проекта на js и про шаблоны. Хотел пройти курс у человека, который Очень доволен данным курсом.Я сам из Республики Беларусь.Практический все, с кем я общался по js, хоть раз да заходили на ваш сайт. Если кто-то решится из РБ пройти этот курс, рекомендую. Понравилось: подача материала, расставленные приоритеты в изучении, только актуальные данные , а не устаревшая информация. Мне не хватило пару занятий по организации проекта на js и про шаблоны. Хотел пройти курс у человека, который',
      author: 'Александр Луговой',
      img: 'http://cryazone.com/uploads/posts/2011-08/quentin-tarantino-photo-by-nicolas-guerin.jpg',
      address: {
        country: 'ru',
        name: 'Россия, Москва'
      }
    }, {
      title: 'Курс JavaScript/DOM/Интерфейсы',
      rating: 5,
      allReviewsHref: './js1',
      text: '222',
      author: 'Александр Луговой',
      img: 'http://cryazone.com/uploads/posts/2011-08/adrien-brody-photo-by-nicolas-guerin.jpg',
      address: {
        country: 'usa',
        name: 'США, Нью-Йорк'
      }
    }, {
      img: 'http://cryazone.com/uploads/posts/2011-08/takeshi-kitano-photo-by-nicolas-guerin.jpg'
    }, {
      title: 'Курс JavaScript/DOM/Интерфейсы Курс JavaScript/DOM/Интерфейсы',
      rating: 5,
      allReviewsHref: './js2',
      text: '222',
      author: 'Александр Луговой Александр Луговой',
      img: 'http://cryazone.com/uploads/posts/2011-08/adrien-brody-photo-by-nicolas-guerin.jpg',
      address: {
        country: 'usa',
        name: 'США, Нью-Йорк'
      }
    }, {
      title: 'Курс JavaScript/DOM/Интерфейсы',
      rating: 5,
      allReviewsHref: './js3',
      text: '222',
      author: 'Александр Луговой',
      img: 'http://cryazone.com/uploads/posts/2011-08/adrien-brody-photo-by-nicolas-guerin.jpg',
      address: {
        country: 'usa',
        name: 'США, Нью-Йорк'
      }
    }]
  };

  this.body = this.render('frontpage');
};
