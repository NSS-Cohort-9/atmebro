'use strict';

var express = require('express');
var router = express.Router();

var ctrl = require('./controller');
var geo = require('../geolocation/geolocation')

router.get('/', ctrl.index);
router.post('/post', geo.submitLoc, ctrl.create);
router.get('/post/:id', ctrl.show);

module.exports = router;
