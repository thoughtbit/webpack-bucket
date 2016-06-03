var path = require('path')
var express = require('express')
var webpack = require('webpack')
var config = require('../config')
var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig = process.env.NODE_ENV === 'testing' ? require('./webpack.prod.conf') : require('./webpack.dev.conf')
// console.log('compiler:', webpackConfig)

// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable

var open = require("open")
var app = express()
var compiler = webpack(webpackConfig)
// serve webpack bundle output
// webpack-dev-middleware是一个处理静态资源的middleware，可以代替 webpack-dev-server，webpack-dev-server也是用它处理的。
/*
--colors 输出的结果带彩色
--progress 输出进度显示
--watch 动态实时监测依赖文件变化并且更新
--hot 是热插拔
--display-error-details 错误的时候显示更多详细错误信息
--display-modules 默认情况下 node_modules 下的模块会被隐藏，加上这个参数可以显示这些被隐藏的模块
*/
var devMiddleware = require('webpack-dev-middleware')(compiler, {
  hot: true,
  noInfo: false,
  inline: true,
  publicPath: webpackConfig.output.publicPath,
  stats: {
    colors: true,
    chunks: false,
    cached: false
  }
})


// enable hot-reload and state-preserving
// compilation error display
// 实现浏览器的无刷新更新
var hotMiddleware = require('webpack-hot-middleware')(compiler)

// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(context, options))
})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// serve pure static assets
var staticPath = path.join(config.build.assetsPublicPath, config.build.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return;
  }
  console.log('Listening at http://localhost:' + port + '\n')
})

open('http://localhost:' + port, 'FireFox')
