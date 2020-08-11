var express = require('express'),
  http = require('http'),
  path = require('path');

var static = require('serve-static');
var router = express.Router();

var bodyParser = require('body-parser'); // POST시 필요한 부분 추출을 위함

var app = express();

app.use('/public', express.static(path.join(__dirname, 'public'))); // 미들웨어 사용

app.use(bodyParser.urlencoded({ extended: true })); // 미들웨어 사용

router.route('/process/login').post(function (req, res) {
  console.log('/process/login 라우팅 함수에서 받음.');

  var paramId = req.body.id || req.query.id;
  var paramPassword = req.body.password || req.query.password;

  res.writeHead(200, { 'Content-Type': 'text/html;charset=utf8' });
  res.write('<h1>서버에서 로그인 응답</h1>');
  res.write('<div><p>' + paramId + '</p></div>');
  res.write('<div><p>' + paramPassword + '</p></div>');
  res.end();
});

app.use('/', router);

// app.use(function (req, res, next) {
//   console.log('첫 번째 미들웨어에서 요청을 처리함.');

//   var paramId = req.param('id');
//   var paramPassword = req.param('password');

//   res.writeHead('200', { 'Content-Type': 'text/html;charset=utf8' });
//   res.write('<h1>Express 서버에서 응답한 결과입니다.</h1>');
//   res.write('<div><p>Param id : ' + paramId + '</p></div>');
//   res.write('<div><p>Param password : ' + paramPassword + '</p></div>');
//   res.end();
// });

// app.post('/process/login', function (req, res) {
//   console.log('/process/login 처리함.');

//   var paramId = req.param('id');
//   var paramPassword = req.param('password');

//   res.writeHead('200', { 'Content-Type': 'text/html;charset=utf8' });
//   res.write('<h1>Express 서버에서 응답한 결과입니다.</h1>');
//   res.write('<div><p>Param id : ' + paramId + '</p></div>');
//   res.write('<div><p>Param password : ' + paramPassword + '</p></div>');
//   res.write("<br><br><a href='/login2.html'>로그인 페이지로 돌아가기</a>");
//   res.end();
// });

http.createServer(app).listen(3000, function () {
  console.log('Express 서버가 3000번 포트에서 시작됨.');
});
