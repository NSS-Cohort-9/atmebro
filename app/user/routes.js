'use strict';

var express = require('express');
var router = express.Router();

var ctrl = require('./controller');


router.get('/auth/twitter', ctrl.authTwitter);
router.get('/auth/twitter/cb', ctrl.authTwitterCb);

router.get('/logout', ctrl.logout);

router.get('/landing', ctrl.show);

router.get('/:id/profile', isLoggedIn, ctrl.show); // have to be logged in to view profiles

module.exports = router;

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect('/');
}
