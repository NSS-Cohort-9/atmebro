'use strict';

var passport = require('passport');
var User = require('./User');

module.exports.authTwitter = passport.authenticate('twitter');

module.exports.authTwitterCb = passport.authenticate('twitter', {
  successRedirect: '/landing',
  failureRedirect: '/'
});

module.exports.logout = function (req, res) {
  req.logout();
  res.redirect('/');
};

module.exports.show = function (req, res) {
	User.findAllUsers(function (err, users) {
	res.render('user/landing', {users: users});
	});
};

module.exports.follow = function (req, res) {
  Followers.findOrCreate(req.params.id, req.user, function (err, follow) {
    if (err) {
  		res.send(err);
  	}
    res.send(200);
  });
};

module.exports.unfollow = function (req, res) {
  Followers.destroy(req.params.id, User._id, function (err, unfollow) {
  	if (err) {
  		res.send(err);
  	}
    res.send(200);
  });
};