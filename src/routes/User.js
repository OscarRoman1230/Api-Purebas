const express = require('express');
const router = express.Router();
const User = require('../models/User');

// get Users enabled
router.get('/', User.getUsersEnable);

// get Users disabled
router.get('/disable', User.getUsersDisable);

// update User
router.put('/update', User.updateUser);

// disable User
router.put('/disable/:email', User.disableUser);

// enable User
router.put('/enable/:email', User.enableUser);

module.exports = router;