const xhr = require('client/xhr');
const clientRender = require('client/clientRender');

const toItemEmpty = require('../../templates/admin/toItemEmpty.jade');

module.exports = class NewsletterReleaseForm {

  constructor(options) {
    let form = options.elem;
    form.querySelector('[data-newsletter-template-select]').onchange = function() {

      if (!confirm('Текущий заголовок и содержимое будут заменены, продолжать?')) {
        this.value = '';
        return;
      }

      var request = xhr({
        method: 'GET',
        url:    '/newsletter/admin/newsletter-templates/rest/' + this.value
      });

      request.addEventListener('success', (event) => {
        this.value = '';

        form.elements.title.value = event.result.title;
        form.elements.content.editor.setValue(event.result.content);
      });
    };


    form.addEventListener('click', function(e) {
      if (!e.target.hasAttribute('data-newsletter-to-delete')) {
        return;
      }
      e.preventDefault();
      e.target.closest('.newsletter-release-form-select').remove();
    });

    form.addEventListener('click', function(e) {
      if (!e.target.hasAttribute('data-newsletter-to-add')) {
        return;
      }
      e.preventDefault();

      let selectBlocks = form.querySelectorAll('.newsletter-release-form-select');
      let insertPoint = selectBlocks[selectBlocks.length - 1];


      let toVariants = [];
      let selectExampleOptions = form.querySelector('.newsletter-release-form-select select').options;
      for (let i = 0; i < selectExampleOptions.length; i++) {
        let option = selectExampleOptions[i];
        toVariants.push({key: option.value, value: option.innerHTML});
      }

      insertPoint.insertAdjacentHTML('afterEnd', clientRender(toItemEmpty, {
           toVariants,
        i: selectBlocks.length
      }));
    });
  }
};
