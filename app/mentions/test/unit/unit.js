var should = require("chai").should();
var express = require('express');
var app = express();
var Post = require('./post');
var mongo = require('../../../../lib/mongo');
var request = require('supertest');
var _ = require('lodash');
var ObjectID = require('mongodb').ObjectID;


describe('Mocha + Chai', function() {
  it('thruthiness', function () {
    true.should.equal(true);
    false.should.equal(false);
  });
});

describe('#indexOf()', function () {
  it('should return -1 when value is not present', function () {
    [1, 2, 3].indexOf(5).should.equal(-1);
    [1, 2, 3].indexOf(0).should.equal(-1);
  });
});

before(function (done) {
  mongo.connect(done);
});

describe('find username', function () {
  //var collection = global.db.collection('mentions');
  var postObj = {
    text: "hola",
    mention: "LDougher",
    username: "buddy",
    date: "Thu Aug 20 2015 14:34:20 GMT-0500 (CDT)",
    geolocation: "nashville",
  };

  var db;

  beforeEach(function (done) {
    db = mongo.getDb();
    db.collection("user").insert(postObj, function () {
      done();
    });
  });

  var id;

  before(function () {
    var sendPost = new Post(postObj);
    sendPost.save(function (err, res) {
      id = res._id;
    });
  });

  it('should return post object', function (done) {
    db.collection("user").findOne({text: "hola"}, function (err, res) {
      console.log(err);
      res.username.should.equal("buddy");
      done();
    });
  });

  after(function(done){
    db.collection("user").remove({}, function () {
      done();
    });
  });
});
