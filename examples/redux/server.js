/* eslint-disable  */
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack.config');
const Express = require('express');

const app = new Express();

const compiler = webpack(config);
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
app.use(webpackHotMiddleware(compiler));

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

app.listen(port=3000, error => {
  if (error) {
    console.error(error);
  } else {
    console.info(`==>  Listening on port ${port}. Open up http://localhost:${port}/ in your browser.`);
  }
});
