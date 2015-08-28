'use strict';
var expect = require('chai').expect;

var User = require('./User');
var Followers = require('./Followers');
var mongo = require('../../lib/mongo/');

describe('Followers', function () {
  var seededUsers;
  var seededFollow;

  before(function (done) {
    mongo.connect(function () {
      seededUsers = [
        {handle: 'Jones'},
        {handle: 'Matt'}
      ];

      User.collection.insertMany(seededUsers, function (err, result) {
        var seededUsers = result.ops; // why are you returning result
      });

      seededFollow = {
        followingId: 'Jones', 
        userId: 'Matt'
      };
      
      Followers.collection.insertOne(seededFollow, function (err, result) {
        seededFollow = result.ops;
      });
        done();
    });
  });

  after(function (done) {
    User.dropCollection();
    Followers.dropCollection();
    done();
  });

  describe('Follow() and unFollow()', function () {
    this.timeout(10000);
    it('should delete a follow object given two handle ids', function (done) {
      var Jones = seededUsers[0].handle; 
      var Matt = seededUsers[1].handle;

      Followers.count(function (err, originalCount) { 
        expect(originalCount).to.equal(1); 
          Followers.destroy(Jones, Matt, function () { 
            Followers.count(function (err, newCount) {
              expect(newCount).to.equal(0);
              done();
            });
          });
      });
    });

    it('should create a new follow object given two handles', function (done) {
      var Jones = seededUsers[0].handle; 
      var Matt = seededUsers[1].handle;

      Followers.count(function (err, originalCount) { 
        expect(originalCount).to.equal(0);
          Followers.create(Jones, Matt, function () { 
            Followers.count(function (err, newCount) {
              expect(newCount).to.equal(1);
              done();
            });
          });
      });
    });

    it('should not create a new follow object given an individual is already followed', function (done) {
      var Jones = seededUsers[0].handle;
      var Matt = seededUsers[1].handle;

      Followers.count(function (err, originalCount) { 
        expect(originalCount).to.equal(1);
          Followers.findOrCreate(Jones, Matt, function () { 
            Followers.count(function (err, newCount) {
              expect(newCount).to.equal(1);
              done();
            });
          });
      });
    });

    it('should find all followers given an id', function (done) {
      var Jones = seededUsers[0].handle; 

      Followers.allFollowers(Jones, function (err, result) {
        expect(result[0].userId).to.equal('Matt');
        done();
      });
    });
   
    it('should find who a user is following', function (done) {
      var Matt = seededUsers[1].handle;

      Followers.allFollowing(Matt, function (err, result) {
        expect(result[0].followingId).to.equal(seededFollow[0].followingId);
        done();
      });
    });


  });




});
