'use strict';

var User = require('../user/User');

module.exports.adminToggle = function (req, res) {
  User.toggleAdminStatus(User.adminStatus);
  res.redirect('/users');
};