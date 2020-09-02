var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressSession = require('express-session');
var expressErrorHandler = require('express-error-handler');
var http = require('http');
//var mongodb = require('mongodb');
//var mongoose = require('mongoose');
var app = express();
//var crypto = require('crypto');
//var route_loader = require('./routes/route_loader');

//======== socket 사용 =========//
var cors = require('cors');
var socketio = require('socket.io');

// Passport
var passport = require('passport');
var flash = require('connect-flash');

app.set('port', process.env.PORT || 3000);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  expressSession({
    secret: 'my key',
    resave: true,
    saveUninitialized: true,
  })
);

//======= cors 초기화 ==========//
app.use(cors());

// Passport 사용자 설정
// app.use(passport.initialize());
// app.use(passport.session());
// app.use(flash());

// 라우터와 디비연결 및 호출 모듈화
//route_loader.init(app);

//var configPassport = require('./config/passport');
//configPassport(app, passport);

//var userPassport = require('./routes/user_passport');
//userPassport(app, passport);

// ..
var errorHandler = expressErrorHandler({
  static: {
    404: './public/html/404.html',
  },
});

app.use(expressErrorHandler.httpError(404));
app.use(errorHandler);

var server = http.createServer(app).listen(app.get('port'), function () {
  console.log('Express 서버가 ' + app.get('port') + '번 포트에서 시작됨.');
});

//===== socket.io 서버 시작 ======//
var io = socketio.listen(server);
console.log('socket.io 요청을 받아들일 준비가 되었습니다.');

io.sockets.on('connection', function (socket) {
  console.log(
    'connecion info ->' + JSON.stringify(socket.request.connection._peername)
  );

  socket.remoteAddress = socket.request.connection._peername.address;
  socket.remotePort = socket.request.connection._peername.port;
});

module.exports = app;
