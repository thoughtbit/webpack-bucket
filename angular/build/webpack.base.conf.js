var path = require('path');
var config = require('../config');
var autoprefixer = require('autoprefixer-core');
var projectRoot = path.resolve(__dirname, '../');

module.exports = {
  entry: {
    app: './src/main.js'
  },
  output: {
    path: config.build.assetsRoot,
    publicPath: config.build.assetsPublicPath,
    filename: '[name].js'
  },
  resolve: {
    // 自动扩展文件后缀名，意味着我们require模块可以省略不写后缀名
    extensions: ['', '.js', 'css', 'less', 'scss'],
    fallback: [path.join(__dirname, '../node_modules')],
    // 模块别名定义，方便后续直接引用别名
    alias: {
      'src': path.resolve(__dirname, '../src'),
      'assets': path.resolve(__dirname, '../src/assets')
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
        loader: 'ngtemplate?relativeTo=' + path.resolve(__dirname) + '!html',
        exclude: /index\.template\.html/
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: path.join(config.build.assetsSubDirectory, '[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.raw\.html$/,
        loader: 'html'
      }
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
};
