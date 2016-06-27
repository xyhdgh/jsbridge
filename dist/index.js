/******/ (function(modules) { // webpackBootstrap
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
/***/ function(module, exports) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	/**
	 * Creator: yeliex
	 * Project: rkjsbridge
	 * Description:
	 */

	(function (env) {

	  var baseUrl = '';
	  var isJson = false;

	  var callbackStack = {};

	  var invoke = function invoke(url, params, callback) {
	    if (!baseUrl) {
	      throw 'jsbridge must be initialized at least once';
	    }

	    url = url.replace(/^\//, '').replace(/\/$/, '');

	    callbackStack['callback_' + Date.parse(new Date())] = callback;

	    var reqUrl = '' + baseUrl + url + (isJson ? '/' + JSON.stringify(params) : '?' + Object.keys(params).map(function (key) {
	      return key + '=' + params[key];
	    }).join('&'));

	    var request = document.createElement('IFRAME');
	    request.setAttribute("src", reqUrl);
	    document.documentElement.appendChild(request);
	    request.parentNode.removeChild(request);
	    request = null;

	    return true;
	  };

	  var callback = function callback(callbackName, params) {
	    try {
	      params = JSON.parse(params);
	    } catch (e) {
	      console.warn('JSBridge callback params should be JSON object with stringify \n returns ' + (typeof params === 'undefined' ? 'undefined' : _typeof(params)) + ' \n ' + params);
	    }

	    // do callback
	    if (!callbackStack || !callbackStack[callbackName]) {
	      throw 'cannot find callback function ' + callbackName + ' in ' + Object.keys(callbackStack);
	    }
	    try {
	      callbackStack[callbackName](params);
	    } catch (e) {
	      console.error(e);
	    } finally {
	      delete callbackStack[callbackName];
	    }
	    return true;
	  };

	  var init = function init() {
	    var protocol = arguments.length <= 0 || arguments[0] === undefined ? 'jsbridge' : arguments[0];
	    var hostname = arguments[1];
	    var port = arguments[2];
	    var json = arguments.length <= 3 || arguments[3] === undefined ? false : arguments[3];

	    if (port && !Number.isInteger(Number(port))) {
	      throw 'port must be number';
	    }

	    baseUrl = protocol.replace(/:|\//g, '') + '://' + hostname + (hostname && port ? ':' + port + '/' : '/');
	    isJson = json;

	    return {
	      invoke: invoke, callback: callback
	    };
	  };

	  var that = {
	    init: init,
	    callback: callback,
	    invoke: invoke
	  };

	  if (_typeof(env.module) === 'object') {
	    module.exports = init;
	  }

	  env.JSBridge = that;
	})(undefined);

/***/ }
/******/ ]);