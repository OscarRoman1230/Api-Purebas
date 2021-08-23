const express = require('express');
const router = express.Router();
const TicketsComments = require('../models/TicketsComments');

router.get('/', TicketsComments.getTicketsComments);
router.post('/create', TicketsComments.createTicketsComments);

module.exports = router;
