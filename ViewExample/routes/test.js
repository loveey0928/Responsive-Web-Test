// const database = require('../database/database');

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

var test1 = function (req, res) {
  console.log('test 모듈 안에 있는 test1 호출됨.');

  res.writeHead(200, { 'Content-Type': 'test/html;charset=utf8' });

  var context = {};
  req.app.render('test1_success', context, function (err, html) {
    if (err) {
      throw err;
    }
    console.log('rendered : ' + html);

    res.end(html);
  });
};

module.exports.test1 = test1;
