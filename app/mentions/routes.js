'use strict';

var express = require('express');
var router = express.Router();

var mentions = require('./mentions');
var mentionsMailer = require('../mentions/mentions.js');

module.exports = router;
