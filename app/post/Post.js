'use strict';

var ObjectID = require('mongodb').ObjectID;
var _ = require('lodash');

var mongo = require('../../lib/mongo/');

function Post(p) {
  this.text = p.text;
}

Object.defineProperty(Post, 'collection', {
  get: function () {
    return mongo.getDb().collection('posts');
  }
});

Post.count = function (cb) {
  return Post.collection.count(cb);
};

Post.create = function (post, cb) {
  Post.collection.insertOne(post, cb);
};

Post.dropCollection = function (cb) {
  Post.collection.drop(cb);
};

Post.findById = function (id, cb) {
  Post.collection.findOne({_id: ObjectID(id)}, function (err, post) {
    cb(err, setPrototype(post));
  });
};

Post.findAll = function (cb) {
  Post.collection.find().toArray(function (err, posts) {
    var prototypedPosts = posts.map(function (post) {
      return setPrototype(post);
    });

    cb(err, prototypedPosts);
  });
};

Post.sorter = function (cb) {
  return arr.sort(function (a, b) {
    return a.date - b.date;
  }).reverse(cb);
}

Post.tenAtATime = function (cursor, i) {
  cursor.find().sort({_id: -1}).limit(10).skip(i);
}


module.exports = Post;

function setPrototype(pojo) {
  return _.create(Post.prototype, pojo);
}
