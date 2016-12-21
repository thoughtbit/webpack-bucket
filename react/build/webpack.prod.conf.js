var path = require('path');
var config = require('../config');
var utils = require('./utils');
var webpack = require('webpack');
var merge = require('webpack-merge');
var baseWebpackConfig = require('./webpack.base.conf');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var WebpackNotifierPlugin = require('webpack-notifier');
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
var env = process.env.NODE_ENV === 'testing' ? require('../config/test.env') : config.build.env;

module.exports = merge(baseWebpackConfig, {
  // sourceMap是发散的，和output.sourceMapFilename协调使用
  devtool: config.build.productionSourceMap ? '#source-map' : false,
  output: {
    path: config.build.assetsRoot,
    // naming output files with hashes for better caching.
    // dist/index.html will be auto-generated with correct URLs.
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
  },
  module: {
    loaders: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true
    })
  },
  plugins: [
    // 给JS定义全局flag
    new webpack.DefinePlugin({
      'process.env': env
    }),
    // 排除相似的或相同的，避免在最终生成的文件中出现重复的模块。
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      /*output: {
        comments: false
      },
      mangle: {
        except: ['$', 'exports', 'require']
      }*/
    }),
    // 按引用频度来排序 ID，以便达到减少文件大小的效果
    new webpack.optimize.OccurrenceOrderPlugin(),
    // extract css into its own file
    //new ExtractTextPlugin('[name].[contenthash].css'),
    new ExtractTextPlugin(utils.assetsPath('css/[name].[contenthash].css')),

    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /src/index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    // 可以多个
    new HtmlWebpackPlugin({
      filename: process.env.NODE_ENV === 'testing' ? 'index.html' : config.build.index,
      template: 'index.template.html',
      // template:__dirname + '/src/app.html',
      inject: 'body',
      favicon: 'favicon.ico',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: false
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency'
    }),
    // 公用的模块分开打包
    // split vendor js into its own file
    new CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module, count) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        )
      }
    }),
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    new CommonsChunkPlugin({
      name: 'manifest',
      chunks: ['vendor']
    }),
    // webpack + node-notifier = build status system notifications
    new WebpackNotifierPlugin({title: '项目构建成功✈✈✈', excludeWarnings: true})
  ]
});
