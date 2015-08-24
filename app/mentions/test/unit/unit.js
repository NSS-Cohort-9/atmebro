// 'use strict';

// var should = require('chai').should();
// var express = require('express');
// var app = express();
// var Post = require('../../../post/Post.js');
// var mongo = require('../../../../lib/mongo');
// var request = require('supertest');
// var _ = require('lodash');
// var ObjectID = require('mongodb').ObjectID;

// // Test Chai

// describe('Mocha + Chai', function() {
//   it('thruthiness', function () {
//     true.should.equal(true);
//     false.should.equal(false);
//   });
// });

// // Test for Mention functionality

// describe('Find posts from database', function () {

//   before(function (done) {
//     mongo.connect(done);
//   });

//   var postObj = {
//       text: 'hola',
//       mention: 'LDougher',
//       username: 'buddy',
//       date: 'Thu Aug 22 2015 14:34:20 GMT-0500 (CDT)',
//       geolocation: 'nashville',
//     };

//   describe('find username from posts collection', function () {
    
//     var postObj = {
//       text: 'hola',
//       mention: 'LDougher',
//       username: 'buddy',
//       date: 'Thu Aug 22 2015 14:34:20 GMT-0500 (CDT)',
//       geolocation: 'nashville',
//     };

//     var db;
//     var id;

//     beforeEach(function (done) {
//       db = mongo.getDb();
//       db.collection('posts').insert(postObj, function () {
//         done();
//       });
//     });

//     it('should return post object', function (done) {
//       db.collection('posts').findOne({username: 'buddy'}, function (err, res) {
//         res.username.should.equal('buddy');
//         console.log(res.username);
//         done();
//       });
//     });

//     after(function(done){
//       db.collection('posts').remove({}, function () {
//         done();
//       });
//     });
//   });
// });
