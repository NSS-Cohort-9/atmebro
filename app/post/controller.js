'use strict';

var Post = require('./Post');

module.exports.index = function (req, res) {
  Post.findAll(function (err, posts) {
    if (err) { throw err; }
    res.render('post/index', {posts: posts});
  });
};

module.exports.create = function (req, res) {
  Post.create(req.body, function (err) {
    if (err) { throw err; }
    res.redirect('/');
  });
};

module.exports.show = function (req, res) {
  Post.findById(req.params.id, function (err, post) {
    res.render('post/show', {post: post});
  });
};

module.exports.follow = function (req, res) {
  Followers.findOrCreate(req.params.id, User._id, function (err, follow) {
    res.render('user/profile', {follow: follow});
  });
};

module.exports.unfollow = function (req, res) {
  Followers.destroy(req.params.id, User._id, function (err, unfollow) {
    res.render('user/profile', {unfollow: unfollow});
  });
};