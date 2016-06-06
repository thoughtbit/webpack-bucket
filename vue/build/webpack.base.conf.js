var path = require('path');
var config = require('../config')
var utils = require('./utils')
var autoprefixer = require('autoprefixer-core');
var projectRoot = path.resolve(__dirname, '../');

module.exports = {
  entry: {
    app: './src/main',
    vendor: [
      'vue',
      'vue-router',
      'vue-resource',
      'jquery',
      'lodash'
    ]
  },
  output: {
    path: config.build.assetsRoot,
    publicPath: config.build.assetsPublicPath,
    filename: '[name].js'
  },
  resolve: {
    // 自动扩展文件后缀名，意味着我们require模块可以省略不写后缀名
    extensions: ['', '.js', '.vue'],
    fallback: [path.join(__dirname, '../node_modules')],
    // 模块别名定义，方便后续直接引用别名
    alias: {
      'src': path.resolve(__dirname, '../src'),
      'assets': path.resolve(__dirname, '../src/assets'),
      'components': path.resolve(__dirname, '../src/components')
    }
  },
  resolveLoader: {
    fallback: [path.join(__dirname, '../node_modules')]
  },
  module: {
    preLoaders: [
      {
        test: /\.vue$/,
        loader: 'eslint',
        include: projectRoot,
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        loader: 'eslint',
        include: projectRoot,
        exclude: /node_modules|bower_components/
      }
    ],
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.js$/,
        loader: 'babel',
        include: projectRoot,
        exclude: /node_modules|bower_components/
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.html$/,
        loader: 'vue-html'
      },
      {
        test: /\.(woff|woff2|ttf|eot|svg)$/,
        loader: 'url',
        query: {
          name: utils.assetsPath('assets/fonts/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loaders: [
          'url?limit=10000&name=' + utils.assetsPath('assets/images/[name].[hash:7].[ext]'),
          'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
        ]
      }
      /*
      {
        test: /\.(png|jpe?g|gif|svg|woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: path.join(config.build.assetsSubDirectory, '[name].[hash:7].[ext]')
        }
      },*/
    ]
  },
  vue: {
    loaders: utils.cssLoaders()
  },
  postcss: [
    autoprefixer({
      browsers: ['last 2 version']
    })
  ],
  eslint: {
    formatter: require('eslint-friendly-formatter')
  }
}
