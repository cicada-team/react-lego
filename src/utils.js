/* eslint-disable no-restricted-syntax*/

export function mapValues(obj, handler) {
  const result = {};
  Object.keys(obj).forEach(key => {
    result[key] = handler(obj[key], key);
  });
  return result;
}

export function pick(obj, names) {
  const output = {};

  if (typeof names === 'function') {
    for (const name in obj) {
      if (names(obj[name], name)) {
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
