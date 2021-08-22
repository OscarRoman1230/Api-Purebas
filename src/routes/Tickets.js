const express = require('express');
const router = express.Router();
const Tickets = require('../models/Tickets');

router.get('/:id', Tickets.getTickets);
router.post('/create', Tickets.createTicket);
router.put('/update', Tickets.updateTicket);
router.put('/delete', Tickets.deleteTicket);

module.exports = router;
