
Gulp -- замечательная система сборки и задач, но при всём обилии информации в интернете о ней -- это, как правило, либо самые основы, либо "готовые решения", чтобы адаптировать которые нужно понимание, как что работает.

В этом скринкасте я постараюсь восполнить этот "недостающий фрагмент". Не просто "вот такой код работает", а "почему и как он работает", и как его получить. Это сделает использование готовых решений легче и приятнее. И позволит создавать свои.
  
```warn header="Node.JS"
Для работы с Gulp необходимо знание Node.JS.

Хотя бы выпуски 1-9 (основы), 13 (события), 23-25 (потоки), а желательно -- и остальные выпуски первой части [скринкаста по Node.JS](/screencast/nodejs).
```

```smart header="Gulp 4"
В скринкасте используется новый Gulp версии 4. 

Текущей версией является Gulp 3, и большинство руководств в интернете посвящены именно ему.

Однако в новой версии многое сделано более правильно, она обратно совместима и стабильна. 
Поэтому мы будем использовать её. 

В репозитории Gulp есть ветка 4.0, в которой есть и сам код и документация и даже рецепты, уже адаптированные под Gulp 4. Так что на новой версии Gulp вы будете точно не один.
```

## Выпуски скринкаста

  
<div class="lessons-list lessons-list_screencast">
<ol class="lessons-list__lessons">
<li class="lessons-list__lesson" data-mnemo="01-what-is-gulp"><a href="#" data-video-id="uPk6lQoTThE">Что такое Gulp? Сравнение с Grunt и Webpack</a></li>
<li class="lessons-list__lesson" data-mnemo="02-basics"><a href="#" data-video-id="xptUdO3GuG8">Установка и запуск задач</a></li>
<li class="lessons-list__lesson" data-mnemo="03-vinyl"><a href="#" data-video-id="NBdKplKl_3Q">Потоки Vinyl-FS</a></li>
<li class="lessons-list__lesson" data-mnemo="04-stylus"><a href="#" data-video-id="_BFWG82mMkw">Начальная сборка стилей</a></li>
<li class="lessons-list__lesson" data-mnemo="05-watch"><a href="#" data-video-id="jocvHauHcA4">Инкрементальная сборка, watch</a></li>
<li class="lessons-list__lesson" data-mnemo="06-watch-perf"><a href="#" data-video-id="uYZPNrT-e-8">Инкрементальность и производительность</a></li>
<li class="lessons-list__lesson" data-mnemo="07-browsersync"><a href="#" data-video-id="oiMJNIG-yvg">Автоперезагрузка браузера: browser-sync</a></li>
<li class="lessons-list__lesson" data-mnemo="08-errors"><a href="#" data-video-id="otkXzef2wQY">Обработка ошибок</a></li>
<li class="lessons-list__lesson" data-mnemo="09-plugins-through2"><a href="#" data-video-id="Ijg9I1CY7Ok">Создание плагинов при помощи through2</a></li>
<li class="lessons-list__lesson" data-mnemo="10-plugins-eslint"><a href="#" data-video-id="pjdrg6n5puU">Более сложный поток: eslint, gulp-if, stream-combiner2</a></li>
<li class="lessons-list__lesson" data-mnemo="11-plugins-streams"><a href="#" data-video-id="5aJB4vJlHBs">Понимаем ли мы потоки Node.JS?</a></li>
<li class="lessons-list__lesson" data-mnemo="12-ogranize"><a href="#" data-video-id="Qc6go3cNuRk">Организация gulpfile'а</a></li>
<li class="lessons-list__lesson" data-mnemo="13-more-styles"><a href="#" data-video-id="VqYAitDKbpo">Стили + ресурсы, спрайты, продакшн</a></li>
<li class="lessons-list__lesson" data-mnemo="14-webpack"><a href="#" data-video-id="ohWOWqskHWU">Интеграция Gulp и Webpack</a></li>
</ol>
</div>
 
Код примеров -- в репозитории <https://github.com/iliakan/gulp-screencast>.

Иногда одному выпуску соответствует несколько примеров кода, в этом случае у них общий префикс с номером выпуска.
 


