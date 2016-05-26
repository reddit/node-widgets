(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("react-redux"), require("reselect"), require("lodash/object"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "react-redux", "reselect", "lodash/object"], factory);
	else if(typeof exports === 'object')
		exports["tooltip.js"] = factory(require("react"), require("react-redux"), require("reselect"), require("lodash/object"));
	else
		root["tooltip.js"] = factory(root["react"], root["react-redux"], root["reselect"], root["lodash/object"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_5__, __WEBPACK_EXTERNAL_MODULE_6__, __WEBPACK_EXTERNAL_MODULE_8__) {
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
	exports.TooltipShutter = exports.TooltipTarget = exports.Tooltip = exports._TooltipShutter = exports._TooltipTarget = exports._Tooltip = exports.toggleTooltip = exports.TOGGLE_TOOLTIP = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _reactRedux = __webpack_require__(5);

	var _reselect = __webpack_require__(6);

	var _object = __webpack_require__(8);

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

	  var _target$getBoundingCl = target.getBoundingClientRect();

	  var top = _target$getBoundingCl.top;
	  var left = _target$getBoundingCl.left;
	  var width = _target$getBoundingCl.width;
	  var height = _target$getBoundingCl.height;


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
	    var _ret = function () {
	      if (typeof self === 'undefined' || typeof self === 'null') {
	        return {
	          v: void 0
	        };
	      }

	      var realAlignment = alignment;
	      var elementHeight = element.offsetHeight;
	      var elementWidth = element.offsetWidth;

	      // First, calculate if the current positioning will actually fit in the
	      // browser window. if it wont, flip its alignment if that will fit better
	      if (alignment === TOOLTIP_ALIGNMENT.ABOVE) {
	        var _target$getBoundingCl2 = target.getBoundingClientRect();

	        var _top = _target$getBoundingCl2.top;
	        var height = _target$getBoundingCl2.height;


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
	        var _target$getBoundingCl3 = target.getBoundingClientRect();

	        var _top2 = _target$getBoundingCl3.top;
	        var _height = _target$getBoundingCl3.height;


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
	        var _target$getBoundingCl4 = target.getBoundingClientRect();

	        var _left = _target$getBoundingCl4.left;
	        var width = _target$getBoundingCl4.width;


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
	        var _target$getBoundingCl5 = target.getBoundingClientRect();

	        var _left2 = _target$getBoundingCl5.left;
	        var _width = _target$getBoundingCl5.width;


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

	      var _getPositions = getPositions(element, target, realAlignment, offset);

	      var top = _getPositions.top;
	      var left = _getPositions.left;

	      var heightLimit = self.innerHeight - offset;
	      var widthLimit = self.innerWidth - offset;

	      element.style.top = top > offset ? top : offset;
	      element.style.bottom = top + elementHeight > heightLimit ? offset : null;
	      element.style.height = top + elementHeight > heightLimit ? 'auto' : element.style.height;
	      element.style.left = left > offset ? left : offset;
	      element.style.right = left + elementWidth > widthLimit ? offset : null;
	      element.style.width = left + elementWidth > widthLimit ? 'auto' : element.style.width;

	      // Finnaly, position the arrow div within the tooltip
	      Array.from(element.children).slice(0, 2).map(function (x, i) {
	        return positionArrow(x, target, realAlignment, offset, !!i);
	      });
	    }();

	    if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
	  }
	};

	var positionArrow = function positionArrow(element, target, alignment, offset, inner) {
	  if (element) {
	    element.style.position = 'fixed';
	    element.style.width = 0;
	    element.style.height = 0;
	    element.style.zIndex = 1001;

	    var _getPositions2 = getPositions(element, target, alignment, offset);

	    var top = _getPositions2.top;
	    var left = _getPositions2.left;
	    var marginTop = _getPositions2.marginTop;
	    var marginLeft = _getPositions2.marginLeft;

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
	      var className = _props.className;
	      var onToggleTooltip = _props.onToggleTooltip;

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
	          _react2.default.createElement('div', null),
	          _react2.default.createElement('div', null),
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
	;

	var _TooltipTarget = exports._TooltipTarget = function (_React$Component2) {
	  _inherits(_TooltipTarget, _React$Component2);

	  function _TooltipTarget() {
	    var _Object$getPrototypeO;

	    var _temp, _this2, _ret2;

	    _classCallCheck(this, _TooltipTarget);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret2 = (_temp = (_this2 = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(_TooltipTarget)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this2), _this2.handleOpenTooltip = function (e) {
	      e.stopPropagation();
	      e.nativeEvent.stopImmediatePropagation();
	      _this2.props.onToggleTooltip(e.currentTarget);
	    }, _this2.handleCloseTooltip = function (e) {
	      _this2.props.onToggleTooltip(null);
	    }, _temp), _possibleConstructorReturn(_this2, _ret2);
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
	        var _ret3 = function () {
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

	        if ((typeof _ret3 === 'undefined' ? 'undefined' : _typeof(_ret3)) === "object") return _ret3.v;
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _props2 = this.props;
	      var inline = _props2.inline;
	      var type = _props2.type;
	      var children = _props2.children;


	      if (typeof children === 'array') {
	        throw new Error('Tooltip target can only have one child');
	      } else if (typeof children === 'string') {
	        return _react2.default.createElement(
	          'span',
	          this.makeHandler(),
	          children
	        );
	      } else {
	        return _react2.default.cloneElement(children, this.makeHandler());
	      }
	    }
	  }]);

	  return _TooltipTarget;
	}(_react2.default.Component);

	_TooltipTarget.propTypes = {
	  id: T.string.isRequired,
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
	    var _Object$getPrototypeO2;

	    var _temp2, _this4, _ret4;

	    _classCallCheck(this, _TooltipShutter);

	    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	      args[_key2] = arguments[_key2];
	    }

	    return _ret4 = (_temp2 = (_this4 = _possibleConstructorReturn(this, (_Object$getPrototypeO2 = Object.getPrototypeOf(_TooltipShutter)).call.apply(_Object$getPrototypeO2, [this].concat(args))), _this4), _this4.handleClick = function (e) {
	      if (_this4.props.tooltipId) {
	        _this4.props.onToggleTooltip(null);
	      }
	    }, _temp2), _possibleConstructorReturn(_this4, _ret4);
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

/***/ },
/* 1 */,
/* 2 */,
/* 3 */
/***/ function(module, exports) {

	module.exports = require("react");

/***/ },
/* 4 */,
/* 5 */
/***/ function(module, exports) {

	module.exports = require("react-redux");

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = require("reselect");

/***/ },
/* 7 */,
/* 8 */
/***/ function(module, exports) {

	module.exports = require("lodash/object");

/***/ }
/******/ ])
});
;