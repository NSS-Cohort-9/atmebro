'use strict';

var ObjectID = require('mongodb').ObjectID;
var _ = require('lodash');

// var mongo = require('../../lib/mongo/');

function query(sql, paramsOrCb, cb) {
  var callback = typeof paramsOrCb === 'function' ? paramsOrCb : cb;

  var pg = require('pg');
  var url = "postgres://localhost/atmebro";

  pg.connect(url, function(err, client, done) {
    if(err) {
      return console.error('error fetching client from pool', err);
    }

    client.query(sql, paramsOrCb, function(err, result) {
      done();
      callback(err, result.rows);
    });
  });
}


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
  // Post.collection.insertOne(post, cb);
  var sql = `INSERT INTO posts (${Object.keys(post).toString()}) VALUES ($1)`;
  var values = Object.keys(post).map(key => post[key]);

  query(sql, values, cb);
};

Post.setHidden = function (id, cb) {
  Post.collection.findOneAndUpdate({_id: ObjectID(id)},
    {$set: {hidden : true}},
    {returnOriginal : false},
  cb);
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
  // Post.collection.find({hidden: {$ne: true}}).toArray(function (err, posts) {
  //   var prototypedPosts = posts.map(function (post) {
  //     return setPrototype(post);
  //   });

  //   cb(err, prototypedPosts);
  // });
  query('SELECT * FROM posts', function (err, posts) {
    if (err) throw err;
    console.log('posts', posts)

    var prototypedPosts = posts.map(function (post) {
      return setPrototype(post);
    });

    cb(err, prototypedPosts);
  })
};

module.exports = Post;

function setPrototype(pojo) {
  return _.create(Post.prototype, pojo);
}
