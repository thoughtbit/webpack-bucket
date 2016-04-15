var path = require('path');
var config = require('../config');
var webpack = require('webpack');
// webpack 配置文件的配置合并
var merge = require('webpack-merge');
var baseWebpackConfig = require('./webpack.base.conf');
var cssLoaders = require('./css-loaders');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

//var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;

module.exports = merge(baseWebpackConfig, {
  // sourceMap是发散的，和output.sourceMapFilename协调使用
  devtool: config.build.productionSourceMap ? '#source-map' : false,
  output: {
    path: config.build.assetsRoot,
    // naming output files with hashes for better caching.
    // dist/index.html will be auto-generated with correct URLs.
    filename: path.join(config.build.assetsSubDirectory, '[name].[chunkhash].js'),
    chunkFilename: path.join(config.build.assetsSubDirectory, '[id].[chunkhash].js')
  },
  module: {
    loaders: cssLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true
    })
  },
  plugins: [
    // 给JS定义全局flag
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    // 排除相似的或相同的，避免在最终生成的文件中出现重复的模块。
    //new webpack.optimize.DedupePlugin(),
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
    // 公用的模块分开打包
    /*
    new CommonsChunkPlugin('vendor', 'vendor.js'),
    new CommonsChunkPlugin({
      name: 'admin-commons',
      chunks: ['ap1', 'ap2']
    }),
    new CommonsChunkPlugin({
      name: 'commons',
      chunks: ['p1', 'p2', 'admin-commons.js'],
      minChunks: 2
    }),
    new CommonsChunkPlugin({
      name: 'c-commons',
      chunks: ['p3', 'ap3']
    }),
    new CommonsChunkPlugin({
      name: 'all-commons',
      chunks: ['commons.js', 'c-commons.js']
    }),
    */
    // 按引用频度来排序 ID，以便达到减少文件大小的效果
    new webpack.optimize.OccurenceOrderPlugin(),
    // extract css into its own file
    //new ExtractTextPlugin('[name].[contenthash].css'),
    new ExtractTextPlugin(path.join(config.build.assetsSubDirectory, '[name].[contenthash].css')),
    
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /src/index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    // 可以多个
    new HtmlWebpackPlugin({
      filename: process.env.NODE_ENV === 'testing' ? 'index.html' : config.build.index,
      template: 'src/index.html',
      /*template:__dirname + '/src/app.html'*/
      /*chunks: ['app', 'vendor', 'all-commons'],*/
      inject: 'body',
      favicon: 'src/favicon.ico',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: false
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      }
    })
  ]
});
