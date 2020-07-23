const express = require('express');
const router = express.Router();
const User = require('../models/User');

// get Users
router.get('/', User.getUsers);

module.exports = router;