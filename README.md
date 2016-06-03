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

`wrap` 接收一个一个对象，并包装为一个 ReactComponent。

### expose

> (fn) => fn

标记一个函数是否对外暴露为一个 API：

```jsx
// ./Input.jsx
// import ...

const onChange = expose(privateOnChange);
function render({ props }) {
  return <input value={props.value} onChange={props.onChange} />;
}

export default wrap({ render, onChange });

// ./App.jsx
import Input from './Input';

const log = console.log.bind(console);
ReactDOM.render(<Input onChange={log} />)
```

使用 `expose` 包装 `privateOnChagne` 后，当 `input` 的 `onChange` 事件触发时，会先调用 `privateOnChange`，再调用外部的传入的 `log`。若不使用 `expose` 包装，则仅调用 `privateOnChange`。

### reduce

> (fn1, fn2) => fn1

`reduce` 与 `expose` 一起使用才有意义，用于简化对外暴露的 API 的参数。

```jsx
const onChange = expose(reduce(
  privateOnChange,
  // 这样包装后，`expose` 例子中的 `log` 函数会得到大写后的 `value`
  ({ props }, e) => e.target.value.toUpperCase()
));
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

## Advantages

* 可测试，所有的函数都是纯函数，只要 mock 入参并对比返回值即可。
* 易与 Redux、Mobx 等的结合，通过不同的 wrap 函数适配到不同的框架上。
* 高扩展，可以通过覆写 `render` 等函数，定制组件。

## License

MIT
