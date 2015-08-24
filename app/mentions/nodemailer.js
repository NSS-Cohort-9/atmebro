var express     = require('express');
var router      = express.Router();
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({});

var mailOptions = {
  from    :'sender@address',
  to      :'NodemailerTEST@gmail.com',
  subject : 'hello',
  text    : 'hello world!'
}

module.exports  = router;

