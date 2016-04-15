/**
 * ============================================================
 *  node server.js or npm run start
 * ============================================================
 */
var path = require('path');
var jsonServer = require('json-server');
var open = require("open");
var server = jsonServer.create();


var faker = require("faker");
var _ = require("lodash");


// Set default middlewares (logger, static, cors and no-cache)
server.use(jsonServer.defaults());

// Add custom routes
/*server.get('/custom', function (req, res) {
    res.json({
        msg: 'hello'
    });
});*/
var json = {
  people: _.times(100, function(n) {
    return {
      id: n,
      name: faker.name.findName(),
      avatar: faker.internet.avatar()
    }
  })
};
server.get('/custom', function (req, res) {
    res.json(json);
});

server.get('/jsonp', function (req, res) {
    res.jsonp({
        body: res.locals.data
    });
});

// Add this before server.use(router)
// http://localhost:9001/blog/posts/2/show
server.use(jsonServer.rewriter({
  '/api/': '/',
  '/blog/:resource/:id/show': '/:resource/:id'
}));

// Returns an Express router
var router = jsonServer.router(path.resolve(__dirname, 'db.json'));
server.use(router);
server.listen(9001, 'localhost', function (err) {
  if (err) {
    console.log(err);
    return;
  }
  console.log('Listening at http://localhost:9001');
});

open("http://localhost:9001", "firefox");


/**
 * ============================================================
 * [exports description]
 * ============================================================
 */
/*module.exports = function () {
    var Mock = require("mockjs");
    var Random = Mock.Random;
    Random.cname();
    var data = Mock.mock({
        // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
        'people|1-10': [{
            // 属性 id 是一个自增数，起始值为 1，每次增 1
            'id|+1': 1,
            'name':'@cname()',
            'avatar': '@url()'
        }]
    });

    // 输出结果
    //console.log(JSON.stringify(data, null, 4))
    return data;
}*/

/**
 * ============================================================
 * [exports description]
 * ============================================================
 */
/*module.exports = function () {
    var faker = require("faker");
    var _ = require("lodash");
    return {
        people: _.times(10, function (n) {
            return {
                id: n,
                name: faker.name.findName(),
                avatar: faker.internet.avatar()
            }
        })
    }
}*/


/**
 * ============================================================
 * [exports description]
 * ============================================================
 */
/*module.exports = function() {
    var data = { users: [] }
    // Create 1000 users
    for (var i = 0; i < 1000; i++) {
        data.users.push({ id: i, name: 'user' + i })
    }
    return data
}*/
