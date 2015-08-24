'use strict';

var ObjectID = require('mongodb').ObjectID;
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

Following.count = function (cb) {
  return Following.collection.count(cb);
};

Following.create = function (following, cb) {
  Following.collection.insertOne(following, cb);
};

Following.dropCollection = function (cb) {
  Following.collection.drop(cb);
};

Following.findById = function (id, cb) {
  Following.collection.findOne({_id: id}, function (err, following) {
    cb(err, setPrototype(following));
  });
};

Following.findAll = function (cb) {
  Following.collection.find().toArray(function (err, followings) {
    var prototypedFollowings = followings.map(function (following) {
      return setPrototype(following);
    });

    cb(err, prototypedFollowings);
  });
};

module.exports = Following;

function setPrototype(pojo) {
  return _.create(Following.prototype, pojo);
}
