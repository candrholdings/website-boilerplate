(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define('ReduxThunk', ['exports', 'module'], factory);
  } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
    factory(exports, module);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, mod);
    global.ReduxThunk = mod.exports;
  }
})(this, function (exports, module) {
  'use strict';

  module.exports = thunkMiddleware;

  function thunkMiddleware(_ref) {
    var dispatch = _ref.dispatch;
    var getState = _ref.getState;

    return function (next) {
      return function (action) {
        return typeof action === 'function' ? action(dispatch, getState) : next(action);
      };
    };
  }
});

