const xhr = require('client/xhr');
const moment = require('momentWithLocale');

module.exports = class NewsletterSendUi {

  constructor(options) {
    this.elem = options.elem;

    this.elem.querySelector('form[data-newsletter-action="send"]').onsubmit = function() {
      let value = this.sendScheduledAt.value.trim();
      if (!value) {
        return confirm('Отправить сейчас?');
      }

      let momentValue = moment(value);
      if (!momentValue.isValid()) {
        alert('Некорректная дата:' + value);
        return false;
      }

      return confirm('Запланировать в ' + momentValue.format('YYYY-MM-DD HH:mm Z') + ' ?');
    };

  }

};
