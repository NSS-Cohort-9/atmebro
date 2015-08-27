'use strict';

var passport = require('passport');
var User = require('./User');

module.exports.authTwitter = passport.authenticate('twitter');

module.exports.authTwitterCb = passport.authenticate('twitter', {
  successRedirect: '/:id/profile',
  failureRedirect: '/'
});

module.exports.logout = function (req, res) {
  req.logout();
  res.redirect('/');
};

module.exports.show = function (req, res) {
	User.findAllUsers(function (err, users) {
	res.render('user/profile', {users: users});
	});

};