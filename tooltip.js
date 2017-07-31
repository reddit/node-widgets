(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("prop-types"), require("react"), require("react-redux"), require("reselect"), require("lodash/object"));
	else if(typeof define === 'function' && define.amd)
		define(["prop-types", "react", "react-redux", "reselect", "lodash/object"], factory);
	else if(typeof exports === 'object')
		exports["tooltip.js"] = factory(require("prop-types"), require("react"), require("react-redux"), require("reselect"), require("lodash/object"));
	else
		root["tooltip.js"] = factory(root["prop-types"], root["react"], root["react-redux"], root["reselect"], root["lodash/object"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_4__, __WEBPACK_EXTERNAL_MODULE_10__) {
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
	exports.TooltipShutter = exports.TooltipTarget = exports.Tooltip = exports._TooltipShutter = exports._TooltipTarget = exports._Tooltip = exports.toggleTooltip = exports.TOGGLE_TOOLTIP = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _propTypes = __webpack_require__(1);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _reactRedux = __webpack_require__(3);

	var _reselect = __webpack_require__(4);

	var _object = __webpack_require__(10);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var T = _propTypes2.default;

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

	var STYLE = {
	  position: 'fixed',
	  borderWidth: 1,
	  borderStyle: 'solid',
	  backgroundColor: 'white',
	  zIndex: 1000
	};

	var getPositions = function getPositions(element, target, alignment, offset) {
	  var elementHeight = element.offsetHeight;
	  var elementWidth = element.offsetWidth;

	  var _target$getBoundingCl = target.getBoundingClientRect(),
	      top = _target$getBoundingCl.top,
	      left = _target$getBoundingCl.left,
	      width = _target$getBoundingCl.width,
	      height = _target$getBoundingCl.height;

	  switch (alignment) {
	    case TOOLTIP_ALIGNMENT.LEFT:
	      top += height / 2;
	      top -= elementHeight / 2;
	      left += -offset - elementWidth;
	      break;
	    case TOOLTIP_ALIGNMENT.RIGHT:
	      top += height / 2;
	      top -= elementHeight / 2;
	      left += width + offset;
	      break;
	    case TOOLTIP_ALIGNMENT.ABOVE:
	      top += -offset - elementHeight;
	      left += width / 2;
	      left -= elementWidth / 2;
	      break;
	    case TOOLTIP_ALIGNMENT.BELOW:
	      top += height + offset;
	      left += width / 2;
	      left -= elementWidth / 2;
	      break;
	  }

	  return { top: top, left: left };
	};

	var positionTooltip = function positionTooltip(element, target, alignment, offset) {
	  if (element) {
	    if (typeof self === 'undefined' || typeof self === 'null') {
	      return;
	    }

	    var realAlignment = alignment;
	    var elementHeight = element.offsetHeight;
	    var elementWidth = element.offsetWidth;

	    // First, calculate if the current positioning will actually fit in the
	    // browser window. if it wont, flip its alignment if that will fit better
	    if (alignment === TOOLTIP_ALIGNMENT.ABOVE) {
	      var _target$getBoundingCl2 = target.getBoundingClientRect(),
	          _top = _target$getBoundingCl2.top,
	          height = _target$getBoundingCl2.height;

	      if (_top - height - elementHeight < 0) {
	        if (_top + height + elementHeight < self.innerHeight) {
	          // fits if flipped
	          realAlignment = TOOLTIP_ALIGNMENT.BELOW;
	        } else if (_top < self.innerHeight / 2) {
	          // doesn't fit, but fits better
	          realAlignment = TOOLTIP_ALIGNMENT.BELOW;
	        }
	      }
	    } else if (alignment === TOOLTIP_ALIGNMENT.BELOW) {
	      var _target$getBoundingCl3 = target.getBoundingClientRect(),
	          _top2 = _target$getBoundingCl3.top,
	          _height = _target$getBoundingCl3.height;

	      if (_top2 + _height + elementHeight > self.innerHeight) {
	        if (_top2 - _height - elementHeight > 0) {
	          // fits if flipped
	          realAlignment = TOOLTIP_ALIGNMENT.ABOVE;
	        } else if (_top2 > self.innerHeight / 2) {
	          // doesn't fit, but fits better
	          realAlignment = TOOLTIP_ALIGNMENT.ABOVE;
	        }
	      }
	    } else if (alignment === TOOLTIP_ALIGNMENT.LEFT) {
	      var _target$getBoundingCl4 = target.getBoundingClientRect(),
	          _left = _target$getBoundingCl4.left,
	          width = _target$getBoundingCl4.width;

	      if (_left - width - elementWidth < 0) {
	        if (_left + width + elementWidth < self.innerWidth) {
	          // fits if flipped
	          realAlignment = TOOLTIP_ALIGNMENT.RIGHT;
	        } else if (_left < self.innerWidth / 2) {
	          // doesn't fit, but fits better
	          realAlignment = TOOLTIP_ALIGNMENT.RIGHT;
	        }
	      }
	    } else if (alignment === TOOLTIP_ALIGNMENT.RIGHT) {
	      var _target$getBoundingCl5 = target.getBoundingClientRect(),
	          _left2 = _target$getBoundingCl5.left,
	          _width = _target$getBoundingCl5.width;

	      if (_left2 + _width + elementWidth > self.innerWidth) {
	        if (_left2 - _width - elementWidth > 0) {
	          // fits if flipped
	          realAlignment = TOOLTIP_ALIGNMENT.LEFT;
	        } else if (_left2 > self.innerWidth / 2) {
	          // doesn't fit, but fits better
	          realAlignment = TOOLTIP_ALIGNMENT.LEFT;
	        }
	      }
	    }

	    // Next, position the tooltip

	    var _getPositions = getPositions(element, target, realAlignment, offset),
	        top = _getPositions.top,
	        left = _getPositions.left;

	    var heightLimit = self.innerHeight - offset;
	    var widthLimit = self.innerWidth - offset;

	    var newTop = top > offset ? top : offset;
	    element.style.top = newTop;
	    element.style.bottom = newTop + elementHeight > heightLimit ? offset : null;
	    element.style.height = newTop + elementHeight > heightLimit ? 'auto' : element.style.height;

	    var newLeft = left > offset ? left : offset;
	    element.style.left = newLeft;
	    element.style.right = newLeft + elementWidth > widthLimit ? offset : null;
	    element.style.width = newLeft + elementWidth > widthLimit ? 'auto' : element.style.width;

	    // Finnaly, position the arrow div within the tooltip
	    Array.from(element.children).slice(0, 2).map(function (x, i) {
	      return positionArrow(x, target, realAlignment, offset, !!i);
	    });
	  }
	};

	var positionArrow = function positionArrow(element, target, alignment, offset, inner) {
	  if (element) {
	    element.style.position = 'fixed';
	    element.style.width = 0;
	    element.style.height = 0;
	    element.style.zIndex = 1001;

	    var _getPositions2 = getPositions(element, target, alignment, offset),
	        top = _getPositions2.top,
	        left = _getPositions2.left,
	        marginTop = _getPositions2.marginTop,
	        marginLeft = _getPositions2.marginLeft;

	    var size = inner ? 7 : 8;
	    var arrowSides = size + 'px solid transparent';
	    var arrowBase = size + 'px solid ' + (inner ? 'white' : '');

	    if (alignment === TOOLTIP_ALIGNMENT.ABOVE || alignment === TOOLTIP_ALIGNMENT.BELOW) {
	      element.style.left = left - size;
	      element.style.marginTop = marginTop;
	      element.style.borderLeft = arrowSides;
	      element.style.borderRight = arrowSides;

	      if (alignment === TOOLTIP_ALIGNMENT.BELOW) {
	        element.style.top = top - size + 1;
	        element.style.borderBottom = arrowBase;
	        if (!inner) {
	          element.style.borderBottomColor = 'inherit';
	        }
	      } else {
	        element.style.top = top - 1;
	        element.style.borderTop = arrowBase;
	        if (!inner) {
	          element.style.borderTopColor = 'inherit';
	        }
	      }
	    } else {
	      element.style.top = top - size;
	      element.style.marginLeft = marginLeft;
	      element.style.borderTop = arrowSides;
	      element.style.borderBottom = arrowSides;

	      if (alignment === TOOLTIP_ALIGNMENT.RIGHT) {
	        element.style.left = left - size + 1;
	        element.style.borderRight = arrowBase;
	        if (!inner) {
	          element.style.borderRightColor = 'inherit';
	        }
	      } else {
	        element.style.left = left - 1;
	        element.style.borderLeft = arrowBase;
	        if (!inner) {
	          element.style.borderLeftColor = 'inherit';
	        }
	      }
	    }
	  }
	};

	// ******* ACTIONS
	var TOGGLE_TOOLTIP = exports.TOGGLE_TOOLTIP = 'r/widgets__TOGGLE_TOOLTIP';

	var toggleTooltip = exports.toggleTooltip = function toggleTooltip(tooltipId, target) {
	  return {
	    type: TOGGLE_TOOLTIP,
	    payload: { tooltipId: tooltipId, target: target }
	  };
	};

	// ******* RAW COMPONENTS

	var _Tooltip = exports._Tooltip = function (_React$Component) {
	  _inherits(_Tooltip, _React$Component);

	  function _Tooltip() {
	    _classCallCheck(this, _Tooltip);

	    return _possibleConstructorReturn(this, (_Tooltip.__proto__ || Object.getPrototypeOf(_Tooltip)).apply(this, arguments));
	  }

	  _createClass(_Tooltip, [{
	    key: 'render',
	    value: function render() {
	      var _props = this.props,
	          target = _props.target,
	          show = _props.show,
	          alignment = _props.alignment,
	          offset = _props.offset,
	          children = _props.children,
	          className = _props.className,
	          onToggleTooltip = _props.onToggleTooltip;

	      var realAlignment = alignment;

	      if (show) {
	        return _react2.default.createElement(
	          'div',
	          {
	            className: className,
	            style: STYLE,
	            ref: function ref(x) {
	              realAlignment = positionTooltip(x, target, alignment, offset);
	            },
	            onClick: function onClick(e) {
	              return e.stopPropagation();
	            }
	          },
	          _react2.default.createElement('div', { className: className + '__arrowBorder' }),
	          _react2.default.createElement('div', { className: className + '__arrow' }),
	          _react2.default.createElement(
	            'div',
	            { style: { width: '100%', height: '100%', overflowY: 'auto', overflowX: 'auto' } },
	            children
	          )
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
	  offset: T.number,
	  className: T.string
	};
	_Tooltip.defaultProps = {
	  show: false,
	  offset: DEFAULT_OFFSET,
	  className: ''
	};

	var _TooltipTarget = exports._TooltipTarget = function (_React$Component2) {
	  _inherits(_TooltipTarget, _React$Component2);

	  function _TooltipTarget() {
	    var _ref;

	    var _temp, _this2, _ret;

	    _classCallCheck(this, _TooltipTarget);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this2 = _possibleConstructorReturn(this, (_ref = _TooltipTarget.__proto__ || Object.getPrototypeOf(_TooltipTarget)).call.apply(_ref, [this].concat(args))), _this2), _this2.handleOpenTooltip = function (e) {
	      e.stopPropagation();
	      e.nativeEvent.stopImmediatePropagation();
	      _this2.props.onToggleTooltip(e.currentTarget);
	    }, _this2.handleCloseTooltip = function (e) {
	      _this2.props.onToggleTooltip(null);
	    }, _temp), _possibleConstructorReturn(_this2, _ret);
	  }

	  _createClass(_TooltipTarget, [{
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
	        var keepOpen = false;

	        return {
	          onMouseEnter: this.handleOpenTooltip,
	          onMouseLeave: function onMouseLeave(e) {
	            if (!keepOpen) _this3.handleCloseTooltip(e);
	          },
	          onClick: function onClick(e) {
	            keepOpen = true;
	            _this3.handleOpenTooltip(e);
	          }
	        };
	      }
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

	  return _TooltipTarget;
	}(_react2.default.Component);

	_TooltipTarget.propTypes = {
	  id: T.string.isRequired,
	  children: T.oneOfType([T.string, T.element]).isRequired,
	  type: T.oneOf((0, _object.values)(TARGET_TYPES)),
	  onToggleTooltip: T.func
	};
	_TooltipTarget.defaultProps = {
	  type: TARGET_TYPES.HOVER,
	  onToggleTooltip: function onToggleTooltip() {}
	};

	var _TooltipShutter = exports._TooltipShutter = function (_React$Component3) {
	  _inherits(_TooltipShutter, _React$Component3);

	  function _TooltipShutter() {
	    var _ref2;

	    var _temp2, _this4, _ret2;

	    _classCallCheck(this, _TooltipShutter);

	    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	      args[_key2] = arguments[_key2];
	    }

	    return _ret2 = (_temp2 = (_this4 = _possibleConstructorReturn(this, (_ref2 = _TooltipShutter.__proto__ || Object.getPrototypeOf(_TooltipShutter)).call.apply(_ref2, [this].concat(args))), _this4), _this4.handleClick = function (e) {
	      if (_this4.props.tooltipId) {
	        _this4.props.onToggleTooltip(null);
	      }
	    }, _temp2), _possibleConstructorReturn(_this4, _ret2);
	  }

	  _createClass(_TooltipShutter, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      document.addEventListener('click', this.handleClick);
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      document.removeEventListener(this.handleClick);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return false;
	    }
	  }]);

	  return _TooltipShutter;
	}(_react2.default.Component);

	// ******* CONNECTED COMPONENTS


	_TooltipShutter.propTypes = {
	  tooltipId: T.oneOfType([T.string, T.void]),
	  onToggleTooltip: T.func.isRequired
	};
	var tooltipSelector = (0, _reselect.createSelector)(function (state, ownProps) {
	  return state.widgets.tooltip.id === ownProps.id;
	}, function (state) {
	  return state.widgets.tooltip.target;
	}, function (show, target) {
	  return { show: show, target: target };
	});

	var targetDispatcher = function targetDispatcher(dispatch, ownProps) {
	  return {
	    onToggleTooltip: function onToggleTooltip(target) {
	      return dispatch(toggleTooltip(ownProps.id, target));
	    }
	  };
	};

	var Tooltip = exports.Tooltip = (0, _reactRedux.connect)(tooltipSelector)(_Tooltip);

	Tooltip.ALIGN = TOOLTIP_ALIGNMENT;

	var TooltipTarget = exports.TooltipTarget = (0, _reactRedux.connect)(null, targetDispatcher)(_TooltipTarget);

	TooltipTarget.TYPE = TARGET_TYPES;

	var watcherSelector = (0, _reselect.createSelector)(function (state) {
	  return state.widgets.tooltip.id;
	}, function (tooltipId) {
	  return { tooltipId: tooltipId };
	});

	var TooltipShutter = exports.TooltipShutter = (0, _reactRedux.connect)(watcherSelector, targetDispatcher)(_TooltipShutter);

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

/***/ }),
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */
/***/ (function(module, exports) {

	module.exports = require("lodash/object");

/***/ })
/******/ ])
});
;