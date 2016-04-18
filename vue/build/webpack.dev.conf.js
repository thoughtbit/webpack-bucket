var webpack = require('webpack');
var merge = require('webpack-merge');
var baseWebpackConfig = require('./webpack.base.conf');
var hotReload = require('./hot-reload');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
var CopyWebpackPlugin = require('copy-webpack-plugin');

// hot reload
hotReload(baseWebpackConfig);

module.exports = merge(baseWebpackConfig, {
  // eval-source-map is 每个模块以eval方式执行并且SourceMap以DataUrl的方式添加进eval
  devtool: '#eval-source-map',
  plugins: [
    // 将jQuery全局暴露
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      // materialize-css rely on this to support velocity
      "window.jQuery": "jquery",
      _: 'lodash'
    }),
    // 公用的模块分开打包
    // new CommonsChunkPlugin('vendor', 'vendor.js'),
    new CommonsChunkPlugin({ name: 'vendor' }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.template.html',
      chunks: ['app', 'vendor'],
      inject: 'body',
      favicon: 'favicon.ico'
    }),
    // copy指定文件到指定路径
    // https://www.npmjs.com/package/copy-webpack-plugin
    new CopyWebpackPlugin([
      { from: 'src/assets/images/', to: 'static/images/'},
      /*{ from: 'src/assets/fonts/', to: 'static/fonts/'}*/
    ])
  ]
});
