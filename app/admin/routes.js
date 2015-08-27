'use strict';

var express = require('express');
var router = express.Router();

var ctrl = require('./controller');

router.get('/users', ctrl.showUsers);
router.get('/users/:id', ctrl.adminToggle);

module.exports = router;