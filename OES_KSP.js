const express = require('express');
const fileUpload = require('express-fileupload');
const multer = require('multer');
const app = express();
const upload = multer({ dest: '/uploads/' });

// default options
app.use(fileUpload());

app.get('/', function (req, res) {
  res.send('Hello world!');
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
  var sampleFile = req.files.sampleFile;

  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv('uploads/' + sampleFile.name, function (err) {
    if (err) return res.status(500).send(err);

    res.send('File uploaded!');
    console.log('File uploaded successively');
  });
});
