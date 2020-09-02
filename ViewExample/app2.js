var express = require('express');
var path = require('path');
var http = require('http');
var favicon = require('serve-favicon');
var static = require('serve-static');

var logger = require('morgan');

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressSession = require('express-session');

// 에러 핸들러 모듈 사용
var expressErrorHandler = require('express-error-handler');

// 암호화 모듈
var crypto = require('crypto');

////var route_loader = require('./routes/route_loader');
var config = require('./config');

var user = require('./routes/user');

var database_loader = require('./database/database_loader');
var route_loader = require('./routes/route_loader');

function createUserSchema(database) {
  database.UserSchema = require('./database/user_schema').createSchema(
    mongoose
  );

  database.UserModel = mongoose.model('users3', database.UserSchema);
  console.log('UserModel 정의함');
}

var app = express();

//=== 서버 변수 설정 및 static으로 [public] 폴더 설정 ===//
console.log('config.server_port:%d', config.server_port);
app.set('port', config.server_port || 3000);

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

route_loader.init(app, express.Router());

var errorHandler = expressErrorHandler({
  static: {
    404: './public/html/404.html',
  },
});

app.use(expressErrorHandler.httpError(404));
app.use(errorHandler);

var server = http.createServer(app).listen(app.get('port'), function () {
  console.log('Express 서버가' + app.get('port') + '번 포트에서 시작됨.');

  database_loader.init(app, config);
});

module.exports = app;
