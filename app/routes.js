'use strict';

var express = require('express');
var router = express.Router();

var home = require('./home/routes');
var post = require('./post/routes');
var login = require('./user/app/routes')

router.use('/', login);
router.use('/', home);
router.use('/', post);

module.exports = router;
