var express = require('express');
var router = express.Router();
var user = require('./user');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

// login
router.post('/process/login', user.login);

// add user
router.post('/process/adduser', user.addUser);

// user list
router.post('/process/listuser', user.userList);

module.exports = router;
