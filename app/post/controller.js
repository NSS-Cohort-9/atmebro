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
    if (err) { throw err; }
    res.render('post/show', {post: post});
  });
};

module.exports.parse = function (req, res, next) {
  req.body.content = Post.parse(req.body.text);
  next();
};
