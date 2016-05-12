import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { values } from 'lodash/object';

const T = React.PropTypes;

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
  const { offsetLeft, offsetTop, clientWidth, clientHeight, outerWidth } = target;
  const elementHeight = element.clientHeight;
  const elementWidth = element.offsetWidth;

  let top = offsetTop;
  let left = offsetLeft;
  let marginTop = null;
  let marginLeft = null;

  switch (alignment) {
    case TOOLTIP_ALIGNMENT.LEFT:
      top += (clientHeight / 2);
      top -= (elementHeight / 2);
      marginLeft = -offset - elementWidth;
      break;
    case TOOLTIP_ALIGNMENT.RIGHT:
      top += (clientHeight / 2);
      top -= (elementHeight / 2);
      left += clientWidth;
      marginLeft = offset;
      break;
    case TOOLTIP_ALIGNMENT.ABOVE:
      left += (clientWidth / 2);
      left -= (elementWidth / 2);
      marginTop = -offset - elementHeight;
      break;
    case TOOLTIP_ALIGNMENT.BELOW:
      top += clientHeight;
      left += (clientWidth / 2);
      left -= (elementWidth / 2);
      marginTop = offset;
      break
  }

  return { top, left, marginTop, marginLeft };
};

const positionTooltip = (element, target, alignment, offset) => {
  if (element) {
    const { top, left, marginTop, marginLeft } = getPositions(element, target, alignment, offset);

    element.style.top = top;
    element.style.left = left;
    element.style.marginTop = marginTop;
    element.style.marginLeft = marginLeft;

    if ((alignment === TOOLTIP_ALIGNMENT.ABOVE || alignment === TOOLTIP_ALIGNMENT.BELOW) &&
        (typeof self !== undefined) &&
        (element.offsetWidth > self.innerWidth)) {
      element.style.left = offset;
      element.style.right = offset;
      element.style.width = 'auto';
    }
  }
};

const positionArrow = (element, target, alignment, offset, inner) => {
  if (element) {
    element.style.position = 'fixed';
    element.style.width = 0;
    element.style.height = 0;
    element.style.zIndex = 1001;

    const { top, left, marginTop, marginLeft } = getPositions(element, target, alignment, offset);
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
        element.style.top = top + size - 1;
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
        element.style.left = left + size - 1;
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

    if (show) {
      return (
        <div
          className={ className }
          style={ STYLE }
          ref={ x => positionTooltip(x, target, alignment, offset) }
          onClick={ e => e.stopPropagation() }
        >
          <div ref={ x => positionArrow(x, target, alignment, offset, false) }/>
          <div ref={ x => positionArrow(x, target, alignment, offset, true) }/>
          { children }
        </div>
      )
    } else {
      return null;
    }
  }
};

export class _TooltipTarget extends React.Component {
  static propTypes = {
    id: T.string.isRequired,
    type: T.oneOf(values(TARGET_TYPES)),
    onToggleTooltip: T.func,
  };

  static defaultProps = {
    type: TARGET_TYPES.HOVER,
    onToggleTooltip: () => {},
  };

  handleOpenTooltip = e => {
    e.stopPropagation();
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
    const { inline, type, children } = this.props;

    if (typeof children === 'array') {
      throw new Error('Tooltip target can only have one child');
    } else if (typeof children === 'string') {
      return <span {...this.makeHandler()}>{ children }</span>;
    } else {
      return React.cloneElement(children, this.makeHandler());
    }
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
