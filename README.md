# r/widgets
A collection of helpful React components that can be used without much effort in a React + Redux environment

## Installation
To install, use npm:

`npm install -S @r/widgets`

You'll also need to install the peer dependencies. Ex:

`npm install -S lodash@4 react@15 react-redux@4 redux@3 reselect@2`

## Usage
### Tooltip
First, plug in the reducer. Be sure that the reducer is named `widgets` in the store.
```es6
import widgets from '@r/widgets/reducer';
import { combineReducers } from 'redux';

const reducers = combineReducers({
  widgets,
  /* other reducers */
});
```

Create a tooltip and give it a target. Both the target and the tooltip must have the same id.
```es6
import React from 'react';
import { Tooltip, TooltipTarget } from '@r/widgets/tooltip';

class Foo extends React.Component {
  render() {
    return (
      <div>
        <div>
          <TooltipTarget id='test tooltip'>Mouse over me!</Target>
        </div>
        <Tooltip
          id='test tooltip'
          alignment={ Tooltip.ALIGN.ABOVE }
        >
          Hello!
        </Tooltip>
      </div>
    );
  }
}
```

And that's it! Tooltip and Target also come with a few configuration options:

**Tooltip**

0. `alignment`: One of `Tooltip.ALIGN.ABOVE`, `Tooltip.ALIGN.BELOW`, `Tooltip.ALIGN.LEFT`, `Tooltip.ALIGN.RIGHT`
0. `offset`: Number of pixels the tooltip should be separated from the target when shown.

**Target**

0. `type`: Indicates what kind of action will trigger the tooltip. One of `Target.TYPE.HOVER`, `Target.TYPE.CLICK`, or `Target.TYPE.BOTH`.
