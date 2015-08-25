'use strict';

var ObjectID = require('mongodb').ObjectID;
var _ = require('lodash');

var mongo = require('../../lib/mongo/');

function User(p) {
  this.text = p.text;
}

Object.defineProperty(User, 'collection', {
  get: function () {
    return mongo.getDb().collection('user');
  }
});


User.dropCollection = function (cb) {
  User.collection.drop(cb);
};

User.findById = function (id, cb) {
  User.collection.findOne({_id: id}, function (err, user) {
    cb(err, setPrototype(user));
  });
};

User.findAll = function (cb) {
  User.collection.find().toArray(function (err, users) {
    var prototypedUsers = users.map(function (user) {
      return setPrototype(user);
    });

    cb(err, prototypedUsers);
  });
};

module.exports = User;

function setPrototype(pojo) {
  return _.create(User.prototype, pojo);
}
