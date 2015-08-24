'use strict';

var expect = require('chai').expect;

// describe('when user1 clicks follow user2', function() {
//   it('should add user1s id to user2s followers collection', function() {

//   });
//   it('should add user2s id to user1s following collection', function() {

//   })
// })

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
      {_id: '123456789012345678901234'},
      {_id: '098765432109876543210987'}
      ];
       seededFollowers = [
      {ownerId: '123456789012345678901234', followedBy: ['098765432109876543210987']}
      ];
       seededFollowing = [
      {ownerId: '098765432109876543210987', followingWho: ['123456789012345678901234']}
      ];
      User.collection.insertMany(seededUsers, function (err, result) {
        return result
      });
      Followers.collection.insertOne(seededFollowers, function (err, result) {
        return result
      });
      Following.collection.insertOne(seededFollowing, function (err, result) {
        return result
        done();
      });
      done();
    });
  });
  // after(function (done) {
  //   User.dropCollection(done);
  //   Followers.dropCollection(done);
  //   Following.dropCollection(done);
  // });
 describe('findUserCollection', function () {
    it('should return a User object', function (done) {
      var userId = seededUsers[0]._id
      User.findById(userId, function (err, user) {
        expect(user).to.be.an.instanceOf(User)
          done();
      });
    });
  });

 describe('findFollowersCollection', function () {
  it('should return a Followers Object', function (done) {
    var userId = seededUsers[0]._id;
    Followers.findById(userId, function (err, followers) {
      expect(followers).to.be.an.instanceOf(Followers);
      done();
    });
  });
 });

 describe('findFollowingCollection', function () {
  it('should return a Following Object', function (done) {
    var userId = seededUsers[0]._id;
    Following.findById(userId, function (err, following) {
      expect(following).to.be.an.instanceOf(Following);
      done();
    });
  });
 });
