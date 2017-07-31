(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("prop-types"), require("react"), require("react-redux"), require("reselect"));
	else if(typeof define === 'function' && define.amd)
		define(["prop-types", "react", "react-redux", "reselect"], factory);
	else if(typeof exports === 'object')
		exports["modal.js"] = factory(require("prop-types"), require("react"), require("react-redux"), require("reselect"));
	else
		root["modal.js"] = factory(root["prop-types"], root["react"], root["react-redux"], root["reselect"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_4__) {
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
	exports.ModalTarget = exports.Modal = exports._ModalTarget = exports._Modal = exports.toggleModal = exports.TOGGLE_MODAL = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _propTypes = __webpack_require__(1);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _reactRedux = __webpack_require__(3);

	var _reselect = __webpack_require__(4);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var T = _propTypes2.default;

	var STYLE_CONTAINER = {
	  position: 'fixed',
	  top: 0,
	  left: 0,
	  right: 0,
	  bottom: 0,
	  zIndex: 1000,
	  backgroundColor: 'rgba(0,0,0,0.4)'
	};

	// ******* ACTIONS
	var TOGGLE_MODAL = exports.TOGGLE_MODAL = 'r/widgets__TOGGLE_MODAL';

	var toggleModal = exports.toggleModal = function toggleModal(id) {
	  return {
	    type: TOGGLE_MODAL,
	    payload: { id: id }
	  };
	};

	// ******* RAW COMPONENTS

	var _Modal = exports._Modal = function (_React$Component) {
	  _inherits(_Modal, _React$Component);

	  function _Modal() {
	    _classCallCheck(this, _Modal);

	    return _possibleConstructorReturn(this, (_Modal.__proto__ || Object.getPrototypeOf(_Modal)).apply(this, arguments));
	  }

	  _createClass(_Modal, [{
	    key: 'render',
	    value: function render() {
	      var _props = this.props,
	          className = _props.className,
	          show = _props.show,
	          children = _props.children,
	          onToggleModal = _props.onToggleModal;


	      if (show) {
	        return _react2.default.createElement(
	          'div',
	          { style: STYLE_CONTAINER, onClick: function onClick() {
	              return onToggleModal(null);
	            } },
	          _react2.default.createElement(
	            'div',
	            { className: className, onClick: function onClick(e) {
	                return e.stopPropagation();
	              } },
	            children
	          )
	        );
	      } else {
	        return null;
	      }
	    }
	  }]);

	  return _Modal;
	}(_react2.default.Component);

	_Modal.propTypes = {
	  className: T.string,
	  show: T.bool,
	  onToggleModal: T.func
	};
	_Modal.defaultProps = {
	  className: '',
	  show: false,
	  onToggleModal: function onToggleModal() {}
	};

	var _ModalTarget = exports._ModalTarget = function (_React$Component2) {
	  _inherits(_ModalTarget, _React$Component2);

	  function _ModalTarget() {
	    _classCallCheck(this, _ModalTarget);

	    return _possibleConstructorReturn(this, (_ModalTarget.__proto__ || Object.getPrototypeOf(_ModalTarget)).apply(this, arguments));
	  }

	  _createClass(_ModalTarget, [{
	    key: 'makeHandler',
	    value: function makeHandler() {
	      var onToggleModal = this.props.onToggleModal;


	      return {
	        onClick: function onClick() {
	          return onToggleModal();
	        }
	      };
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var child = this.props.children;


	      return typeof child === 'string' ? _react2.default.createElement(
	        'span',
	        this.makeHandler(),
	        child
	      ) : _react2.default.cloneElement(_react2.default.Children.only(child), this.makeHandler());
	    }
	  }]);

	  return _ModalTarget;
	}(_react2.default.Component);

	// ******* CONNECTED COMPONENTS


	_ModalTarget.propTypes = {
	  children: T.oneOfType([T.string, T.element]).isRequired,
	  onToggleModal: T.func
	};
	_ModalTarget.defaultProps = {
	  onToggleModal: function onToggleModal() {}
	};
	var modalSelector = (0, _reselect.createSelector)(function (state, ownProps) {
	  return state.widgets.modal.id === ownProps.id;
	}, function (show) {
	  return { show: show };
	});

	var modalDispatcher = function modalDispatcher(dispatch) {
	  return {
	    onToggleModal: function onToggleModal(id) {
	      return dispatch(toggleModal(id));
	    }
	  };
	};

	var modalTargetDispatcher = function modalTargetDispatcher(dispatch, _ref) {
	  var id = _ref.id;
	  return {
	    onToggleModal: function onToggleModal() {
	      return dispatch(toggleModal(id));
	    }
	  };
	};

	var Modal = exports.Modal = (0, _reactRedux.connect)(modalSelector, modalDispatcher)(_Modal);
	var ModalTarget = exports.ModalTarget = (0, _reactRedux.connect)(null, modalTargetDispatcher)(_ModalTarget);

	Modal.propTypes = {
	  id: T.string.isRequired
	};

	ModalTarget.propTypes = {
	  id: T.string.isRequired
	};

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	module.exports = require("prop-types");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	module.exports = require("react");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	module.exports = require("react-redux");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

	module.exports = require("reselect");

/***/ })
/******/ ])
});
;