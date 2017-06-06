const webpack = require('webpack')
module.exports = {
  entry: {
    basic: './examples/basic/index.js',
    wrapper: './examples/wrapper/index.js',
  },
  output: {
    filename: '[name].js',
    publicPath: '/examples/'
  },
  module: {
    rules: [
      { test: /\.js?$/, exclude: /node_modules/, loader: 'babel-loader' },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ]
}
