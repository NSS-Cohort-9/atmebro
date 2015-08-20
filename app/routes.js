'use strict';

var express = require('express');
var router = express.Router();

var home = require('./home/routes');
var geo = require('./geolocation/routes')

router.use('/', home);
router.use('/geolocation', geo)
module.exports = router;
