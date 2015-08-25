'use strict';
var expect = require('chai').expect;

var Followers = require('./Followers');
var Following = require('./Following');
var User = require('./User');
var mongo = require('../../lib/mongo/');

describe('Followers', function () {
  var seededUsers;
  var seededFollowers;
  var seededFollowing;

  before(function (done) {
    mongo.connect(function () {
      seededUsers = [
        {_id: 'Simone123', name: 'Simone'},
        {_id: 'Matt123', name: 'Matt'}
      ];

      User.collection.insert(seededUsers, function (err, result) {
        return result;
      });

      seededFollowers = [
        {ownerId: seededUsers[0]._id, followedBy: [seededUsers[1]._id]},
        {ownerId: seededUsers[1]._id, followedBy: [seededUsers[0]._id]}
      ];

      Followers.collection.insert(seededFollowers, function (err, result) {
        return result;

      });

      seededFollowing = [
        {ownerId: seededUsers[1]._id, followingWho: [seededUsers[0]._id]},
        {ownerId: seededUsers[0]._id, followingWho: [[seededUsers[1]._id]]}
      ];

      Following.collection.insert(seededFollowing, function (err, result) {
        return result;
      });
        done();
    });
  });

  after(function (done) {
    User.dropCollection();
    Followers.dropCollection();
    Following.dropCollection();
    done();
  });

  describe('.follow()', function () {
    this.timeout(5000);
    it('should add a _id to the Following - followingWho document', function (done) {
      var id1 = seededUsers[0]._id; // Simone
      var id2 = seededUsers[1]._id; // Matt
      var fErs = seededFollowers[1].followedBy; // Matt
      var fIng = seededFollowing[1].followingWho; // Simone

      Following.follow(id1, id2, function(err, result) {
        expect(fIng.toString()).to.equal(result.followingWho.toString())
        done();
      })
    });
    
    it('should add a _id to the Followers - followedBy document', function (done) {
      var id1 = seededUsers[0]._id; // Simone
      var id2 = seededUsers[1]._id; // Matt
      var fErs = seededFollowers[1].followedBy; // Matt
      var fIng = seededFollowing[1].followingWho; // Simone

      Followers.follow(id1, id2, function(err, result) {
        expect(fErs.toString()).to.equal(result.followedBy.toString())
        done();
      })
    });
  });


  describe('find Followers and Following', function () {
    it('should return all followers given a user._id', function (done) {
      var id1 = seededUsers[0]._id; // Simone
      var fErs = seededFollowers[0].followedBy; // Matt

      Followers.findById(id1, function (err, followers) {
        expect(followers.followedBy.toString()).to.include(fErs)
        done();
      })
    });

    it('should return all following given a user._id', function (done) {
      var id1 = seededUsers[1]._id; // Simone
      var fIng = seededFollowing[0].followingWho; // Matt

      Following.findById(id1, function (err, following) {
        expect(following.followingWho.toString()).to.include(fIng)
        done();
      })
    });

    it('should unfollow a user given an _id', function (done) {
      var id1 = seededUsers[0]._id; // Simone
      var id2 = seededUsers[1]._id; // Matt

      Followers.unfollowUser(id1, id2, function (err, result) {
        expect(result).to.not.have.property('followedBy')
        done();
      })
    });

    it('should remove a user from Following given an _id', function (done) {
      var id1 = seededUsers[0]._id; // Simone
      var id2 = seededUsers[1]._id; // Matt

      Followers.unfollowUser(id1, id2, function (err, result) {
        expect(result).to.not.have.property('followingWho')
        done();
      })
    });

  });


});
