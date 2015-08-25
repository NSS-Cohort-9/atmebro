'use strict';

var _ = require('lodash');

var mongo = require('../../lib/mongo/');

function Followers(p) {
  this.text = p.text;
}

Object.defineProperty(Followers, 'collection', {
  get: function () {
    return mongo.getDb().collection('followers');
  }
});

// Followers.count = function (cb) {
//   return Followers.collection.count(cb);
// };

// Followers.create = function (followers, cb) {
//   Followers.collection.insertOne(followers, cb);
// };


// Followers.create = function(id, cb) {
//   Followers.collection.findOne ({_id: id})
// };

Followers.dropCollection = function (cb) {
  Followers.collection.drop(cb);
};

Followers.follow = function (id1, id2, cb) {
  Followers.collection.findOneAndUpdate(
      {ownerId: id2}, 
      {$addToSet: {followedBy: id1}},
      { 
        upsert: true,
        returnOriginal: false
      }, function(err, result) {
          cb(err, result.value);
        }
    )
};

Followers.findById = function (id, cb) {
  Followers.collection.findOne({_id: id}, function (err, followers) {
    cb(err, setPrototype(followers));
  });
};

Followers.findAll = function (cb) {
  Followers.collection.find().toArray(function (err, followers) {
    var prototypedFollowers = followers.map(function (follower) {
      return setPrototype(follower);
    });

    cb(err, prototypedFollowers);
  });
};

module.exports = Followers;

function setPrototype(pojo) {
  return _.create(Followers.prototype, pojo);
}
