(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("prop-types"), require("react"), require("react-redux"), require("reselect"), require("raf"), require("lodash/function"));
	else if(typeof define === 'function' && define.amd)
		define(["prop-types", "react", "react-redux", "reselect", "raf", "lodash/function"], factory);
	else if(typeof exports === 'object')
		exports["scroller.js"] = factory(require("prop-types"), require("react"), require("react-redux"), require("reselect"), require("raf"), require("lodash/function"));
	else
		root["scroller.js"] = factory(root["prop-types"], root["react"], root["react-redux"], root["reselect"], root["raf"], root["lodash/function"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_4__, __WEBPACK_EXTERNAL_MODULE_8__, __WEBPACK_EXTERNAL_MODULE_9__) {
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
	exports.saveScrollPosition = exports.SAVE_SCROLL_POSITION = exports.Scroller = undefined;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(1);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _raf = __webpack_require__(8);

	var _raf2 = _interopRequireDefault(_raf);

	var _reactRedux = __webpack_require__(3);

	var _reselect = __webpack_require__(4);

	var _function = __webpack_require__(9);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var T = _propTypes2.default;

	var STYLE = {
	  position: 'relative',
	  height: '100%',
	  width: '100%',
	  boxSizing: 'border-box',
	  overflowY: 'auto'
	};

	var Scroller = exports.Scroller = function (_React$Component) {
	  _inherits(Scroller, _React$Component);

	  function Scroller(props) {
	    _classCallCheck(this, Scroller);

	    var _this = _possibleConstructorReturn(this, (Scroller.__proto__ || Object.getPrototypeOf(Scroller)).call(this, props));

	    _this._resetValues = function () {
	      _this.setState({
	        childrenToHide: {},
	        childHeights: {},
	        childPositions: {}
	      });
	    };

	    _this.resetValues = (0, _function.debounce)(_this._resetValues, 250);

	    _this.recordScrollPosition = function () {
	      var _this$props = _this.props,
	          id = _this$props.id,
	          onSaveScrollPosition = _this$props.onSaveScrollPosition;
	      var currentScrollPosition = _this.state.currentScrollPosition;

	      onSaveScrollPosition(currentScrollPosition);
	    };

	    _this.restoreScrollPosition = function (el) {
	      if (el) {
	        var currentScrollPosition = _this.state.currentScrollPosition;

	        el.scrollTop = currentScrollPosition;
	      }
	    };

	    _this.setItem = function (item, key) {
	      var _this$state = _this.state,
	          childHeights = _this$state.childHeights,
	          childPositions = _this$state.childPositions;


	      if (item) {
	        if (!childHeights[key]) {
	          var offsetTop = item.offsetTop,
	              clientHeight = item.clientHeight;


	          _this.setState({
	            childHeights: _extends({}, _this.state.childHeights, _defineProperty({}, key, clientHeight)),
	            childPositions: _extends({}, _this.state.childPositions, _defineProperty({}, key, offsetTop))
	          });
	        }
	      }
	    };

	    _this.handleScroll = function (e) {
	      var _this$props2 = _this.props,
	          buffer = _this$props2.buffer,
	          loadMargin = _this$props2.loadMargin,
	          onLoadMore = _this$props2.onLoadMore,
	          children = _this$props2.children;

	      var scrollTop = e.currentTarget.scrollTop;
	      var containerHeight = e.currentTarget.clientHeight;
	      var contentHeight = e.currentTarget.firstChild.clientHeight;

	      (0, _raf2.default)(function () {
	        if (scrollTop + containerHeight > contentHeight - loadMargin) {
	          if (!_this.firedLoadMore) {
	            _this.firedLoadMore = true;
	            onLoadMore();
	          }
	        }

	        // mutate for faster perf
	        var childrenToHide = {};
	        for (var k in _this.state.childPositions) {
	          var pos = _this.state.childPositions[k];
	          var h = _this.state.childHeights[k];

	          if (pos + h < scrollTop - buffer) {
	            childrenToHide[k] = 'before';
	          } else if (pos > scrollTop + containerHeight + buffer) {
	            childrenToHide[k] = 'after';
	          }
	        }

	        _this.setState({
	          childrenToHide: childrenToHide,
	          currentScrollPosition: scrollTop
	        });
	      });
	    };

	    _this.state = {
	      childrenToHide: {},
	      childHeights: {},
	      childPositions: {},
	      currentScrollPosition: props.savedScrollPosition
	    };

	    _this.firedLoadMore = false;
	    return _this;
	  }

	  _createClass(Scroller, [{
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(nextProps) {
	      // compare the keys of the children. if either the order or the number don't
	      // match, this indicates that a potential 'loadMore' occured, so we need to
	      // reset our flag.
	      var currentChildren = this.props.children.map(function (c) {
	        return c.key;
	      }).join('.');
	      var newChildren = nextProps.children.map(function (c) {
	        return c.key;
	      }).join('.');

	      if (currentChildren !== newChildren) {
	        this.firedLoadMore = false;
	      }
	    }
	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      self.addEventListener('resize', this.resetValues);
	    }
	  }, {
	    key: 'shouldComponentUpdate',
	    value: function shouldComponentUpdate(nextProps, nextState) {
	      if (nextProps !== this.props) {
	        return true;
	      }
	      return nextState.childrenToHide !== this.state.childrenToHide;
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      this.recordScrollPosition();
	      self.removeEventListener('resize', this.resetValues);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this2 = this;

	      var children = this.props.children;
	      var _state = this.state,
	          childrenToHide = _state.childrenToHide,
	          childHeights = _state.childHeights;

	      var renderableChildren = children.filter(function (child) {
	        return !childrenToHide[child.key];
	      });

	      // mutate for faster perf
	      var childrenProperties = [];
	      var lastChildProperty = null;
	      children.forEach(function (child) {
	        if (childrenToHide[child.key]) {
	          var height = childHeights[child.key];

	          if (lastChildProperty && lastChildProperty.type === 'hidden') {
	            lastChildProperty.height += height;
	            lastChildProperty.key += '-' + child.key;
	          } else {
	            lastChildProperty = {
	              height: height,
	              key: 'hidden-' + child.key,
	              type: 'hidden'
	            };
	            childrenProperties.push(lastChildProperty);
	          }
	        } else {
	          lastChildProperty = { child: child, type: 'show' };
	          childrenProperties.push(lastChildProperty);
	        }
	      });

	      return _react2.default.createElement(
	        'div',
	        {
	          style: STYLE,
	          onScroll: this.handleScroll,
	          ref: this.restoreScrollPosition
	        },
	        _react2.default.createElement(
	          'div',
	          null,
	          childrenProperties.map(function (data) {
	            if (data.type === 'hidden') {
	              return _react2.default.createElement('div', {
	                key: data.key,
	                style: { height: data.height }
	              });
	            } else {
	              return _react2.default.cloneElement(data.child, {
	                ref: function ref(el) {
	                  return (0, _raf2.default)(function () {
	                    return _this2.setItem(el, data.child.key);
	                  });
	                }
	              });
	            }
	          })
	        )
	      );
	    }
	  }]);

	  return Scroller;
	}(_react2.default.Component);

	Scroller.propTypes = {
	  children: T.arrayOf(T.element).isRequired,
	  id: T.string,
	  buffer: T.number,
	  loadMargin: T.number,
	  savedScrollPosition: T.number,
	  onLoadMore: T.func,
	  onSaveScrollPosition: T.func
	};
	Scroller.defaultProps = {
	  buffer: 500,
	  savedScrollPosition: 0,
	  onLoadMore: function onLoadMore() {},
	  onSaveScrollPosition: function onSaveScrollPosition() {}
	};
	var SAVE_SCROLL_POSITION = exports.SAVE_SCROLL_POSITION = 'r/widgets__SAVE_SCROLL_POSITION';
	var saveScrollPosition = exports.saveScrollPosition = function saveScrollPosition(id, scrollPosition) {
	  return {
	    type: SAVE_SCROLL_POSITION,
	    payload: { id: id, scrollPosition: scrollPosition }
	  };
	};

	var selector = (0, _reselect.createSelector)(function (state, ownProps) {
	  return state.widgets.savedScrollPositions[ownProps.id];
	}, function (savedScrollPosition) {
	  return { savedScrollPosition: savedScrollPosition };
	});

	var dispatcher = function dispatcher(dispatch, ownProps) {
	  return {
	    onSaveScrollPosition: function onSaveScrollPosition(scrollPosition) {
	      return ownProps.id && dispatch(saveScrollPosition(ownProps.id, scrollPosition));
	    }
	  };
	};

	exports.default = (0, _reactRedux.connect)(selector, dispatcher)(Scroller);

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
/* 8 */
/***/ (function(module, exports) {

	module.exports = require("raf");

/***/ }),
/* 9 */
/***/ (function(module, exports) {

	module.exports = require("lodash/function");

/***/ })
/******/ ])
});
;