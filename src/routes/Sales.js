const express = require('express');
const router = express.Router();
const Sales = require('../models/Sales');

router.post('/save', Sales.saveSale);

module.exports = router;
