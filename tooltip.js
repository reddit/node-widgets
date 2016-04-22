(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("react-redux"), require("reselect"), require("lodash/object"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "react-redux", "reselect", "lodash/object"], factory);
	else if(typeof exports === 'object')
		exports["tooltip.js"] = factory(require("react"), require("react-redux"), require("reselect"), require("lodash/object"));
	else
		root["tooltip.js"] = factory(root["react"], root["react-redux"], root["reselect"], root["lodash/object"]);
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
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Target = exports.Tooltip = exports._Target = exports._Tooltip = exports.reducer = exports.toggleTooltip = exports.TOGGLE_TOOLTIP = undefined;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactRedux = __webpack_require__(2);

	var _reselect = __webpack_require__(3);

	var _object = __webpack_require__(4);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var T = _react2.default.PropTypes;

	var TOOLTIP_ALIGNMENT = {
	  ABOVE: 'above',
	  BELOW: 'below',
	  LEFT: 'left',
	  RIGHT: 'right'
	};

	var TARGET_TYPES = {
	  HOVER: 'hover',
	  CLICK: 'click',
	  BOTH: 'both'
	};

	var DEFAULT_OFFSET = 16;

	// ******* ACTIONS
	var TOGGLE_TOOLTIP = exports.TOGGLE_TOOLTIP = 'r/widgets__TOGGLE_TOOLTIP';

	var toggleTooltip = exports.toggleTooltip = function toggleTooltip(tooltipId, target) {
	  return {
	    type: TOGGLE_TOOLTIP,
	    payload: { tooltipId: tooltipId, target: target }
	  };
	};

	// ******* REDUCER
	var reducer = exports.reducer = function reducer() {
	  var state = arguments.length <= 0 || arguments[0] === undefined ? { openedTooltip: null, target: null } : arguments[0];
	  var action = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	  switch (action.type) {
	    case TOGGLE_TOOLTIP:
	      {
	        var _payload = payload;
	        var tooltipId = _payload.tooltipId;
	        var target = _payload.target;


	        return tooltipId && target ? { target: target, openedTooltip: tooltipId } : { openedTooltip: null, target: null };
	      }
	    default:
	      return state;
	  }
	};

	// ******* RAW COMPONENTS

	var _Tooltip = exports._Tooltip = function (_React$Component) {
	  _inherits(_Tooltip, _React$Component);

	  function _Tooltip() {
	    _classCallCheck(this, _Tooltip);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(_Tooltip).apply(this, arguments));
	  }

	  _createClass(_Tooltip, [{
	    key: 'render',
	    value: function render() {
	      var _props = this.props;
	      var target = _props.target;
	      var show = _props.show;
	      var alignment = _props.alignment;
	      var offset = _props.offset;
	      var children = _props.children;


	      if (show) {
	        return _react2.default.createElement(
	          'div',
	          { className: 'r-Tooltip' },
	          children
	        );
	      } else {
	        return null;
	      }
	    }
	  }]);

	  return _Tooltip;
	}(_react2.default.Component);

	_Tooltip.propTypes = {
	  id: T.string.isRequired,
	  alignment: T.oneOf((0, _object.values)(TOOLTIP_ALIGNMENT)).isRequired,
	  show: T.bool,
	  target: T.object,
	  offset: T.number
	};
	_Tooltip.defaultProps = {
	  show: false,
	  offset: DEFAULT_OFFSET
	};
	;

	var _Target = exports._Target = function (_React$Component2) {
	  _inherits(_Target, _React$Component2);

	  function _Target() {
	    var _Object$getPrototypeO;

	    var _temp, _this2, _ret;

	    _classCallCheck(this, _Target);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this2 = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(_Target)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this2), _this2.handleOpenTooltip = function (e) {
	      _this2.props.onToggleTooltip(_this2.props.id, e.target);
	    }, _this2.handleCloseTooltip = function (e) {
	      _this2.props.onToggleTooltip(null);
	    }, _temp), _possibleConstructorReturn(_this2, _ret);
	  }

	  _createClass(_Target, [{
	    key: 'makeHandler',
	    value: function makeHandler() {
	      var _this3 = this;

	      var type = this.props.type;


	      if (type === TARGET_TYPES.HOVER) {
	        return {
	          onMouseEnter: this.handleOpenTooltip,
	          onMouseLeave: this.handleCloseTooltip
	        };
	      } else if (type === TARGET_TYPES.CLICK) {
	        return {
	          onClick: this.handleOpenTooltip
	        };
	      } else {
	        var _ret2 = function () {
	          var keepOpen = false;

	          return {
	            v: {
	              onMouseEnter: _this3.handleOpenTooltip,
	              onMouseLeave: function onMouseLeave(e) {
	                if (!keepOpen) _this3.handleCloseTooltip(e);
	              },
	              onClick: function onClick(e) {
	                keepOpen = true;
	                _this3.handleOpenTooltip(e);
	              }
	            }
	          };
	        }();

	        if ((typeof _ret2 === 'undefined' ? 'undefined' : _typeof(_ret2)) === "object") return _ret2.v;
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _props2 = this.props;
	      var inline = _props2.inline;
	      var type = _props2.type;
	      var children = _props2.children;

	      var style = inline ? { display: 'inline-block' } : null;

	      return _react2.default.createElement(
	        'div',
	        _extends({ style: style }, this.makeHandler()),
	        children
	      );
	    }
	  }]);

	  return _Target;
	}(_react2.default.Component);

	// ******* CONNECTED COMPONENTS


	_Target.propTypes = {
	  id: T.string.isRequired,
	  inline: T.bool,
	  type: T.oneOf((0, _object.values)(TARGET_TYPES)),
	  onToggleTooltip: T.func
	};
	_Target.defaultProps = {
	  inline: false,
	  type: Target.HOVER,
	  onToggleTooltip: function onToggleTooltip() {}
	};
	var tooltipSelector = (0, _reselect.createSelector)(function (state) {
	  return state.tooltip.openedTooltip;
	}, function (state) {
	  return state.tooltip.target;
	}, function (tooltipId, target) {
	  return { tooltipId: tooltipId, target: target };
	});

	var mergeTooltipProps = function mergeTooltipProps(stateProps, dispatchProps, ownProps) {
	  return _extends({}, ownProps, {
	    target: stateProps.target,
	    show: ownProps.id === stateProps.tooltipId
	  });
	};

	var Tooltip = exports.Tooltip = (0, _reactRedux.connect)(tooltipSelector, null, mergeTooltipProps)(_Tooltip);

	Tooltip.ALIGN = TOOLTIP_ALIGNMENT;

	var targetDispatcher = function targetDispatcher(dispatch) {
	  return {
	    onToggleTooltip: function onToggleTooltip(id, target) {
	      return dispatch(toggleTooltip(id, target));
	    }
	  };
	};

	var Target = exports.Target = (0, _reactRedux.connect)(null, targetDispatcher)(_Target);

	Target.TYPE = TARGET_TYPES;

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("react");

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("react-redux");

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("reselect");

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = require("lodash/object");

/***/ }
/******/ ])
});
;