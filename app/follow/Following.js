'use strict';

var _ = require('lodash');

var mongo = require('../../lib/mongo/');

function Following(p) {
  this.text = p.text;
}

Object.defineProperty(Following, 'collection', {
  get: function () {
    return mongo.getDb().collection('following');
  }
});

Following.dropCollection = function (cb) {
  Following.collection.drop(cb);
};

Following.findById = function (id, cb) {
  Following.collection.findOne({ownerId: id}, function (err, following) {
    cb(err, setPrototype(following));
  });
};


Following.follow = function(id1, id2, cb) {

    Following.collection.findOneAndUpdate(
    { ownerId: id1 }, 
    { $addToSet: { followingWho: [id2] } },
    { 
      upsert: true,
      returnOriginal: false
    }, function(err, result) {
        cb(err, result.value)
      }
  )
};

Following.unfollowUser = function (id1, id2, cb) {
    Following.collection.findOneAndDelete(
      {followingWho: id2}, 
      {projection: {ownerId: id1}},
      function(err, result) {
        cb(err, result);
      }
    )
};



module.exports = Following;

function setPrototype(pojo) {
  return _.create(Following.prototype, pojo);
}
