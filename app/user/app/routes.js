'use strict';

var express = require('express');
var router = express.Router();

var ctrl = require('./controller');

router.get('/profile', isLoggedIn, ctrl.show);
router.get('/logout', ctrl.logout);

router.get('/auth/twitter', ctrl.authTwitter);
router.get('/auth/twitter/callback', ctrl.authTwitterCb);
router.get('/connect/twitter', ctrl.connectTwitter);
router.get('/connect/twitter/callback', ctrl.connectTwitterCb);
router.get('/unlink/twitter', isLoggedIn, ctrl.unlinkTwitter);

module.exports = router;

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect('/');
}
