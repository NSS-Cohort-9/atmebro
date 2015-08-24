'use strict';


module.exports.show = function (req, res) {
  res.render('user/views/profile', { user: req.user });
};

module.exports.logout = function (req, res) {
  req.logout();
  res.redirect('/');
};

module.exports.authTwitter = function () {
  console.log('authTwitter');
  global.passport.authenticate('twitter', { scope : 'email' });
};

module.exports.authTwitterCb = function () {
  console.log('authTwitterCb');
  global.passport.authenticate('twitter', {
    successRedirect : '/profile',
    failureRedirect : '/'
  });
};

module.exports.connectTwitter = function () {
  global.passport.authorize('twitter', { scope : 'email' });
};

module.exports.connectTwitterCb = function () {
  global.passport.authorize('twitter', {
    successRedirect : '/profile',
    failureRedirect : '/'
  });
};

module.exports.unlinkTwitter = function (req, res) {
  var user = req.user;

  user.twitter.token = null;

  user.save(function () {
    res.redirect('/profile');
  });
};
