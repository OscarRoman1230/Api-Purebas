const express = require('express');
const router = express.Router();
const auth = require('../models/Auth');

// register user
router.post('/singup', auth.singUp);

// auth user system
router.post('/singin', auth.singIn);

module.exports = router;
