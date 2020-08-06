const express = require('express');
const router = express.Router();
const Product = require('../models/Products');

router.get('/', Product.getProducts);
router.get('/:id', Product.getProductsByCat);

module.exports = router;
