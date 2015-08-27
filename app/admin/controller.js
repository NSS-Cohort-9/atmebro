var User = require('./admin');

module.exports.adminToggle = function (req, res) {
  var user_id = req.params.id;
  User.toggleAdminStatus(user_id);
  res.redirect('/users');
};

module.exports.showUsers = function (req, res) {
  User.findAll(function (err, users) {
    if (err) { throw err; }
    res.render('admin/index', {users: users});
  });
};