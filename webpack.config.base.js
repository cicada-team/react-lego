'use strict';

const moduleName = require('./package.json').name

module.exports = {
  module: {
    loaders: [
      { test: /\.js$/, loaders: ['babel-loader'], exclude: /node_modules/ }
    ]
  },
  output: {
    library: moduleName,
    libraryTarget: 'umd'
  },
  resolve: {
    extensions: ['', '.js']
  }
};
