import React from 'react';
import PropTypes from 'prop-types';
import raf from 'raf';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { debounce } from 'lodash/function';

const T = PropTypes;

const STYLE = {
  position: 'relative',
  height: '100%',
  width: '100%',
  boxSizing: 'border-box',
  overflowY: 'auto',
};

export class Scroller extends React.Component {
  static propTypes = {
    children: T.arrayOf(T.element).isRequired,
    id: T.string,
    buffer: T.number,
    loadMargin: T.number,
    savedScrollPosition: T.number,
    onLoadMore: T.func,
    onSaveScrollPosition: T.func,
  };

  static defaultProps = {
    buffer: 500,
    savedScrollPosition: 0,
    onLoadMore: () => {},
    onSaveScrollPosition: () => {},
  };

  constructor(props) {
    super(props);

    this.state = {
      childrenToHide: {},
      childHeights: {},
      childPositions: {},
      currentScrollPosition: props.savedScrollPosition,
    };

    this.firedLoadMore = false;
  }

  componentWillReceiveProps(nextProps) {
    // compare the keys of the children. if either the order or the number don't
    // match, this indicates that a potential 'loadMore' occured, so we need to
    // reset our flag.
    const currentChildren = this.props.children.map(c => c.key).join('.');
    const newChildren = nextProps.children.map(c => c.key).join('.');

    if (currentChildren !== newChildren) {
      this.firedLoadMore = false;
    }
  }

  componentDidMount() {
    self.addEventListener('resize', this.resetValues);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps !== this.props) { return true; }
    return nextState.childrenToHide !== this.state.childrenToHide;
  }

  componentWillUnmount() {
    this.recordScrollPosition();
    self.removeEventListener('resize', this.resetValues);
  }

  _resetValues = () => {
    this.setState({
      childrenToHide: {},
      childHeights: {},
      childPositions: {},
    });
  }

  resetValues = debounce(this._resetValues, 250);

  recordScrollPosition = () => {
    const { id, onSaveScrollPosition } = this.props;
    const { currentScrollPosition } = this.state;
    onSaveScrollPosition(currentScrollPosition);
  }

  restoreScrollPosition = el => {
    if (el) {
      const { currentScrollPosition } = this.state;
      el.scrollTop = currentScrollPosition;
    }
  }

  setItem = (item, key) => {
    const { childHeights, childPositions } = this.state;

    if (item) {
      if (!childHeights[key]) {
        const { offsetTop, clientHeight } = item;

        this.setState({
          childHeights: { ...this.state.childHeights, [key]: clientHeight },
          childPositions: { ...this.state.childPositions, [key]: offsetTop },
        });
      }
    }
  }

  handleScroll = e => {
    const { buffer, loadMargin, onLoadMore, children } = this.props;
    const scrollTop = e.currentTarget.scrollTop;
    const containerHeight = e.currentTarget.clientHeight;
    const contentHeight = e.currentTarget.firstChild.clientHeight;

    raf(() => {
      if ((scrollTop + containerHeight) > (contentHeight - loadMargin)) {
        if (!this.firedLoadMore) {
          this.firedLoadMore = true;
          onLoadMore();
        }
      }

      // mutate for faster perf
      const childrenToHide = {};
      for (let k in this.state.childPositions) {
        const pos = this.state.childPositions[k];
        const h = this.state.childHeights[k];

        if ((pos + h) < (scrollTop - buffer)) {
          childrenToHide[k] = 'before';
        } else if (pos > (scrollTop + containerHeight + buffer)) {
          childrenToHide[k] = 'after';
        }
      }

      this.setState({
        childrenToHide,
        currentScrollPosition: scrollTop,
      });
    });
  }

  render() {
    const { children } = this.props;
    const { childrenToHide, childHeights } = this.state;
    const renderableChildren = children.filter(child => !childrenToHide[child.key]);

    // mutate for faster perf
    const childrenProperties = [];
    let lastChildProperty = null;
    children.forEach(child => {
      if (childrenToHide[child.key]) {
        const height = childHeights[child.key];

        if (lastChildProperty && lastChildProperty.type === 'hidden') {
          lastChildProperty.height += height;
          lastChildProperty.key += `-${child.key}`;
        } else {
          lastChildProperty = {
            height,
            key: `hidden-${child.key}`,
            type: 'hidden'
          };
          childrenProperties.push(lastChildProperty);
        }
      } else {
        lastChildProperty = { child, type: 'show' };
        childrenProperties.push(lastChildProperty);
      }
    });

    return (
      <div
        style={ STYLE }
        onScroll={ this.handleScroll }
        ref={ this.restoreScrollPosition }
      >
        <div>
          { childrenProperties
            .map(data => {
              if (data.type === 'hidden') {
                return (
                  <div
                    key={ data.key }
                    style={ { height: data.height } }
                  />
                );
              } else {
                return React.cloneElement(data.child, {
                  ref: el => raf(() => this.setItem(el, data.child.key)),
                });
              }
            }) }
        </div>
      </div>
    );
  }
}

export const SAVE_SCROLL_POSITION = 'r/widgets__SAVE_SCROLL_POSITION';
export const saveScrollPosition = (id, scrollPosition) => ({
  type: SAVE_SCROLL_POSITION,
  payload: { id, scrollPosition },
});

const selector = createSelector(
  (state, ownProps) => state.widgets.savedScrollPositions[ownProps.id],
  (savedScrollPosition) => ({ savedScrollPosition })
);

const dispatcher = (dispatch, ownProps) => ({
  onSaveScrollPosition: scrollPosition => ownProps.id && dispatch(saveScrollPosition(ownProps.id, scrollPosition)),
});

export default connect(selector, dispatcher)(Scroller);
