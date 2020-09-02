// const database = require('../database/database');

const { mountpath } = require('../app2');

// var login = function (req, res) {
//     console.log('/process/login 라우팅 함수 호출됨');

//   authUser(database, paramId, paramPassword, function (err, docs) {
//     if (err) {
//       throw err;
//     }

//     if (docs) {
//       console.dir(docs);

//       var username = docs[0].name;

//       res.writeHead(200, { 'Content-Type': 'text/html; charset=utf8' });
//       res.write('<h1>로그인 성공</h1>');
//       res.write('<div><p>사용자 아이디:' + paramId + '</p></div>');
//       res.write('<div><p>사용자 이름:' + username + '</p></div>');
//       res.write("<br><br><a hef = '/public/login.html'>다시 로그인하기</a>");
//       res.end();
//     }
//   });
// };

//var database;
var UserSchema;
var UserModel;

var login = function (req, res) {
  console.log('/process/login 라우팅 함수 호출됨');

  var paramId = req.body.id || req.query.id;
  var paramPassword = req.body.password || req.query.password;
  console.log('요청 파라미터 : ' + paramId + ',' + paramPassword);

  var database = req.app.get('database');
  if (database) {
    authUser(database, paramId, paramPassword, function (err, docs) {
      if (err) {
        console.log('에러 발생');
        res.writeHead(200, { 'Content-Type': 'text/html;charset=utf8' });
        res.write('<h1>에러 발생</h>');
        res.end();
        return;
      }

      if (docs) {
        console.dir(docs);

        res.writeHead(200, { 'Content-Type': 'text/html;charset=utf8' });

        var context = {
          userid: paramId,
          username: docs[0].name,
        };
        req.app.render('login_success', context, function (err, html) {
          if (err) {
            console.error('뷰 렌더링 중 에러 발생' + err.stack);
            console.log('에러 발생.');

            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf8' });
            res.write('<h1>뷰 렌더링 중 에러 발생.</h1>');
            res.write('<br><p>' + err.stack + '</p>');
            res.end();

            return;
          }

          res.end(html);
        });
      } else {
        console.log('에러 발생.');
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf8' });
        res.write('<h1>사용자 데이터 조회 안됨.</h1>');
        res.end();
      }
    });
  } else {
    console.log('에러 발생.');
  }
};

var addUser = function (req, res) {
  console.log('/process/adduser');

  var paramId = req.param('id');
  var paramPassword = req.param('password');
  var paramName = req.param('name');

  var database = req.app.get('database');
  if (database) {
    createUser(database, paramId, paramPassword, paramName, function (
      err,
      result
    ) {
      if (err) {
        throw err;
      }

      if (result) {
        console.dir(result);

        res.writeHead('200', {
          'Content-Type': 'text/html; charset=utf8',
        });
        res.write('<h2> 사용자 추가 성공</h2>');
        res.write('<br><br><a href="/html/adduser.html">유저 추가</a>');
        res.end();
      } else {
        res.writeHead('200', {
          'Content-Type': 'text/html; charset=utf8',
        });
        res.write('<h2> 사용자 추가 실패</h2>');
        res.end();
      }
    });
  } else {
    res.writeHead('200', {
      'Content-Type': 'text/html; charset=utf8',
    });
    res.write('<h2> 데이터베이스 연결 실패</h2>');
    res.write('<br><br><a href="/html/adduser.html">유저 추가</a>');
    res.end();
  }
};

// add user in mongodb
var createUser = function (database, id, password, name, cb) {
  console.log('addUser 호출');

  var user = new UserModel({
    id: id,
    password: password,
    name: name,
  });

  user.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }

    console.log('사용자 데이터 추가');
    cb(null, user);
  });
};

var authUser = function (database, id, password, callback) {
  console.log('authUser 호출됨.');

  var users = database.collection('users');

  users.find({ id: id, password: password }).toArray(function (err, docs) {
    if (err) {
      callback(err, null);
      return;
    }

    if (docs.length > 0) {
      console.log(
        '아이디 [%s],비밀번호[%s]가 일치하는 사용자 찾음.',
        id,
        password
      );
      callback(null, docs);
    } else {
      console.log('일치하는 사용자를 찾지 못함');
      callback(null, null);
    }
  });
};

var listuser = function (req, res) {
  console.log('/process/listuser 호출됨');

  var database = req.app.get('database');
  if (database) {
    database.UserModel.findAll(function (err, results) {
      if (err) {
        callback(err, null);
        return;
      }
      if (results) {
        console.dir(results);
        res.writeHead('200', {
          'Content-Type': 'text/html; charset=utf8',
        });
        res.write('<h2>사용자 리스트</h2>');
        res.write('<div><ul>');

        for (var i = 0; i < results.length; i++) {
          var curId = results[i]._doc.id;
          var curName = results[i]._doc.name;
          res.write('<li>#' + i + ':' + curId + ',' + curName + '</li>');
        }

        res.write('</ul></div>');
        res.end();
      } else {
        res.writeHead('200', {
          'Content-Type': 'text/html; charset=utf8',
        });
        res.write('<h2>사용자 리스트 조회 실패</h2>');
        res.end();
      }
    });
  }
};

var init = function (db, schema, model) {
  console.log('init 호출됨.');

  database = db;
  UserSchema = schema;
  UserModel = model;
};

module.exports.init = init;
module.exports.login = login;
module.exports.authUser = authUser;
module.exports.listuser = listuser;
module.exports.addUser = addUser;
