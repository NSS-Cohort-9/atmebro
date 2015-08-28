'use strict';

var _ = require('lodash');
var mongo = require('../../lib/mongo/');

function Followers(f) {
  this._id = f.followingId;
}

Object.defineProperty(Followers, 'collection', {
  get: function () { // the function returned will be used as the value of the property
    return mongo.getDb().collection('followers');
  }
});

Followers.findOrCreate = function (followingId, userId, cb) {
  Followers.collection.find({followingId: followingId, userId: userId}, function (err, userId) {
    if (err) {
      cb(err);
    } else if (userId) { 
      Followers.create(followingId, userId, cb);
    };
  });
};

Followers.create = function (followingId, userId, cb) {
  Followers.collection.insertOne({followingId: followingId, userId: userId}, function (err, result) {
    cb(err, result);
  });
};

Followers.destroy = function (followingId, userId, cb) {
  Followers.collection.findAndRemove({followingId: followingId, userId: userId}, function (err, result) {
    cb(err, result);
  });
};

Followers.allFollowers = function (followingId, cb) {
  Followers.collection.find({followingId: followingId}).toArray(function (err, result) {
    var prototypeResult = result.map(function (followers) {
      return setPrototype(followers);
    });
  cb(err, setPrototype(result));
  });
};

Followers.allFollowing = function (userId, cb) {
  Followers.collection.find({userId: userId}).toArray(function (err, result) {
    var prototypeResult = result.map(function (following) {
      return setPrototype(following)
    });
  cb(err, prototypeResult);
  });
};

Followers.count = function (cb) {
  return Followers.collection.count(cb);
};

Followers.dropCollection = function (cb) {
  Followers.collection.drop(cb);
};

module.exports = Followers;

function setPrototype(pojo) {
  return _.create(Followers.prototype, pojo);
}

