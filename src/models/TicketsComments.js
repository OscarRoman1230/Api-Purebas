const pool = require('../database');

exports.getTicketsComments = async function(req, res, next){
    const ticketId = req.body.ticketId;
    const data = await pool.query('SELECT * FROM ticketsComments WHERE ticketId = ? deletedAt = null', ticketId);
    res.json({data: data, message: 'all ticket status'});
}

exports.createTicketsComments = async function(req, res, next){
    const newTicketStatus = {
        description: req.body.description,
        createdAt: new Date(),
        ticketId: req.body.ticketId,
        userId: req.body.userId
    }
    const result = await pool.query('INSERT INTO ticketsComments SET ?', newTicketStatus);
    res.json({res: result, message: 'ticket status created'});
}
