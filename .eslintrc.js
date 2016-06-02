'use strict';

module.exports = {
  extends: 'eslint-config-airbnb',
  env: {
    browser: true,
    node: true,
    mocha: true,
    es6: true,
  },
  parserOptions: {
    ecmaVersion: 6,
    ecmaFeatures: {
      jsx: true,
      experimentalObjectRestSpread: true,
    },
  },
  plugins: [
    'react',
    'babel',
  ],
};
