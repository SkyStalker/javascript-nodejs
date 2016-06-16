<!--
 - У юзера преподавателя:
   - roles: ["teacher"]
   - profileTabsEnabled: ["courses"]
   - teacherEmail: my@email.com - в отличие от email (скрытый email аккаунта) и publicEmail (публичный в профиле), этот email для коммуникации по курсам, публикуется для курсантов.
   - isTeacherFrontpage: true - для преподавателя, который давно ведёт курсы
   - gotowebinar - данные gotowebinar-организатора
 - Для получения данных gotowebinar, от имени юзера зайти на:
   - https://api.citrixonline.com/oauth/authorize?client_id=5Ven6FoiKXuDfNWYroB95v2xWYJqlFfT
   - с полученным кодом (заменить его в конце строки ниже):
     curl -X POST -H "Accept:application/json" -H "Content-Type: application/x-www-form-urlencoded" "https://api.citrixonline.com/oauth/access_token" -d 'grant_type=authorization_code&client_id=5Ven6FoiKXuDfNWYroB95v2xWYJqlFfT&code=КОД'
   - JSON-результат в свойство юзера gotowebinar   
 - В коллекции courseTeacher должна быть запись о курсе, который он ведёт
 - На https://global.gotowebinar.com, go to Settings > Recording tab and select "Save recordings online (beta)".  
-->

## Открытие записи

1. Создание группы
  1. Зайдите на [эту страницу](/courses/teacher/group-create).
  2. Введите информацию о группе, всё проверьте.
2. Настройка вебинара
  1. Зайдите в gotowebinar. Вы увидите в списке новый вебинар, раскройте его и выберите Edit.
  2. Ниже в пункте Share your webinar > Registration Settings нажмите Edit.
  3. В пункте Approval поставьте [*] Manually Approve
  4. В пункте Upon Registration поставьте [*] Direct registrants to your own confirmation page, и в поле ввода ниже: "https://learn.javascript.ru/course-webinar-registered".
  5. Внизу нажмите Save
3. Рассылка по группе 
  1. Когда вы откроете все группы, обратитесь к Илье Кантору для рассылки информации о ней.

## За 7-10 дней до курса

Нужно разослать всем участникам приветственное письмо и требования к предварительной настройке окружения, 
к подготовке к курсу, учебные материалы, если есть. 

Сделать это можно на странице [рассылок](/newsletter/admin/newsletter-releases), обратитесь к Илье Кантору за примерами писем.

## За день-два до курса

Возможно, к курсу присоединились ещё участники, нужно дослать приветственное письмо. Сделать это можно на той же странице, что и выше.

Перед досылкой можно внести в письмо изменения, если за неделю что-то изменилось.

При этом письмо получат только те, кто его до этого не получал. 

## В начале курса

Первое занятие курса обычно – собрание. Также на нём можно добавить участников в Slack.

- Каждый должен сам зарегистрироваться на <http://slack.javascript.ru> с тем email, с котором он оформлен как участник курса.
- Затем ведущий запускает скрипт регистрации в slack (со страницы курса), который приглашает участников в закрытую группу.

В связи с ограничениями Slack API автоматизировать это невозможно.

# TODO: сделать получение инвайта в панели юзера
# TODO: список юзеров для аппрува на странице преподавателя

