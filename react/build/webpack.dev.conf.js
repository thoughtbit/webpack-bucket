var webpack = require('webpack');
var merge = require('webpack-merge');
var baseWebpackConfig = require('./webpack.base.conf');
var config = require('../config');
var utils = require('./utils');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var WebpackNotifierPlugin = require('webpack-notifier');
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;

// hot reload
utils.hotReload(baseWebpackConfig);

module.exports = merge(baseWebpackConfig, {
  // eval-source-map is 每个模块以eval方式执行并且SourceMap以DataUrl的方式添加进eval
  // devtool: '#eval-source-map',
  devtool: '#inline-source-map',
  module: {
    loaders: utils.styleLoaders()
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    // 将jQuery全局暴露
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      // materialize-css rely on this to support velocity
      "window.jQuery": "jquery",
      _: 'lodash',
      React: 'react',
      ReactDom: 'react-dom',
      ReactDOM: 'react-dom'
    }),
    // 公用的模块分开打包
    // new CommonsChunkPlugin('vendor', 'vendor.js'),
    new CommonsChunkPlugin({ name: 'vendor' }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.template.html',
      chunks: ['app', 'vendor'],
      inject: true,
      favicon: 'favicon.ico'
    }),
    // webpack + node-notifier = build status system notifications
    new WebpackNotifierPlugin({title: '项目构建成功✈✈✈', excludeWarnings: true})
  ]
});
