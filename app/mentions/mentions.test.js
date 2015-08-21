'use strict';

var expect 		= require('chai').expect;
var should 		= require('chai').should();
var Post 			= require('./mentions');
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
	
	var seededPosts;

	before(function (done) {
		mongo.connect(function () {

			var seedPosts = [
				{text: 'hola'},
				{mention: 'LDougher'},
				{username: 'buddy'},
				{date: 'Thu Aug 22 2015 14:34:20 GMT-0500 (CDT)'},
				{geolocation: 'Nashville'},
		];

		Post.collection.insertMany(seedPosts, function (err, result) {
			seededPosts = result.ops;
			done();
			});
		});
	});

		after(function (done) {
			Post.dropCollection(done);
		});

	

	it('should return post by mention', function (done) {
			var id1 = seededPosts[9]._id;
			

			Post.findById(id, function (err, post) {
				expect(post).to.equal('LDougher');
				done();
			})
	})












})