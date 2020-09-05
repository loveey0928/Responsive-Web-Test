const express = require('express');
const fileUpload = require('express-fileupload');
const multer = require('multer');
const app = express();
const upload = multer({ dest: '/uploads/' });
const parse = require('csv-parse');
const fs = require('fs');
var async = require('async');
// var baseFunction = require('./OES_KSP_function');

var router = express.Router();

const csvData = [];

// default options
app.use(fileUpload());

app.get('/', function (req, res) {
  //res.send('Hello world!');
  res.redirect('/OES_KSP copy.html');
});

var port = 3000;
app.listen(port, function () {
  console.log('server on! http://localhost:' + port);
});

app.post('/upload', function (req, res) {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  //var sampleFile = req.files.sampleFile;
  var userfile = req.files.userfile;
  // Use the mv() method to place the file somewhere on your server
  userfile.mv('uploads/' + userfile.name, function (err) {
    if (err) return res.status(500).send(err);

    res.send('File uploaded!');
    console.log('File uploaded successively');
  });
});

function SelectWaveLength() {
  waveLength1 = document.getElementById('waveLength1');
  waveLength2 = document.getElementById('waveLength2');
  alert(
    'waveLength 1 : ' +
      waveLength1.value +
      ' nm' +
      '\n' +
      'waveLength 2 : ' +
      waveLength2.value +
      ' nm'
  );
  console.log('sss');
}

function mOver() {
  waveLengthBtn = document.getElementById('waveLengthBtn');
  waveLengthBtn.value = 'Click !!!!!!!!!!!!!!!!!!!!!!!!';
  waveLengthBtn.style.backgroundColor = '#e1f5fe';
  waveLengthBtn.style.borderColor = '#039be5';
  // obj.innerHTML = 'Click !!!!!!!!!!!';
}

function mOut() {
  waveLengthBtn = document.getElementById('waveLengthBtn');
  waveLengthBtn.value = 'Save WaveLength';
  waveLengthBtn.style.backgroundColor = '#e0e0e0';
  waveLengthBtn.style.borderColor = 'black';
  // obj.innerHTML = 'Save WaveLength';
}

fs.createReadStream(__dirname + '/uploads/data.csv')
  .pipe(
    parse({
      delimiter: ',',
    })
  )
  .on('data', function (dataRow) {
    csvData.push(dataRow);
  })
  .on('end', function () {
    console.log(csvData);
  });
