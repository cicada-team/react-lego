/* eslint-disable no-restricted-syntax*/
export function mapValues(obj, handler) {
  const result = {};
  Object.keys(obj).forEach(key => {
    result[key] = handler(obj[key], key);
  });
  return result;
}

export function each(obj, fn) {
  return keys(obj).forEach((k) => {
    fn(obj[k], k)
  })
}

export function pick(obj, names) {
  const output = {};

  if (typeof names === 'function') {
    for (const name in obj) {
      if (names(obj[name], name, obj)) {
        output[name] = obj[name];
      }
    }
  } else {
    names.forEach(name => {
      output[name] = obj[name];
    });
  }

  return output;
}

export function inject(fn, createArgsToInject, spread = false) {
  return (...runtimeArgs) => {
    const injectArgs = createArgsToInject(...runtimeArgs)
    return spread ? fn(...injectArgs, ...runtimeArgs) : fn(injectArgs, ...runtimeArgs)
  }
}

export function partialRight(fn, ...argv) {
  return (...rest) => fn.call(this, ...rest, ...argv)
}
