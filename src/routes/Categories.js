const express = require('express');
const router = express.Router();
const Categories = require('../models/Categories');

router.get('/', Categories.getCategories);

module.exports = router;
