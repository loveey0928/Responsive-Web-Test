var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressSession = require('express-session');
var expressErrorHandler = require('express-error-handler');
var mongodb = require('mongodb');
var mongoose = require('mongoose');
var app = express();
var crypto = require('crypto');
var index = require('./routes/index');
var users = require('./routes/users');
var http = require('http');

app.set('port', process.env.PORT || 3000);

// view engine setup
//app.set('views', path.join(__dirname, 'views'));
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cookieParser());
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(
  expressSession({
    secret: 'my key',
    resave: true,
    saveUninitialized: true,
  })
);

app.use('/', index);
app.use('/users', users);
app.set('name', 'capkum');

// mongodb connection
var database;
var UserSchema;
var UserModel;

// mongodb setting
function connectDB() {
  var databaseUrl = 'mongodb://localhost:27017/shopping';

  mongoose.Promise = global.Promise;
  mongoose.connect(databaseUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  database = mongoose.connection;

  database.on(
    'error',
    console.error.bind(console, 'mongoose connection  error')
  );
  database.on('open', function () {
    console.log('데이터베이스에 연결되었습니다. :' + databaseUrl);
    createUserSchema();
  });

  database.on('disconnected', connectDB);
}

// mongodb connect
connectDB();

// set schema
function createUserSchema() {
  UserSchema = require('./database/user_schema').createSchema(mongoose);
  UserModel = mongoose.model('users', UserSchema);
  require('./routes/user').init(database, UserSchema, UserModel);
  console.log('users model 정의함');
}

var errorHandler = expressErrorHandler({
  static: {
    404: './public/html/404.html',
  },
});

app.use(expressErrorHandler.httpError(404));
app.use(errorHandler);

http.createServer(app).listen(app.get('port'), function () {
  console.log('Express 서버가' + app.get('port') + '번 포트에서 시작됨.');
});

module.exports = app;
