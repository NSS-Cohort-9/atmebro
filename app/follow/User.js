'use strict';

var _ = require('lodash');

var mongo = require('../../lib/mongo/');

function User(p) {
  this.text = p.text;
}

Object.defineProperty(User, 'collection', {
  get: function () { // the function returned will be used as the value of the property
    return mongo.getDb().collection('user');
  }
});


User.dropCollection = function (cb) {
  User.collection.drop(cb);
};


module.exports = User;

