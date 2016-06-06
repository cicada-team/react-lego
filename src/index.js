/* eslint-disable no-param-reassign */

import React from 'react';
import * as utils from './utils';

export const ReactComponentFunctionNames = ['render'];

function defaultReduceFn(_, e) {
  // support custom element
  if (!e || !e.target) {
    return e;
  }
  const { target } = e;
  return target.type === 'checkbox' ?
    target.checked : target.value;
}

export function pickReduceFunctions(DeclarativeComponent) {
  return utils.pick(
    DeclarativeComponent,
    (item, name) => (typeof item === 'function') && ReactComponentFunctionNames.indexOf(name) === -1
  );
}

export function wrap(DeclarativeComponent) {
  const {
    propTypes = {},
    defaultProps = {},
    initialize = () => ({}),
    render,
  } = DeclarativeComponent;

  const reduceFunctions = pickReduceFunctions(DeclarativeComponent);

  class LegoWrapper extends React.Component {
    constructor(props) {
      super(props);

      this.ctx = {
        instance: initialize(),
      };

      this.state = defaultProps;
    }

    render() {
      const reduceFunctionsAsProps = utils.mapValues(
        reduceFunctions,
        (fn, name) => (...args) => {
          const newState = fn({
            ...this.ctx,
            props: { ...this.state, ...this.props },
          }, ...args);
          this.setState(newState);

          if (fn.expose === true && this.props[name] !== undefined) {
            // TODO add picker
            const reduceFn = fn.reduce || defaultReduceFn;
            this.props[name](reduceFn({
              ...this.ctx,
              props: newState,
            }, ...args));
          }
        }
      );

      const props = {
        ...this.state,
        ...this.props,
        ...reduceFunctionsAsProps,
        children: this.props.children,
      };
      return render({
        ...this.ctx,
        props,
      });
    }
  }
  LegoWrapper.propTypes = propTypes;

  return LegoWrapper;
}

export function expose(fn) {
  fn.expose = true;
  return fn;
}

export function reduce(fn, reduceFn) {
  fn.reduce = reduceFn;
  return fn;
}

