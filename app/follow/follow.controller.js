'use strict';

var Followers = require('./Followers');
var Following = require('./Following');
var User = require('./User')

module.exports.getFollowers = function (req, res) { // NEED TO IMPLEMENT ON THE USER PROFILE TEMPLATE SIDE
  Followers.findById(req.params.id, function(err, followers) {
    res.render('user/profile', {followers: followers})
  })
};

module.exports.follow = function (req, res) {
  Followers.follow(req.params.id, req.session.id, function (err) {
    Following.follow(req.session.id, req.params.id, function (err, following) {
      res.render('follow/profile', {following: following})
    })
  });
};

module.exports.userPage = function (req, res) {
  Followers.findById(req.params.id, function (err, followers) {
    res.render('follow/userFollowers', {followers: followers});
  });
};

module.exports.index = function (req, res) {
  Followers.findAll(function (err, followers) {
    if (err) { throw err; }
    res.render('follow/index', {followers: followers});
  });
};

