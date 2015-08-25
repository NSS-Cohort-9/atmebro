'use strict';

var Followers = require('./Followers');
var Following = require('./Following');
var User = require('./User')

//Find all followers of a user given a route _.id
module.exports.getFollowers = function (req, res) { // NEED TO IMPLEMENT ON THE USER PROFILE TEMPLATE SIDE
  Followers.findById(req.params.id, function(err, followers) {
    res.render('user/profile', {followers: followers})
  })
};

// follow a user and add user to following
module.exports.follow = function (req, res) {
  Followers.follow(req.params.id, req.session.id, function (err) { // NEED USER PARAMS AND SESSION SETUP
    Following.follow(req.session.id, req.params.id, function (err, following) {
      res.render('follow/profile', {following: following})
    })
  });
};

//unfollow user
module.exports.unfollow = function (req, res) {
  Followers.unfollowUser(req.params.id, req.session.id, function (err) { // NEED USER PARAMS AND SESSION SETUP
    Following.unfollowUser(req.session.id, req.params.id, function (err, following) {
      res.render('follow/profile')
    })
  });
};

// find who a user follows given a route _id
module.exports.userFollowing = function (req, res) {
  Following.findById(req.params.id, function (err, followers) {
    res.render('follow/userFollowers', {following: following});
  });
};


