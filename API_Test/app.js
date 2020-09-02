var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser'); // cookie-parser와 express-session의 nodebirdsecret 같은 비밀키는 직접 하드코딩하지 않는다.
var passport = require('passport');
var morgan = require('morgan');
var session = require('express-session');
var nunjucks = require('nunjucks');
var dotenv = require('dotenv');
//var flash = require('connect-flash');

dotenv.config();
var authRouter = require('./routes/auth');
var indexRouter = require('./routes/index');
//var usersRouter = require('./routes/users');
//var { sequelize } = require('./models');
var Sequielize = require('sequelize');
var passportConfig = require('./passport');

var app = express();
//passportConfig();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'pug');
app.set('view engine', 'html');

app.set('port', process.env.PORT || 8002);
nunjucks.configure('views', {
  express: app,
  watch: true,
});
// sequelize
//   .sync({ force: false })
//   .then(() => {
//     console.log('데이터베이스 연결 성공');
//   })
//   .catch((err) => {
//     console.error(err);
//   });

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
  })
);
// app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
//app.use('/users', usersRouter);
app.use('/auth', authRouter);

// catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   next(createError(404));
// });
app.use((req, res, next) => {
  const error = new Error('${req.method} ${req.url} 라우터가 없습니다.');
  error.status = 404;
  next(error);
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

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기 중');
});

module.exports = app;
//
