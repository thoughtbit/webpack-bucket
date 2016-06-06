var path = require('path')
var config = require('../config')
var utils = require('./utils')
var autoprefixer = require('autoprefixer-core')
var projectRoot = path.resolve(__dirname, '../')

module.exports = {
  entry: {
    app: './src/main',
    vendor: [
      'angular',
      'angular-ui-router',
      'oclazyload',
      'jquery',
      'lodash'
    ],
    p1: './src/page-a',
    p2: './src/page-b',
    p3: './src/page-c',
    ap1: './src/admin-page-a',
    ap2: './src/admin-page-b'
  },
  output: {
    path: config.build.assetsRoot,
    publicPath: config.build.assetsPublicPath,
    filename: '[name].js'
  },
  resolve: {
    // 自动扩展文件后缀名，意味着我们require模块可以省略不写后缀名
    extensions: ['', '.js'],
    fallback: [path.join(__dirname, '../node_modules')],
    // 模块别名定义，方便后续直接引用别名
    alias: {
      'src': path.resolve(__dirname, '../src'),
      'assets': path.resolve(__dirname, '../assets'),
      'components': path.resolve(__dirname, '../src/components')
    }
  },
  resolveLoader: {
    fallback: [path.join(__dirname, '../node_modules')]
  },
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loader: 'eslint',
        include: projectRoot,
        exclude: /node_modules|bower_components/
      }
    ],
    loaders: [
      {
        test: /\.js$/,
        loader: 'ng-annotate!babel',
        include: projectRoot,
        exclude: /node_modules|bower_components/
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.html$/,
        loader: 'ngtemplate?relativeTo=' + (path.resolve(__dirname, '../src/')) + '/!html',
        exclude: /index\.template\.html/
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
        test: /\.html$/,
        loader: 'raw'
      }*/
    ]
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
