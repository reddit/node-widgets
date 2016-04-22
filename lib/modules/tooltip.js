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

// ******* ACTIONS
export const TOGGLE_TOOLTIP = 'r/widgets__TOGGLE_TOOLTIP';

export const toggleTooltip = (tooltipId, target) => ({
  type: TOGGLE_TOOLTIP,
  payload: { tooltipId, target },
});

// ******* REDUCER
export const reducer = (state={ openedTooltip: null, target: null }, action={}) => {
  switch(action.type) {
    case TOGGLE_TOOLTIP: {
      const { tooltipId, target } = payload;

      return (tooltipId && target)
        ? { target, openedTooltip: tooltipId }
        : { openedTooltip: null, target: null };
    }
    default: return state;
  }
}

// ******* RAW COMPONENTS
export class _Tooltip extends React.Component {
  static propTypes = {
    id: T.string.isRequired,
    alignment: T.oneOf(values(TOOLTIP_ALIGNMENT)).isRequired,
    show: T.bool,
    target: T.object,
    offset: T.number,
  };

  static defaultProps = {
    show: false,
    offset: DEFAULT_OFFSET,
  };

  render() {
    const { target, show, alignment, offset, children } = this.props;

    if (show) {
      return (
        <div className='r-Tooltip'>
          { children }
        </div>
      )
    } else {
      return null;
    }
  }
};

export class _Target extends React.Component {
  static propTypes = {
    id: T.string.isRequired,
    inline: T.bool,
    type: T.oneOf(values(TARGET_TYPES)),
    onToggleTooltip: T.func,
  };

  static defaultProps = {
    inline: false,
    type: Target.HOVER,
    onToggleTooltip: () => {},
  };

  handleOpenTooltip = e => {
    this.props.onToggleTooltip(this.props.id, e.target);
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
    const style = inline ? { display: 'inline-block' } : null;

    return (
      <div style={style} {...this.makeHandler()}>
        { children }
      </div>
    )
  }
}

// ******* CONNECTED COMPONENTS
const tooltipSelector = createSelector(
  state => state.tooltip.openedTooltip,
  state => state.tooltip.target,
  (tooltipId, target) => ({ tooltipId, target })
);

const mergeTooltipProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  target: stateProps.target,
  show: ownProps.id === stateProps.tooltipId,
});

export const Tooltip = connect(tooltipSelector, null, mergeTooltipProps)(_Tooltip);

Tooltip.ALIGN = TOOLTIP_ALIGNMENT;

const targetDispatcher = dispatch => ({
  onToggleTooltip: (id, target) => dispatch(toggleTooltip(id, target)),
});

export const Target = connect(null, targetDispatcher)(_Target);

Target.TYPE = TARGET_TYPES;
