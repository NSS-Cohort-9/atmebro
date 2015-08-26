'use strict';

var Followers = require('./Followers');

module.exports.getFollowers = function (req, res) {
  Followers.allFollowers(req.params.id, function (err, followers) {
    if (err) { throw err; }
    res.render('user/profile', {followers: followers});
  });
};

module.exports.getFollowing = function (req, res) {
  Followers.allFollowing(req.params.id, function (err, following) {
    if (err) { throw err; }
    res.render('user/profile', {following: following});
  });
};

module.exports.follow = function (req, res) {
  Followers.findOrCreate(req.params.id, function (err, follow) {
    res.render('user/profile', {follow: follow});
  });
};

module.exports.unfollow = function (req, res) {
  Followers.destroy(req.params.id, function (err, unfollow) {
    res.render('user/profile', {unfollow: unfollow});
  });
};
