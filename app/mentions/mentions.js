'use strict';

var express = require('express');
var mongo     = require('../../lib/mongo/');
var ObjectID = require('mongodb').ObjectID;
var nodemailer = require('nodemailer');

// Send Grid

var transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'test.nodemailer@gmail.com',
    pass: '123'
  }
});

var mailOptions = {
  from    :'test.nodemailer@gmail.com',
  to      :'NodemailerTEST@gmail.com',
  subject : 'hello',
  text    : 'hello world!'
}

var _       = require('lodash');


transporter.sendMail(mailOptions, function(err, info) {
  if(err) {
    console.log('error error');
    console.log(err.mailOptions);
    return;
  } else {
  console.log('Email Sent!!!!');
  console.log(info.response);
  }
});

