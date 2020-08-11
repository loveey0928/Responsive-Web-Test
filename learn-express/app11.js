var express = require('express'),
  http = require('http'),
  path = require('path');

var static = require('serve-static');
var router = express.Router();

var bodyParser = require('body-parser'); // POST시 필요한 부분 추출을 위함

var cookieParser = require('cookie-parser');

var app = express();

// app.set('port', process.env.PORT || 3000);

app.use('/public', express.static(path.join(__dirname, 'public'))); // 미들웨어 사용

app.use(bodyParser.urlencoded({ extended: true })); // 미들웨어 사용

app.use(cookieParser());

router.route('/process/setUserCookie').get(function (req, res) {
  console.log('/process/setUserCookie 라우팅 함수 호출됨.');

  res.cookie('user', {
    id: 'mike',
    name: '소녀시대',
    authorized: true,
  });

  res.redirect('/process/showCookie');
});

router.route('/process/showCookie').get(function (req, res) {
  console.log('/process/showCookes 라우팅 함수 호출됨.');

  res.send(req.cookies);
});

app.use('/', router);

app.all('*', function (req, res) {
  res.status(404).send('<h1>요청하신 페이지가 없습니다.</h1>');
});

http.createServer(app).listen(3000, function () {
  console.log('Express 서버가 3000번 포트에서 시작됨.');
});
