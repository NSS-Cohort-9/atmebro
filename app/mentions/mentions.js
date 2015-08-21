'use strict';

var express = require('express');
// var router  = require('router');
//var path    = require('path');


var _ 			= require('lodash');


function Post(p) {
	this.username = p.username;
}

Object.defineProperty(Post, 'collection', {
	get: function () {
		return mongo.getDb().collection('posts');
	}
});

Post.findById = function (cb) {
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

module.exports 		= Post;
