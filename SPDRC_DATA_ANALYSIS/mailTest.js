var express = require('express');
var schedule = require('node-schedule');
var mailer = require('nodemailer');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

// 5초 간격으로 실행되는게 아닌 5초에 실행한다.
var j = schedule.scheduleJob('5 * * * * *', function () {
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

var emailParam = {
  toEmail: 'hjkwon0928@naver.com',
  subject: '나는 나를 믿는다.',
  text: '메일 보내기 성공 \n이히히히히\n잘돼네',
};
