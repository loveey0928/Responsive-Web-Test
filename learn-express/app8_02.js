var express = require('express'),
  http = require('http'),
  path = require('path');

var static = require('serve-static');
var router = express.Router();

var bodyParser = require('body-parser'); // POST시 필요한 부분 추출을 위함

var app = express();

app.use('/public', express.static(path.join(__dirname, 'public'))); // 미들웨어 사용

app.use(bodyParser.urlencoded({ extended: true })); // 미들웨어 사용

router.route('/process/login/:name').post(function (req, res) {
  console.log('/process/login/:name 라우팅 함수에서 받음.');

  var paramName = req.params.name;

  var paramId = req.body.id || req.query.id;
  var paramPassword = req.body.password || req.query.password;

  res.writeHead(200, { 'Content-Type': 'text/html;charset=utf8' });
  res.write('<h1>서버에서 로그인 응답</h1>');
  res.write('<div><p>' + paramName + '</p></div>');
  res.write('<div><p>' + paramId + '</p></div>');
  res.write('<div><p>' + paramPassword + '</p></div>');
  res.end();
});

app.all('*', function (req, res) {
  res.status(404).send('<h1>요청하신 페이지가 없습니다.</h1>');
});

app.use('/', router);

http.createServer(app).listen(3000, function () {
  console.log('Express 서버가 3000번 포트에서 시작됨.');
});
