'use strict';

var express = require('express');
var router = express.Router();

var ctrl = require('./controller');

router.get('/', ctrl.index);
router.post('/post', ctrl.create);
router.get('/post/:id', ctrl.show);


// get all users
router.get('/', ctrl.userIndex)
// get all followers of a user 
router.get('/followers', ctrl.getFollowers)

// go to an individual user
router.get('/users/:id', ctrl.userPage)

// get all users i'm following
router.get('/profile/', ctrl.follow)

// follow a user
router.get('/follow/:id', ctrl.follow)

// unfollow a user


module.exports = router;