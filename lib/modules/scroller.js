import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import raf from 'raf';

const T = React.PropTypes;

const STYLE = {
  position: 'relative',
  height: '100%',
  width: '100%',
  boxSizing: 'border-box',
  overflowY: 'auto',
};

const last = arr => arr[arr.length - 1];

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
    if (nextProps !== this.props) {
      this.firedLoadMore = false;
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps !== this.props) { return true; }
    return nextState.childrenToHide !== this.state.childrenToHide;
  }

  componentWillUnmount() {
    this.recordScrollPosition();
  }

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

    return (
      <div
        style={ STYLE }
        onScroll={ this.handleScroll }
        ref={ this.restoreScrollPosition }
      >
        <div>
          { children
            .reduce((existing, child) => {
              if (childrenToHide[child.key]) {
                const height = childHeights[child.key];

                if (last(existing) && last(existing).type === 'hidden') {
                  last(existing).height += height;
                  last(existing).key += `-${child.key}`;
                  return existing;
                } else {
                  return existing.concat([{
                    height,
                    key: `hidden-${child.key}`,
                    type: 'hidden'
                  }]);
                }
              } else {
                return existing.concat([{ child, type: 'show' }]);
              }
            }, [])
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
