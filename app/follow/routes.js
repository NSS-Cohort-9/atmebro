'use strict';

var express = require('express');
var router = express.Router();

var ctrl = require('./follow.controller');

// find all followers of a user by user_.id
router.get('/followers/:id', ctrl.getFollowers)

// follow a user
router.get('/follow/:id', ctrl.follow)

// unfollow a user
router.get('/unfollow/:id', ctrl.unfollow) 

// find out who users are following
router.get('/following/:id', ctrl.userFollowing)



module.exports = router;