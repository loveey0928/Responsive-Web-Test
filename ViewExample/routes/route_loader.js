var route_loader = {};
var config = require('../config');
var database = require('../database/database');

route_loader.init = function (app, router) {
  console.log('route_loader.init 호출됨.');
  initRoutes(app, router);
};

function initRoutes(app, router) {
  console.log('initRoutes 호출됨.');
  console.log('설정에 정의된 라우팅 모듈의 수 : %d', config.route_info.length);

  app.get('/capkum', function (req, res, next) {
    console.log('첫 번째 미들웨어에서 요청 처리함 ');
    res.writeHead('200', {
      'Content-Type': 'text/html;charset=utf8',
    });
    res.end('<h1> Express서버 응답 결과 </h1>');
  });

  for (var i = 0; i < config.route_info.length; i++) {
    var curItem = config.route_info[i];
    var curModule = require(curItem.file);

    if (curItem.type == 'get') {
      router.route(curItem.path).get(curModule[curItem.method]);
    } else if (curItem.type == 'post') {
      router.route(curItem.path).get(curModule[curItem.method]);
    } else {
      console.error('라우팅 함수의 타입을 알 수 없습니다. : ', curItem.type);
    }
  }

  app.use('/', router);
}

module.exports = route_loader;
