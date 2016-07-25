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

Create a tooltip and give it a target. Both the target and the tooltip must have the same id. If you want to auto-close tooltips when the user clicks elsewhere on the page, include the `TooltipShutter`.
```es6
import React from 'react';
import { Tooltip, TooltipTarget, TooltipShutter } from '@r/widgets/tooltip';

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
        <TooltipShutter/>
      </div>
    );
  }
}
```

And that's it! Tooltip and Target also come with a few configuration options:

**Tooltip**

0. `alignment`: One of `Tooltip.ALIGN.ABOVE`, `Tooltip.ALIGN.BELOW`, `Tooltip.ALIGN.LEFT`, `Tooltip.ALIGN.RIGHT`
0. `offset`: Number of pixels the tooltip should be separated from the target when shown.

**TooltipTarget**

0. `type`: Indicates what kind of action will trigger the tooltip. One of `TooltipTarget.TYPE.HOVER`, `TooltipTarget.TYPE.CLICK`, or `TooltipTarget.TYPE.BOTH`.

### Modal
Much like the tooltip, you need to plug in the reducer. Be sure that the reducer is named `widgets` in the store.
```es6
import widgets from '@r/widgets/reducer';
import { combineReducers } from 'redux';

const reducers = combineReducers({
  widgets,
  /* other reducers */
});
```

Create a modal and give it a target. Both the target and the modal must have the same id.
```es6
import React from 'react';
import { Modal, ModalTarget } from '@r/widgets/modal';

class Foo extends React.Component {
  render() {
    return (
      <div>
        <div>
          <ModalTarget id='test modal'>Click me!</ModalTarget>
        </div>
        <Modal
          id='test modal'
          className='TestModal' // modals come unstyled by default,
                                // so you'll want to give it a className
        >
          Hello!
        </Modal>
      </div>
    );
  }
}
```

### Scroller
The `Scroller` semi-lazily renders items, keeping the DOM from being cluttered with a large number of elements. If the scroller is given an `id`, it will save its scroll position as well.

It is highly recommended each `Scroller` instance is given a key. This ensures that each `Scroller` can operate independently of any other `Scroller`;

Any `refs` on the children are overwritten by `Scroller`, so do not expect those to be maintained.

Finally, each child in the `Scroller` MUST have a key.

```es6
  id:         <String> optional.
              if provided, the Scroller will save the last scroll position

  buffer:     <Number> optional.
              adjusts the distance above and below the Scroller viewport where
              components will still be rendered.

  loadMargin: <Number> optional.
              adjusts the distance from the bottom of the Scroller where the
              callback is fired

  onLoadMore: <Function> optional.
              called when the scroll position hits the `loadMargin`
```

Using the `Scroller`:
```es6
import React from 'react';
import Scroller from '@r/widgets/scroller';

class Foo extends React.Component {
  render() {
    return (
      <div>
        <Scroller
          id='Foo-scroller'
          key='unique-key'
        >
          { children.map(c => (
            <div key={ c.id }>{ c.title }</div>
          )) }
        </Scroller>
      </div>
    );
  }
}
```
