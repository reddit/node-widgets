import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { values } from 'lodash/object';

const T = PropTypes;

const TOOLTIP_ALIGNMENT = {
  ABOVE: 'above',
  BELOW: 'below',
  LEFT: 'left',
  RIGHT: 'right',
};

const TARGET_TYPES = {
  HOVER: 'hover',
  CLICK: 'click',
  BOTH: 'both',
};

const DEFAULT_OFFSET = 16;

const STYLE = {
  position: 'fixed',
  borderWidth: 1,
  borderStyle: 'solid',
  backgroundColor: 'white',
  zIndex: 1000,
};

const getPositions = (element, target, alignment, offset) => {
  const elementHeight = element.offsetHeight;
  const elementWidth = element.offsetWidth;

  let { top, left, width, height } = target.getBoundingClientRect();

  switch (alignment) {
    case TOOLTIP_ALIGNMENT.LEFT:
      top += (height / 2);
      top -= (elementHeight / 2);
      left += (-offset - elementWidth);
      break;
    case TOOLTIP_ALIGNMENT.RIGHT:
      top += (height / 2);
      top -= (elementHeight / 2);
      left += width + offset;
      break;
    case TOOLTIP_ALIGNMENT.ABOVE:
      top += (-offset - elementHeight);
      left += (width / 2);
      left -= (elementWidth / 2);
      break;
    case TOOLTIP_ALIGNMENT.BELOW:
      top += height + offset;
      left += (width / 2);
      left -= (elementWidth / 2);
      break
  }

  return { top, left };
};

const positionTooltip = (element, target, alignment, offset) => {
  if (element) {
    if (typeof self === 'undefined' || typeof self === 'null') { return; }

    let realAlignment = alignment;
    const elementHeight = element.offsetHeight;
    const elementWidth = element.offsetWidth;

    // First, calculate if the current positioning will actually fit in the
    // browser window. if it wont, flip its alignment if that will fit better
    if (alignment === TOOLTIP_ALIGNMENT.ABOVE) {
      const { top, height } = target.getBoundingClientRect();

      if ((top - height - elementHeight) < 0) {
        if ((top + height + elementHeight) < self.innerHeight) {
          // fits if flipped
          realAlignment = TOOLTIP_ALIGNMENT.BELOW;
        } else if (top < (self.innerHeight / 2)) {
          // doesn't fit, but fits better
          realAlignment = TOOLTIP_ALIGNMENT.BELOW;
        }
      }
    } else if (alignment === TOOLTIP_ALIGNMENT.BELOW) {
      const { top, height } = target.getBoundingClientRect();

      if ((top + height + elementHeight) > self.innerHeight) {
        if ((top - height - elementHeight) > 0) {
          // fits if flipped
          realAlignment = TOOLTIP_ALIGNMENT.ABOVE;
        } else if (top > (self.innerHeight / 2)) {
          // doesn't fit, but fits better
          realAlignment = TOOLTIP_ALIGNMENT.ABOVE;
        }
      }
    } else if (alignment === TOOLTIP_ALIGNMENT.LEFT) {
      const { left, width } = target.getBoundingClientRect();

      if ((left - width - elementWidth) < 0) {
        if ((left + width + elementWidth) < self.innerWidth) {
          // fits if flipped
          realAlignment = TOOLTIP_ALIGNMENT.RIGHT;
        } else if (left < (self.innerWidth / 2)) {
          // doesn't fit, but fits better
          realAlignment = TOOLTIP_ALIGNMENT.RIGHT;
        }
      }
    } else if (alignment === TOOLTIP_ALIGNMENT.RIGHT) {
      const { left, width } = target.getBoundingClientRect();

      if ((left + width + elementWidth) > self.innerWidth) {
        if ((left - width - elementWidth > 0)) {
          // fits if flipped
          realAlignment = TOOLTIP_ALIGNMENT.LEFT;
        } else if (left > (self.innerWidth / 2)) {
          // doesn't fit, but fits better
          realAlignment = TOOLTIP_ALIGNMENT.LEFT;
        }
      }
    }

    // Next, position the tooltip
    const { top, left } = getPositions(element, target, realAlignment, offset);
    const heightLimit = self.innerHeight - offset;
    const widthLimit = self.innerWidth - offset;

    const newTop = top > offset ? top : offset;
    element.style.top = newTop;
    element.style.bottom = newTop + elementHeight > heightLimit ? offset : null;
    element.style.height = newTop + elementHeight > heightLimit ? 'auto' : element.style.height;

    const newLeft = left > offset ? left : offset;
    element.style.left =  newLeft;
    element.style.right = newLeft + elementWidth > widthLimit ? offset : null;
    element.style.width = newLeft + elementWidth > widthLimit ? 'auto' : element.style.width;

    // Finnaly, position the arrow div within the tooltip
    Array
      .from(element.children)
      .slice(0, 2)
      .map((x, i) => positionArrow(x, target, realAlignment, offset, !!i));
  }
};

