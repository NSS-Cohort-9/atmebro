'use strict';

var express = require('express');
//var router  = require('router');
//var path    = require('path');
var mongo     = require('../../lib/mongo/');
var ObjectID = require('mongodb').ObjectID;
var nodemailer = require('nodemailer');
var sinon = require('sinon');

var transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'test.nodemailer@gmail.com',
    pass: '123'
  }
});

var mailOptions = {
  from    :'sender@address',
  to      :'NodemailerTEST@gmail.com',
  subject : 'hello',
  text    : 'hello world!'
}

var _ 			= require('lodash');

function Post(p) {
	this.username = p.username;
}

Object.defineProperty(Post, 'collection', {
	get: function () {
		return mongo.getDb().collection('posts');
	}
});

Post.dropCollection = function (cb) {
  Post.collection.drop(cb);
};

Post.findById = function (id, cb) {
	Post.collection.findOne({_id: ObjectID(id)}, function (err, post) {
		cb(err, setPrototype(post));

	});
};

///////////////////// NODEMAILER FUNCTIONS ////////////////////////

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

module.exports 		= Post;

function setPrototype(pojo) {
  return _.create(Post.prototype, pojo);
}
