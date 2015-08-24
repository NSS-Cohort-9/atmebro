'use strict';
var ObjectID = require('mongodb').ObjectID;
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
Followers.count = function (cb) {
  return Followers.collection.count(cb);
};
Followers.create = function (followers, cb) {
  Followers.collection.insertOne(followers, cb);
};
Followers.dropCollection = function (cb) {
  Followers.collection.drop(cb);
};
Followers.findById = function (id, cb) {
  Followers.collection.findOne({_id: ObjectID(id)}, function (err, followers) {
    cb(err, setPrototype(followers));
  });
};
Followers.findAll = function (cb) {
  Followers.collection.find().toArray(function (err, followerss) {
    var prototypedFollowerss = followerss.map(function (followers) {
      return setPrototype(followers);
    });
    cb(err, prototypedFollowerss);
  });
};
module.exports = Followers;
function setPrototype(pojo) {
  return _.create(Followers.prototype, pojo);
}
