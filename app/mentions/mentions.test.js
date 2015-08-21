'use strict';

var expect 		= require('chai').expect;

var Mentions 	= require('./mentions');
var mongo 		= require('../../lib/mongo/');


// Test Chai

describe('Mocha + Chai', function() {
  it('thruthiness', function () {
    true.should.equal(true);
    false.should.equal(false);
  });
});


// Mentions Tests

describe('Mentions', function () {
	
	before(function (done) {
		mongo.connect(function () {

			var postObj = [
				{text: 'hola'},
				{mention: 'LDougher'},
				{username: 'buddy'},
				{date: 'Thu Aug 22 2015 14:34:20 GMT-0500 (CDT)'},
				{geolocation: 'nashville'},
		];

		Post.collection.insertMany(seedPosts, function (err, result) {
			postObj = result.ops;
			done();
			})
		});
		after(function (done) {
			Post.dropCollection(done);
		});

	});

	// describe('should return post by mention', function (done) {
		
	// })












})