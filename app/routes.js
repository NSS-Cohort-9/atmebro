'use strict';

var express = require('express');
var router = express.Router();

var home = require('./home/routes');
var post = require('./post/routes');
var follow = require('./follow/routes')

router.use('/', home);
router.use('/', post);
router.use('/', follow);

module.exports = router;
