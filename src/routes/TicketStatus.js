const express = require('express');
const router = express.Router();
const TicketStatus = require('../models/TicketStatus');

router.get('/', TicketStatus.getTicketStatus);
router.post('/create', TicketStatus.createTicketStatus);
router.put('/update', TicketStatus.updateTicketStatus);
router.put('/delete', TicketStatus.deleteTicketStatus);

module.exports = router;
