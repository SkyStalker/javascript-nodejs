const clsNamespace = require("continuation-local-storage").getNamespace("app");

const assert = require('assert');

exports.init = function(app) {

  app.use(function*(next) {

    yield new Promise(clsNamespace.bind(function (resolve) {
      resolve();
    }));

    // some modules like accessLogger await for this.res.on('finish'/'close'),
    // so let's bind these emitters to keep CLS context in handlers
    clsNamespace.bindEmitter(this.req);
    clsNamespace.bindEmitter(this.res);

    try {
      clsNamespace.set('context', this);
      yield* next;
    } finally {

      if (clsNamespace.get('context').requestId != this.requestId) {
        console.error("CLS: wrong context", clsNamespace.get('context').requestId, "should be", this.requestId);
      }

      // important: all request-related events must be finished within request
      // after request finished, the context is lost (kept by bindEmitter if any)
    }
  });

};

