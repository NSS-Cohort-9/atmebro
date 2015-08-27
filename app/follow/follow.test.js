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
//why do these have to go in this order
      User.collection.insertMany(seededUsers, function (err, result) {
        var seededUsers = result.ops; // why are you returning result
      });

      seededFollow = {
        followingId: 'Jones', 
        userId: 'Matt'
      };

      // db.find({for: 'sscotth'})
      
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



  describe('follow actions', function () {
    this.timeout(10000);
    it('should create a new follow object', function (done) {
      var Jones = seededUsers[0].handle // why are you declaring these variables here
      var Matt = seededUsers[1].handle

      Followers.count(function(err, originalCount) { // originally started with scenarios, then simplified
        expect(originalCount).to.equal(1); 
          Followers.create(Matt, Jones, function() { // why are we creating just an object - where you started from (relational data)
            Followers.count(function(err, newCount) {
              expect(newCount).to.equal(2)
              done();
          });
        });
      });
    });
    it('should delete the correct follow object on unfollow()', function (done) {
      var Jones = seededUsers[0].handle 
      var Matt = seededUsers[1].handle

      Followers.count(function(err, originalCount) { // show how to abstract this into
        expect(originalCount).to.equal(2); 
          Followers.destroy(Matt, Jones, function() { 
            Followers.count(function(err, newCount) {
              expect(newCount).to.equal(1)
              done();
          });
        });
      });
    });

    it('should find all followers', function (done) {
      var Jones = seededUsers[0].handle 

      Followers.allFollowers(Jones, function (err, result) {
        expect(result[0].userId).to.equal(seededFollow[0].userId)
        done();
      })
    });
   
    it('should find who a user is following', function (done) {
      var Matt = seededUsers[1].handle

      Followers.allFollowing(Matt, function (err, result) {
        expect(result[0].followingId).to.equal(seededFollow[0].followingId)
        done();
      })
    });


  });




});
