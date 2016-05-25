import { TOGGLE_TOOLTIP } from './tooltip';
import { SAVE_SCROLL_POSITION } from './scroller';

const DEFAULT = {
  tooltip: {
    id: null,
    target: null,
  },
  savedScrollPositions: {},
};

export default (state=DEFAULT, action={}) => {
  switch(action.type) {
    case TOGGLE_TOOLTIP: {
      const { tooltipId, target } = action.payload;

      return (tooltipId && target)
        ? {
            ...state,
            tooltip: {
              target,
              id: tooltipId,
            },
          }
        : {
            ...state,
            tooltip: {
              target: null,
              id: null,
            },
          }
    }
    case SAVE_SCROLL_POSITION: {
      const { id, scrollPosition } = action.payload;

      return {
        ...state,
        savedScrollPositions: {
          ...state.savedScrollPositions,
          [id]: scrollPosition,
        },
      };
    }
    default: return state;
  }
}