const positionArrow = (element, target, alignment, offset, inner) => {
  if (element) {
    element.style.position = 'fixed';
    element.style.width = 0;
    element.style.height = 0;
    element.style.zIndex = 1001;

    const {
      top,
      left,
      marginTop,
      marginLeft
    } = getPositions(element, target, alignment, offset);
    const size = inner ? 7 : 8;
    const arrowSides = `${size}px solid transparent`;
    const arrowBase = `${size}px solid ${inner ? 'white' : ''}`;

    if (alignment === TOOLTIP_ALIGNMENT.ABOVE || alignment === TOOLTIP_ALIGNMENT.BELOW) {
      element.style.left = left - size;
      element.style.marginTop = marginTop;
      element.style.borderLeft = arrowSides;
      element.style.borderRight = arrowSides;

      if (alignment === TOOLTIP_ALIGNMENT.BELOW) {
        element.style.top = top - size + 1;
        element.style.borderBottom = arrowBase;
        if (!inner) { element.style.borderBottomColor = 'inherit'; }
      } else {
        element.style.top = top - 1;
        element.style.borderTop = arrowBase;
        if (!inner) { element.style.borderTopColor = 'inherit'; }
      }
    } else {
      element.style.top = top - size;
      element.style.marginLeft = marginLeft;
      element.style.borderTop = arrowSides;
      element.style.borderBottom = arrowSides;

      if (alignment === TOOLTIP_ALIGNMENT.RIGHT) {
        element.style.left = left - size + 1;
        element.style.borderRight = arrowBase;
        if (!inner) { element.style.borderRightColor = 'inherit'; }
      } else {
        element.style.left = left - 1;
        element.style.borderLeft = arrowBase;
        if (!inner) { element.style.borderLeftColor = 'inherit'; }
      }
    }
  }
};

// ******* ACTIONS
export const TOGGLE_TOOLTIP = 'r/widgets__TOGGLE_TOOLTIP';

export const toggleTooltip = (tooltipId, target) => ({
  type: TOGGLE_TOOLTIP,
  payload: { tooltipId, target },
});

// ******* RAW COMPONENTS
export class _Tooltip extends React.Component {
  static propTypes = {
    id: T.string.isRequired,
    alignment: T.oneOf(values(TOOLTIP_ALIGNMENT)).isRequired,
    show: T.bool,
    target: T.object,
    offset: T.number,
    className: T.string,
  };

  static defaultProps = {
    show: false,
    offset: DEFAULT_OFFSET,
    className: '',
  };

  render() {
    const { target, show, alignment, offset, children, className, onToggleTooltip } = this.props;
    let realAlignment = alignment;

    if (show) {
      return (
        <div
          className={ className }
          style={ STYLE }
          ref={ x => {
            realAlignment = positionTooltip(x, target, alignment, offset);
          }}
          onClick={ e => e.stopPropagation() }
        >
          <div className={ `${className}__arrowBorder` } />
          <div className={ `${className}__arrow` } />
          <div style={ { width: '100%', height: '100%', overflowY: 'auto', overflowX: 'auto' }}>
            { children }
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}

export class _TooltipTarget extends React.Component {
  static propTypes = {
    id: T.string.isRequired,
    children: T.oneOfType([T.string, T.element]).isRequired,
    type: T.oneOf(values(TARGET_TYPES)),
    onToggleTooltip: T.func,
  };

  static defaultProps = {
    type: TARGET_TYPES.HOVER,
    onToggleTooltip: () => {},
  };

  handleOpenTooltip = e => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    this.props.onToggleTooltip(e.currentTarget);
  }

  handleCloseTooltip = e => {
    this.props.onToggleTooltip(null);
  }

  makeHandler() {
    const { type } = this.props;

    if (type === TARGET_TYPES.HOVER) {
      return {
        onMouseEnter: this.handleOpenTooltip,
        onMouseLeave: this.handleCloseTooltip,
      };
    } else if (type === TARGET_TYPES.CLICK) {
      return {
        onClick: this.handleOpenTooltip,
      };
    } else {
      let keepOpen = false;

      return {
        onMouseEnter: this.handleOpenTooltip,
        onMouseLeave: e => {
          if (!keepOpen) this.handleCloseTooltip(e);
        },
        onClick: e => {
          keepOpen = true;
          this.handleOpenTooltip(e);
        },
      };
    }
  }

  render() {
    const { children: child } = this.props;

    return typeof child === 'string'
      ? <span { ...this.makeHandler() }>{ child }</span>
      : React.cloneElement(React.Children.only(child), this.makeHandler());
  }
}

export class _TooltipShutter extends React.Component {
  static propTypes = {
    tooltipId: T.oneOfType([T.string, T.void]),
    onToggleTooltip: T.func.isRequired,
  };

  componentDidMount() {
    document.addEventListener('click', this.handleClick);
  }

  componentWillUnmount() {
    document.removeEventListener(this.handleClick);
  }

  handleClick = e => {
    if (this.props.tooltipId) {
      this.props.onToggleTooltip(null);
    }
  }

  render() {
    return false;
  }
}

// ******* CONNECTED COMPONENTS
const tooltipSelector = createSelector(
  (state, ownProps) => state.widgets.tooltip.id === ownProps.id,
  state => state.widgets.tooltip.target,
  (show, target) => ({ show, target })
);

const targetDispatcher = (dispatch, ownProps) => ({
  onToggleTooltip: target => dispatch(toggleTooltip(ownProps.id, target)),
});

export const Tooltip = connect(tooltipSelector)(_Tooltip);

Tooltip.ALIGN = TOOLTIP_ALIGNMENT;

export const TooltipTarget = connect(null, targetDispatcher)(_TooltipTarget);

TooltipTarget.TYPE = TARGET_TYPES;

const watcherSelector = createSelector(
  state => state.widgets.tooltip.id,
  tooltipId => ({ tooltipId })
);

export const TooltipShutter = connect(watcherSelector, targetDispatcher)(_TooltipShutter);
