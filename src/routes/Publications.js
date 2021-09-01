const express = require('express');
const router = express.Router();
const Publications = require('../models/Publications');

router.get('/', Publications.getPublications);
router.get('/:id', Publications.getMyPublications);
router.post('/create', Publications.createPublication);
router.put('/update', Publications.updatePublication);
router.put('/delete', Publications.deletePublication);

module.exports = router;
