// Client-side module to cut a square from a picture

const Modal = require('client/head/modal');

const modalTemplate = require('./templates/modal.jade');
const clientRender = require('client/clientRender');

const PhotoSelector = require('./photoSelector');
require('blueimp-canvas-to-blob/js/canvas-to-blob');

module.exports = function(img, onSuccess) {
  var modal = new Modal();
  modal.setContent(clientRender(modalTemplate));

  var canvas = modal.elem.querySelector('.photo-cut__canvas');
  canvas.focus();
  var selectionCanvasElems = modal.elem.querySelectorAll('.photo-cut__selection-canvas');

  // copy size from CSS to scale correctly
  for (var i = 0; i < selectionCanvasElems.length; i++) {
    selectionCanvasElems[i].width = selectionCanvasElems[i].offsetWidth;
    selectionCanvasElems[i].height = selectionCanvasElems[i].offsetHeight;
  }

  var photoCut = new PhotoSelector(canvas, {maxImageSize: 300});
  photoCut.setImage(img);

  canvas.addEventListener("selection", function(event) {
    var selection = photoCut.getCanvasSelection();

    for (var i = 0; i < selectionCanvasElems.length; i++) {
      var elem = selectionCanvasElems[i];
      elem.getContext('2d').clearRect(0, 0, elem.width, elem.height);

      if (selection) {
        elem.getContext('2d').drawImage(
          selection.source,
          selection.x, selection.y, selection.size, selection.size, // from
          0, 0, elem.width, elem.height // to
        );
      }
    }
  });


  photoCut.setSelection({
    x:    canvas.width * 0.1,
    size: Math.min(photoCut.width, photoCut.height) * 0.8,
    y:    canvas.height * 0.1
  });

  modal.elem.querySelector('[data-action="rotate-right"]').addEventListener('click', () => photoCut.rotate(1));

  modal.elem.querySelector('[data-form]').addEventListener('submit', event => {
    event.preventDefault();
    save();
  });

  canvas.addEventListener('submit', event => {
    save();
  });

  function save() {
    var selection = photoCut.getCanvasSelection();

    if (!selection) return;

    var finalCanvas = document.createElement('canvas');

    // resize canvas to the actual selection part of the image,
    // to make as large as possible resolution/size avatar
    finalCanvas.width = selection.size;
    finalCanvas.height = selection.size;

    var context = finalCanvas.getContext('2d');

    // draw the selected piece on the canvas to make Blob of it
    context.drawImage(
      selection.source, selection.x, selection.y, selection.size, selection.size,
      0, 0, selection.size, selection.size
    );

    // draw white behind current content to turn transparency into white color
    //set to draw behind current content
    context.globalCompositeOperation = "destination-over";

    //set background color to white
    context.fillStyle = "rgb(255,255,255)";

    //draw background / rect on entire canvas
    context.fillRect(0,0,finalCanvas.width,finalCanvas.height);

    modal.remove();

    finalCanvas.toBlob(
      function(blob) {
        onSuccess(blob);
      },
      // somewhy doesn't keep transparency so I draw white bg above
      img.src.startsWith("data:image/png") ? 'image/png' : 'image/jpeg'
    );


  }

};
