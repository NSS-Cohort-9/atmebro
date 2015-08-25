'use strict';

var express = require('express');
var router = express.Router();

var ctrl = require('./follow.controller');

// find all followers of a user by user_.id
router.get('/followers', ctrl.getFollowers)

// find out who users are following

// go to an individual user


// get all users i'm following


// follow a user
router.get('/follow/:id', ctrl.follow)

// unfollow a user


module.exports = router;