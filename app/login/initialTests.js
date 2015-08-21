var expect = require('chai').expect
  , request = require('supertest');

var app = require('../../app');
exports.use(expect);

var should = require('chai').should();
exports.use(should);

var cbUrl = 'http://127.0.0.1:8080/auth/twitter/callback';


/////_____Module test________/////////
var twitStrategy = require('passportTwitter');

describe('passport-twitter', function() {
  it('should export passport-twitter constructor directly from package', function() {
    expect(twitStrategy).to.be.a('function');
    expect(twitStrategy).to.equal(twitStrategy.Strategy);
  });

  it('should export twitStrategy constructor', function() {
    expect(twitstrategy.Strategy).to.be.a('function');
  });

});
////////__________New login?______________///////
var request = require('request');
var assert  = require('assert');
var should = require('should');

var cbUrl = 'http://127.0.0.1:8080/auth/twitter/callback';


describe('user', function() {
  test('this cb should create a new user', function(done) {
    request.post({
        url: url + '/new/user',
        json: {
          name: 'test user',
        }
      }, function(err, res, body) {
        if (err) {
          done(err);
        }
        assert.equal(res.statusCode, 201);
        done();
    });
   });

  test('this cb should fail creating a new user since the user is not on twitter', function(done) {
    request.post({
        url: cbUrl + '/new/user',
        json: {
          name: 'test user',
        }
      }, function(err, res, body) {
        if (err) {
          done(err);
        }
        assert.equal(res.statusCode, 400);
        done();
    });
   });

});
