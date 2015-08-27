'use strict';

var express = require('express');
var router = express.Router();

var home = require('./home/routes');
var post = require('./post/routes');
var user = require('./user/routes');
var follow = require('./follow/routes');

router.use('/', home);
router.use('/', post);
router.use('/', user);
router.use('/', follow);


router.use(function (req, res, next) {
  if (req.user) {
    res.locals.user = req.user;
  }
  next();
});



module.exports = router;
