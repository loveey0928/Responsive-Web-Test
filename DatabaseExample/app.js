var createError = require('http-errors');
var express = require('express');
var path = require('path'); // http 모듈과 함께 패스 문자열을 다루는 모듈
var cookieParser = require('cookie-parser'); // 쿠키와 세션을 다룸
var logger = require('morgan');
var http = require('http');
var bodyParser = require('body-parser'); // Post 요청 처리
var expressSession = require('express-session');
var expressErrorHandler = require('express-error-handler');
var assert = require('assert');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var connect = require('./schemas/index');

// var mongodb = require('mongodb');
var MongoClient = require('mongodb').MongoClient;

//===============데이터 베이스 연결=========================
// var database;
// let db;
// function connectDB() {
//   var databaseUrl = 'mongodb://localhost:27017/'; //27017

//   MongoClient.connect(
//     databaseUrl,
//     {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     },
//     function (err, client) {
//       if (err) {
//         console.log('데이터베이스 연결 에러 발생');
//         return;
//       }

//       console.log('데이터베이스에 연결되었습니다 : ' + databaseUrl);

//       database = client.db('com');
//     }
//   );
// }
//=================================================================================

// var url = 'mongodb://localhost:27017/';

// MongoClient.connect(
//   'mongodb://localhost:27017',
//   { useUnifiedTopology: true },
//   function (err, client) {
//     var db = client.db('shopping');
//     assert.equal(null, err);
//     console.log('Connected successfully to server');

//     res = db.collection('users').find();
//     res.toArray(function (err, docs) {
//       assert.equal(err, null);
//       console.log(docs);
//     });
//     client.close();
//   }
// );
//=================================================================================

var app = express();

connect();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');// app.set('view engine', 'pug');
app.set('port', process.env.PORT || 3000);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/public', express.static(path.join(__dirname, 'public'))); // public 폴더 open
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // uploads 폴더 open

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cookieParser());

app.use(
  expressSession({
    secret: 'my key',
    resave: true,
    saveUninitialized: true,
  })
);

var router = express.Router();

router.route('/process/login').post(function (req, res) {
  console.log('/process/login 라우팅 함수 호출됨.');

  var paramId = req.body.id || req.query.id;
  var paramPassword = req.body.password || req.query.password;
  console.log('요청 파라미터 :' + paramId + ',' + paramPassword);

  if (database) {
    authUser(database, paramId, paramPassword, function (err, docs) {
      if (err) {
        console.log('에러 발생.');
        res.writeHead(200, { 'Content-Type': 'text/html;charset=utf8' });
        res.write('<h1>에러 발생<h1>');
        res.end();
      }

      if (docs) {
        console.dir(docs);
        res.writeHead(200, { 'Content-Type': 'text/html;charset=utf8' });
        res.write('<h1>사용자 로그인 성공<h1>');
        res.write('<div><p>사용자 : ' + docs[0].name + '</p></div>');
        res.write('<br><br><a href="/public/login.html">다시 로그인 하기</a>');
        res.end();
      } else {
        console.log('에러 발생.');
        res.writeHead(200, { 'Content-Type': 'text/html;charset=utf8' });
        res.write('<h1>사용자 데이터 조회 안됨 <h1>');
        res.end();
      }
    });
  } else {
    console.log('에러 발생.');
    res.writeHead(200, { 'Content-Type': 'text/html;charset=utf8' });
    res.write('<h1>데이터베이스 연결 안됨 </h1>');
    res.end();
  }
});

app.use('/', indexRouter);
//app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.use('/', router);

var authUser = function (db, id, password, callback) {
  console.log('authUser 호출됨');

  var users = db.collection('users');

  users.find({ id: id, password: password }).toArray(function (err, docs) {
    if (err) {
      callback(err, null);
      return;
    }

    if (docs.length > 0) {
      console.log('일치하는 사용자를 찾음');
      callback(null, docs);
    } else {
      console.log('일치하는 사용자를 찾지 못함.');
      callback(null, null);
    }
  });
};

var errorHandler = expressErrorHandler({
  static: {
    '404': './public/404.html',
  },
});

app.use(expressErrorHandler.httpError(404));
app.use(errorHandler);

http.createServer(app).listen(app.get('port'), function () {
  console.log('Express 서버가 ' + app.get('port') + '번 포트에서 시작됨.');

  connectDB();
});

module.exports = app;
