var User = require('./admin');

module.exports.adminToggle = function (req, res) {
  var user_id = req.params.id;
  User.toggleAdminStatus(user_id);
  res.redirect('/users');
};