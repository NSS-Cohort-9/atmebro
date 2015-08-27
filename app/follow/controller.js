'use strict';

var Followers = require('./Followers');
var mongo = require('../../lib/mongo/');
var User = require('./User');

// if (!res.locals.user) {
//   var localUser = ['Drake', 'Lazer']
// } else {
//   var local = res.locals.user
//   var localUser = [local, local]
//   console.log(res.locals.user)
// }

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
  Followers.findOrCreate(req.params.id, User._id, function (err, follow) {
    res.render('user/profile', {follow: follow});
  });
};

module.exports.unfollow = function (req, res) {
  Followers.destroy(req.params.id, User._id, function (err, unfollow) {
    res.render('user/profile', {unfollow: unfollow});
  });
};
