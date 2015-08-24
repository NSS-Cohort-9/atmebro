'use strict';
var ObjectID = require('mongodb').ObjectID;
var _ = require('lodash');
var mongo = require('../../lib/mongo/');

function Follow(p) {
  this.text = p.text;
}

Object.defineProperty(Follow, 'collection', {
  get: function () {
    return mongo.getDb().collection('follow');
  }
});

Follow.count = function (cb) {
  return Follow.collection.count(cb);
};
Follow.create = function (follow, cb) {
  Follow.collection.insertOne(follow, cb);
};
Follow.dropCollection = function (cb) {
  Follow.collection.drop(cb);
};
Follow.findById = function (id, cb) {
  Follow.collection.findOne({_id: ObjectID(id)}, function (err, follow) {
    cb(err, setPrototype(follow));
  });
};
Follow.findAll = function (cb) {
  Follow.collection.find().toArray(function (err, follows) {
    var prototypedFollows = follows.map(function (follow) {
      return setPrototype(follow);
    });
    cb(err, prototypedFollows);
  });
};

module.exports = Follow;
function setPrototype(pojo) {
  return _.create(Follow.prototype, pojo);
}
