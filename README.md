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

## API

### wrap

> ({ ... }) => ReactComponent

`wrap` 接收一个对象，并将其包装为一个 ReactComponent。

### reduce

> (fn1[, fn2]) => fn1

标记 `fn1` 为 [Reduce Function](https://github.com/sskyy/react-lego#reduce-function)。当 Reduce Function 被调用时，会尝试调用 owner 传入的同名函数，该同名函数的参数为 `fn2` 的返回值。

```jsx
// ./Input.jsx
// import ...

const onChange = reduce(
  (_, e) => ({ value: e.target.value }),
  (_, e) => e.target.value.toUpperCase()
);

function render({ props }) {
  // 调用 onChange 后，会更新 Redux 之类的 state 中的值，该值为用户输入的值。
  return <input value={props.value} onChange={props.onChange} />;
}

export default wrap({ render, onChange });

// ./App.jsx
import Input from './Input';

const log = console.log.bind(console);
// log 得到的值是经过 `fn2` 处理的值。
ReactDOM.render(<Input onChange={log} />)
```

`fn2` 的默认值为：

```js
function (_, e) {
  // To support custom element
  if (!e || !e.target) {
    return e;
  }
  const { target } = e;
  return target.type === 'checkbox' ?
    target.checked : target.value;
}
```

## Specification

依照本规范开发的组件，必须是 stateless 且所有的函数必须为 pure function。

### `render`

> ({ props, context }) => ReactElement

`render` 相当于 [React Stateless Functions](https://facebook.github.io/react/docs/reusable-components.html#stateless-functions)，不同的地方在于，第一个参数并非 `props`，而是一个包含 `props` 和 `context` 的对象。

### `propTypes`

> Object

即 React 中用于校验 `props` 的 [`propTypes`](https://facebook.github.io/react/docs/reusable-components.html#prop-validation)。

### `defaultProps`

> Object

即 React 中用于设置默认属性的 [`defaultProps`](https://facebook.github.io/react/docs/reusable-components.html#default-prop-values)。

### `contextTypes`

> Object

即 React 中的用于声明所需 `context` 的 [`contextTypes`](https://facebook.github.io/react/docs/context.html)。

### Lifecycle Function

> ({ props, context }, ...args) => nextProps

生命周期函数，与 React 中的 [Lifesycle](https://facebook.github.io/react/docs/component-specs.html#lifecycle-methods) 一致，不同的地方在与，第一个参数为包含 `props` 和 `context` 的对象，然后返回值会用于更新 `props`。

### Reduce Function

> ({ props, context }, ...args) => nextProps

传给 `wrap` 的对象中，被 `reduce` 标记过的函数将被视为 Reduce Function。

* Reduce function 的第一个参数与 `render` 一致，剩余的参数为调用这个 Reduce Function 时传入的参数。
* Reduce function 的返回值为一个对象，与外部传入的 `props` 合并后，再传给 `render`。
* Reduce function 被调用时，会尝试调用 owner 传入的同名函数。

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

## Advantages

* 可测试，所有的函数都是纯函数，只要 mock 入参并对比返回值即可。
* 易与 Redux、Mobx 等的结合，通过不同的 wrap 函数适配到不同的框架上。
* 高扩展，可以通过覆写 `render` 等函数，定制组件。

## License

MIT
