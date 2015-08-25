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
        {ownerId: seededUsers[0]._id, followedBy: [seededUsers[1]._id]}
      ];

      Followers.collection.insert(seededFollowers, function (err, result) {
        return result;

      });

      seededFollowing = [
        {ownerId: seededUsers[1]._id, followingWho: [seededUsers[0]._id]}
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

 describe('findUserCollection', function () {
    it('should return a User object', function (done) {
      var userId = seededUsers[0]._id

      User.findById(userId, function (err, user) {
        expect(user).to.be.an.instanceOf(User)
          done();

      });
    });
  });

  describe('find Followers And Following By UserId', function () {
    it('should return a Followers _id', function (done) {
      var id = seededUsers[0]._id;
      var fErs = seededFollowers[0].ownerId

      User.findById(id, function (err, user) {
        expect(user._id).to.equal(fErs);
          done();
      });
    });
    
    it('should return a Following _id', function (done) {
      var id = seededUsers[1]._id;
      var fIng = seededFollowing[0].ownerId

      User.findById(id, function (err, user) {
        expect(user._id).to.equal(fIng);
          done();
      });
    });

    it('should return the users name', function (done) {
      var id1 = seededUsers[0]._id;
      var id2 = seededUsers[1]._id;

      User.findById(id1, function (err, user) {
        expect(user.name).to.equal('Simone');

        User.findById(id2, function (err, user) {
          expect(user.name).to.equal('Matt');
          done();
        });
      });
    });
  });

  describe('find Followers and Following', function () {
    it('should return all follower objects', function (done) {
      Followers.findAll(function (err, follower) {
        follower.forEach(function (ids) {
          expect(ids).to.be.an.instanceOf(Followers);
        });
        done();
      });
    });

    it('should return all following objects', function (done) {
      Following.findAll(function (err, following) {
        following.forEach(function (ids) {
          expect(ids).to.be.an.instanceOf(Following);
        });
        done();
      });
    });

    it('should return all followers', function (done) {
      Followers.findAll(function (err, follower) {
        expect(follower).to.deep.equal(seededFollowers);
        done();
      });
    });

    it('should return all following', function (done) {
      Following.findAll(function (err, following) {
        expect(following).to.deep.equal(seededFollowing);
        done();
      });
    });
  });

  describe('.create()', function () {
    it('should add a post to the database', function (done) {
      Post.count(function (err, initialCount) {
        expect(initialCount).to.equal(2);
        Post.create({}, function () {
          Post.count(function (err, newCount) {
            expect(newCount).to.equal(3);
            done();
          });
        });
      });
    });
  });
});
