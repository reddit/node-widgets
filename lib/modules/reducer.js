import { TOGGLE_TOOLTIP } from './tooltip';

const DEFAULT = {
  tooltip: {
    id: null,
    target: null,
  }
};

export default (state=DEFAULT, action={}) => {
  switch(action.type) {
    case TOGGLE_TOOLTIP: {
      const { tooltipId, target } = payload;

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
    default: return state;
  }
}
