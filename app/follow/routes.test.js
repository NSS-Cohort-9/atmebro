'use strict';

var expect = require('chai').expect;
var request = require('supertest');

var app = require('../../app/');
var Followers = require('./Followers');
var mongo = require('../../lib/mongo/');

describe('Followers Routes', function () {
  var seededFollow;

  before(function (done) {
    mongo.connect(function () {
      seededFollow = [
        { 
          followingId: 'Blake', 
          userId: 'Drake'
        },
        {
          followingId: 'Blazer',
          UserId: 'Lazer',
        }
      ];

      Followers.collection.insertMany(seededFollow, function (err, result) {
        return result
      });
      done();
    });
  });

  after(function (done) {
    Followers.dropCollection(done);
  });

  describe('GET /', function () {
    this.timeout(10000);
    it('should respond with followers', function (done) {
      console.log(seededFollow)
      var Blake = seededFollow[0].followingId;
      var Drake = seededFollow[0].userId;

      request(app)
        .get(`/${Blake}/followers`)
        .expect(200)
        .end(function (err, res) {
          if (err) throw err;
          expect(res.text).to.contain('Drake');
          done();
        });

    it('should respond with whom a user is following', function (done) {
      var Blake = seededFollow[0].followingId;
      var Drake = seededFollow[0].userId;
      var Blazer = seededFollow[1].followingId;
      var Lazer = seededFollow[1].userId;
      

      request(app)
        .get(`/${Drake}/following`)
        .expect(200)
        .end(function (err, res) {
          if (err) throw err;
          expect(res.text).to.contain('Blake');

          request(app)
          .get(`/${Lazer}/following`)
            .expect(200)
            .end(function (err, res) {
              if (err) throw err;
              expect(res.text).to.contain('Blazer');
              done();
            });

    });
    });
  });
});

  describe('Delete follower' , function () {
    it('should remove a follow object', function (done) {
      var Blake = seededFollow[0].followingId;
      var Drake = seededFollow[0].userId;

      Followers.count(function (err, count) {
        expect(count).to.equal(2);

        request(app)
          .delete(`/${Blake}/unfollow`)
          .expect(200)
          .end(function (err) {
            if (err) throw err;
            Followers.count(function (err, count) {
              expect(count).to.equal(1);
              done();
            });
          });
      });

    });
  });

  describe('POST /:id/follow' , function () {
    it('should follow a user', function (done) {
      var Blazer = seededFollow[1].followingId;
      var Lazer = seededFollow[1].userId;
      console.log(Blazer)

      Followers.count(function (err, count) {
        expect(count).to.equal(1);

        request(app)
          .post(`/${Blazer}/follow`)
          .expect(200)
          .end(function (err) {
            if (err) throw err;
            Followers.count(function (err, count) {
              expect(count).to.equal(1);
              done();
            });
          });
      });
    });
  });
});