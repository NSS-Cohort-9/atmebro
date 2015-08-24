'use strict';

var express = require('express');
var router = express.Router();

var home = require('./home/routes');
var post = require('./post/routes');
var mentions = require('./mentions/routes');

router.use('/', home);
router.use('/', post);
router.use('/', mentions);

module.exports = router;
