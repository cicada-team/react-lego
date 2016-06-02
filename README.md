# react-lego

Utilities to create stateless components in a declarative way, inspired by [react-future](https://github.com/reactjs/react-future/blob/master/09%20-%20Reduce%20State/01%20-%20Declarative%20Component%20Module.js).

## Usage

Installation:

```bash
npm i --save react-lego
```

And then:

```jsx
import { wrap } from 'react-lego';

export default wrap({
  render,
  propTypes,
  defaultProps,
  ...
});
```

## Specification

依照本规范开发的组件，必须是 stateless 且所有的函数必须为 pure function。

### `render`

> ({ props }) => ReactElement

`render` 相当于 [React Stateless Functions](https://facebook.github.io/react/docs/reusable-components.html#stateless-functions)，不同的地方在于，第一个参数并非 `props`，而是一个包含 `props` 的对象。这样设计是为了扩展方便，以后可能会根据需要增加 `context` 或其他属性，但现在仅提供 `props`。

### `propTypes`

> Object

即 React 中用于校验 `props` 的 [`propTypes`](https://facebook.github.io/react/docs/reusable-components.html#prop-validation)。

### `defaultProps`

> Object

即 React 中用于设置默认属性的 [`defaultProps`](https://facebook.github.io/react/docs/reusable-components.html#default-prop-values)。

### Reduce Function

> ({ props }, ...args) => nextProps

传给 `wrap` 的对象中，除了 `render` 以外的函数，视为 reduce function。

* Reduce function 的第一个参数与 `render` 一致，剩余的参数为调用这个 reduce function 时传入的参数。
* Reduce function 的返回值为一个对象，与外部传入的 `props` 合并后，再传给 `render`。

Reduce function 作为 event handler：

```jsx
// import ...

function onChange({ props }, e) {
  return {
    value: e.target.value,
  };
}

function render({ props }) {
  return <input value={props.value} onChange={props.onChange} />;
}

export default wrap({ render, onChange });
```

## License

MIT
