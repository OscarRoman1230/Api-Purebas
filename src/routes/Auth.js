const express = require('express');
const router = express.Router();
const auth = require('../models/Auth');

// register user
router.post('/sign-up', auth.signUp);

// auth user system
router.post('/sign-in', auth.signIn);

module.exports = router;
