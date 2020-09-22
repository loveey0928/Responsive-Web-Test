const express = require('express');
const fileUpload = require('express-fileupload');
const path = require('path');
const multer = require('multer');
var static = require('serve-static');
const upload = multer({ dest: '/uploads/' });
const parse = require('csv-parse');
var bodyParser = require('body-parser'); // POST시 필요한 부분 추출을 위함
var cookieParser = require('cookie-parser');
const fs = require('fs');
var async = require('async');
// var baseFunction = require('./OES_KSP_function');

const app = express(); // 서버 객체 생성

var router = express.Router();

app.use('/public', express.static(path.join(__dirname, 'public'))); // 미들웨어 사용
app.use('/uploads', static(path.join(__dirname, 'uploads')));

app.use(bodyParser.urlencoded({ extended: false })); // 미들웨어 사용
app.use(cookieParser());

const csvData = [];

// default options
app.use(fileUpload());

app.get('/', function (req, res) {
  // res.send('Hello world!');
  res.redirect('./public/index.html');
});

// router.route('/').post(function (req, res) {
//   //res.send('Hello world!');
//   res.redirect('/OES_KSP copy.html');
// });

var userfile = '';
app.post('/upload/csv', function (req, res) {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  //var sampleFile = req.files.sampleFile;
  userfile = req.files.userfile;
  // Use the mv() method to place the file somewhere on your server
  userfile.mv('uploads/' + userfile.name, function (err) {
    if (err) return res.status(500).send(err);

    res.send(userfile.name + '  File uploaded!');
    console.log('File uploaded successively');
  });
});

//var port = 3000;
var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('server on! http://localhost:' + port);
});

// router.route('uploads/wavelength').post(function (req, res) {});

// function SelectWaveLength() {
//   waveLength1 = document.getElementById('waveLength1');
//   waveLength2 = document.getElementById('waveLength2');
//   alert(
//     'waveLength 1 : ' +
//       waveLength1.value +
//       ' nm' +
//       '\n' +
//       'waveLength 2 : ' +
//       waveLength2.value +
//       ' nm'
//   );
//   console.log('Select WaveLength is done');

//   getData();
// }

// function mOver() {
//   waveLengthBtn = document.getElementById('waveLengthBtn');
//   waveLengthBtn.value = 'Click !!!!!!!!!!!!!!!!!!!!!!!!';
//   waveLengthBtn.style.backgroundColor = '#e1f5fe';
//   waveLengthBtn.style.borderColor = '#039be5';
//   // obj.innerHTML = 'Click !!!!!!!!!!!';
// }

// function mOut() {
//   waveLengthBtn = document.getElementById('waveLengthBtn');
//   waveLengthBtn.value = 'Save WaveLength';
//   waveLengthBtn.style.backgroundColor = '#e0e0e0';
//   waveLengthBtn.style.borderColor = 'black';
//   // obj.innerHTML = 'Save WaveLength';
// }

// // fs.createReadStream(__dirname + '/uploads/data.csv')
// //   .pipe(
// //     parse({
// //       delimiter: ',',
// //     })
// //   )
// //   .on('data', function (dataRow) {
// //     csvData.push(dataRow);
// //   })
// //   .on('end', function () {
// //     console.log(csvData);
// //   });
