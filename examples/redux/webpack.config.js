const path = require('path');
const webpack = require('webpack');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'webpack-hot-middleware/client',
    './index',
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/',
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel'],
      exclude: /node_modules/,
      include: __dirname,
    }],
  },
};

const wrapperName = 'react-lego-redux';
const wrapperSrc = path.join(__dirname, wrapperName);

const legoName = 'react-lego';
const legoSrc = path.join(__dirname, '..', '..', 'src');

module.exports.resolve = {
  alias: {
    [wrapperName]: wrapperSrc,
    [legoName]: legoSrc,
  },
};

module.exports.module.loaders.push({
  test: /\.js$/,
  loaders: ['babel'],
  include: legoSrc,
});
