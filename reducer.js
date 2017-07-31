(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("./tooltip.js"), require("./modal.js"), require("./scroller.js"));
	else if(typeof define === 'function' && define.amd)
		define(["./tooltip.js", "./modal.js", "./scroller.js"], factory);
	else if(typeof exports === 'object')
		exports["reducer.js"] = factory(require("./tooltip.js"), require("./modal.js"), require("./scroller.js"));
	else
		root["reducer.js"] = factory(root["./tooltip.js"], root["./modal.js"], root["./scroller.js"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_5__, __WEBPACK_EXTERNAL_MODULE_6__, __WEBPACK_EXTERNAL_MODULE_7__) {
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
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _tooltip = __webpack_require__(5);

	var _modal = __webpack_require__(6);

	var _scroller = __webpack_require__(7);

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	var DEFAULT = {
	  tooltip: {
	    id: null,
	    target: null
	  },
	  modal: {
	    id: null
	  },
	  savedScrollPositions: {}
	};

	exports.default = function () {
	  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT;
	  var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	  switch (action.type) {
	    case _tooltip.TOGGLE_TOOLTIP:
	      {
	        var _action$payload = action.payload,
	            tooltipId = _action$payload.tooltipId,
	            target = _action$payload.target;


	        return tooltipId && target ? _extends({}, state, {
	          tooltip: {
	            target: target,
	            id: tooltipId
	          }
	        }) : _extends({}, state, {
	          tooltip: {
	            target: null,
	            id: null
	          }
	        });
	      }
	    case _modal.TOGGLE_MODAL:
	      {
	        var id = action.payload.id;

	        return id ? _extends({}, state, { modal: { id: id } }) : _extends({}, state, { modal: { id: null } });
	      }
	    case _scroller.SAVE_SCROLL_POSITION:
	      {
	        var _action$payload2 = action.payload,
	            _id = _action$payload2.id,
	            scrollPosition = _action$payload2.scrollPosition;


	        return _extends({}, state, {
	          savedScrollPositions: _extends({}, state.savedScrollPositions, _defineProperty({}, _id, scrollPosition))
	        });
	      }
	    default:
	      return state;
	  }
	};

/***/ }),
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_5__;

/***/ }),
/* 6 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_6__;

/***/ }),
/* 7 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_7__;

/***/ })
/******/ ])
});
;