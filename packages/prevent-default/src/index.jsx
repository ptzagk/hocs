import React, { Component } from 'react';
import { setDisplayName, wrapDisplayName } from 'recompose';

const preventDefault = (...handlersToPrevent) => (Target) => {
  class PreventDefault extends Component {
    constructor(props, context) {
      super(props, context);

      this.handlers = handlersToPrevent.reduce((result, handlerName) => {
        if (typeof props[handlerName] === 'function') {
          result[handlerName] = (e, ...rest) => {
            if (e && typeof e.preventDefault === 'function') {
              e.preventDefault();
            }

            props[handlerName](e, ...rest);
          };
        }

        return result;
      }, {});
    }

    render() {
      return (
        <Target {...this.props} {...this.handlers}/>
      );
    }
  }

  if (process.env.NODE_ENV !== 'production') {
    return setDisplayName(wrapDisplayName(Target, 'preventDefault'))(PreventDefault);
  }

  return PreventDefault;
};

export default preventDefault;
