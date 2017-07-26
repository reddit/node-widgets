import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

const T = PropTypes;

const STYLE_CONTAINER = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 1000,
  backgroundColor: 'rgba(0,0,0,0.4)',
};

// ******* ACTIONS
export const TOGGLE_MODAL = 'r/widgets__TOGGLE_MODAL';

export const toggleModal = id => ({
  type: TOGGLE_MODAL,
  payload: { id },
});

// ******* RAW COMPONENTS
export class _Modal extends React.Component {
  static propTypes = {
    className: T.string,
    show: T.bool,
    onToggleModal: T.func,
  };

  static defaultProps = {
    className: '',
    show: false,
    onToggleModal: () => {},
  };

  render() {
    const { className, show, children, onToggleModal } = this.props;

    if (show) {
      return (
        <div style={ STYLE_CONTAINER } onClick={ () => onToggleModal(null) }>
          <div className={ className } onClick={ e => e.stopPropagation() }>
            { children }
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}

export class _ModalTarget extends React.Component {
  static propTypes = {
    children: T.oneOfType([T.string, T.element]).isRequired,
    onToggleModal: T.func,
  };

  static defaultProps = {
    onToggleModal: () => {},
  };

  makeHandler() {
    const { onToggleModal } = this.props;

    return {
      onClick: () => onToggleModal(),
    };
  }

  render() {
    const { children: child } = this.props;
    
    return typeof child === 'string'
      ? <span { ...this.makeHandler() }>{ child }</span>
      : React.cloneElement(React.Children.only(child), this.makeHandler());
  }
}

// ******* CONNECTED COMPONENTS
const modalSelector = createSelector(
  (state, ownProps) => state.widgets.modal.id === ownProps.id,
  show => ({ show })
);

const modalDispatcher = dispatch => ({
  onToggleModal: id => dispatch(toggleModal(id)),
});

const modalTargetDispatcher = (dispatch, { id }) => ({
  onToggleModal: () => dispatch(toggleModal(id)),
});

export const Modal = connect(modalSelector, modalDispatcher)(_Modal);
export const ModalTarget = connect(null, modalTargetDispatcher)(_ModalTarget);

Modal.propTypes = {
  id: T.string.isRequired,
};

ModalTarget.propTypes = {
  id: T.string.isRequired,
};
