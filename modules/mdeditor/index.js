
const t = require('i18n');

const LANG = require('config').lang;

t.requirePhrase('mdeditor', require('./locales/' + LANG + '.yml'));

const jade = require('lib/serverJade');
const path = require('path');

exports.render = function(locals) {
  return jade.renderFile(path.join(__dirname, 'templates/editor.jade'), locals);
};
