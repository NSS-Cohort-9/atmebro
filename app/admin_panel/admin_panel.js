'use strict';

var express = require('express');
var router = express.Router();

var ctrl = require('./controller');

router.get('/admin_panel', ctrl.admin_panel);

module.exports = router;
