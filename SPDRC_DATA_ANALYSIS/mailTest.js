var express = require('express');
var schedule = require('node-schedule');
var mailer = require('nodemailer');
var router = express.Router();
var app = express();

var mysql = require('mysql');

var i = 1;

// var con = mysql.createConnection({
//   host: 'localhost',
//   //   post: 3306,
//   user: 'root',
//   password: '@khj70701004',
//   database: 'nodejs',
// });

// con.connect(function (err) {
//   if (err) throw err;
//   con.query(
//     'SELECT famous_saying FROM famoussaying where num=' + i,
//     function (err, result, fields) {
//       if (err) throw err;
//       console.log(result[0].famous_saying);
//     }
//   );
// });

// router.get('/', function (req, res, next) {
//   var connection = mysql.createConnection({
//     host: 'localhost',
//     post: 3306,
//     user: 'root',
//     password: '@khj70701004',
//     database: 'nodejs',
//   });
//   connection.connect();
//   connection.query('select*from famoussaying', function (err, rows, fields) {
//     connection.end();
//     if (!err) {
//       console.log(rows); // 쿼리의 실행결과 가지고 온 데이터이다.
//       console.log(fields); // 쿼리의 실행결과 가지고 온 데이터들의 필드 정보이다.
//       var result =
//         'rows :' +
//         JSON.stringify(rows) +
//         '<br><br>' +
//         'field :' +
//         JSON.stringify(fields);
//       res.send(result);
//     } else {
//       console.log('query error:' + err);
//       res.send(err);
//     }
//   });
// });
//
// module.exports = router;

app.get('/', function (req, res) {
  res.send('Hello World');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

var famousSaying = [
  '나는 나를 믿는다',
  '나는 대체될 수 없는 사람이다',
  '우리 모두의 마음속에는 커다란 거인이 숨어있다. 그는 자신의 이름을 자신감 이라고 소개한다.',
];

// 5초 간격으로 실행되는게 아닌 5초에 실행한다.
var j = schedule.scheduleJob('5 * * * * *', function () {
  var i = Math.floor(Math.random() * 100) % 3;
  console.log(i);
  var emailParam = {
    toEmail: 'hjkwon0928@naver.com',
    //   subject: '나는 나를 믿는다.',
    subject: famousSaying[i],
    text: '메일 보내기 성공 \n이히히히히\n잘돼네',
  };
  mailSender.sendGmail(emailParam);
  //   console.log("매분 5초마다 등장");
});

var mailSender = {
  //메일 발송 함수
  sendGmail: function (param) {
    var transporter = mailer.createTransport({
      service: 'gmail',
      prot: 587,
      host: 'smtp.gmail.com',
      secure: false,
      requireTLS: true,
      auth: {
        user: 'loveey0928@gmail.com',
        pass: 'qnsrhfthotls22',
      },
    });
    //메일 옵션
    var mailOptions = {
      from: 'loveey0928@gmail.com',
      to: param.toEmail, //수신할 이메일
      subject: param.subject, // 메일 제목
      text: param.text, // 메일 내용
    };
    //메일 발송
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  },
};
