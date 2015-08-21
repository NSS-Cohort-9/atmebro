'use strict';

var express = require('express');
// var router  = require('router');
//var path    = require('path');

var _ 			= require('lodash');

function Mentions(m) {
	this.username = m.username;
}

Object.defineProperty(Mentions, 'collection', {
	get: function () {
		return mongo.getDb().collection('posts');
	}
});

Mentions.findById = function (cb) {
	Post.collection.findOne({_id: ObjectID(id)}, function (err, post) {
		cb(err, setPrototype(post));
	});
};


// var postObj = {
//   text: 'hola',
//   mention: 'LDougher',
//   username: 'buddy',
//   date: 'Thu Aug 20 2015 14:34:20 GMT-0500 (CDT)',
//   geolocation: 'nashville',
//   hidden: false
// };

// module.exports = postObj;

module.exports 		= Mentions;
