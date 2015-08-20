var express = require('express');
var router = express.Router();

var geo = require('./geolocation');

router.get('/', geo.getLoc);
router.post('/submit', geo.submitLoc)

module.exports = router;
