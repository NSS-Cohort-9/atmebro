'use strict';

var express = require('express');
var router = express.Router();

var ctrl = require('./controller');

// find all followers of a user 
router.get('/:id/followers', ctrl.getFollowers)

// find all users an individual is following
router.get('/:id/following', ctrl.getFollowing)

// follow a user
router.post('/:id/follow', ctrl.follow)

// unfollow a user
router.delete('/:id/follow', ctrl.unfollow) 


module.exports = router;