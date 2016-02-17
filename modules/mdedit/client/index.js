'use strict';

require('./styles');
const MdEdit = require('./mdedit');


function init() {
  let editorElems = document.querySelectorAll('.mdeditor');

  for (var i = 0; i < editorElems.length; i++) {
    var editorElem = editorElems[i];
    new MdEdit({
      elem: editorElem
    });
  }
}

exports.init = init;


