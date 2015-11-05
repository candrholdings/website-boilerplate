(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["ReduxPromiseMiddleware"] = factory();
	else
		root["ReduxPromiseMiddleware"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports['default'] = promiseMiddleware;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _isPromise = __webpack_require__(1);

	var _isPromise2 = _interopRequireDefault(_isPromise);

	var defaultTypes = ['PENDING', 'FULFILLED', 'REJECTED'];

	function promiseMiddleware() {
	  var config = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	  var promiseTypeSuffixes = config.promiseTypeSuffixes || defaultTypes;
	  return function () {
	    return function (next) {
	      return function (action) {
	        if (!_isPromise2['default'](action.payload)) {
	          return next(action);
	        }

	        var type = action.type;
	        var payload = action.payload;
	        var meta = action.meta;
	        var promise = payload.promise;
	        var data = payload.data;

	        var _ref = (meta || {}).promiseTypeSuffixes || promiseTypeSuffixes;

	        var PENDING = _ref[0];
	        var FULFILLED = _ref[1];
	        var REJECTED = _ref[2];

	        /**
	         * Dispatch the first async handler. This tells the
	         * reducer that an async action has been dispatched.
	         */
	        next(_extends({
	          type: type + '_' + PENDING
	        }, data && { payload: data }, meta && { meta: meta }));

	        /**
	         * Return either the fulfilled action object or the rejected
	         * action object.
	         */
	        return promise.then(function (resolved) {
	          return next(_extends({ // eslint-disable-line no-shadow
	            type: type + '_' + FULFILLED
	          }, resolved.meta || resolved.payload ? resolved : _extends({}, resolved && { payload: resolved }, meta && { meta: meta })));
	        }, function (error) {
	          return next(_extends({
	            type: type + '_' + REJECTED,
	            payload: error,
	            error: true
	          }, meta && { meta: meta }));
	        });
	      };
	    };
	  };
	}

	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
	exports['default'] = isPromise;

	function isPromise(value) {
	  if (value !== null && typeof value === 'object') {
	    return value.promise && typeof value.promise.then === 'function';
	  }
	}

	module.exports = exports['default'];

/***/ }
/******/ ])
});
;