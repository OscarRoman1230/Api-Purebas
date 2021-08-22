const pool = require('../database');

exports.getTickets = async function(req, res, next){
    const userHistoryId = req.params.id;
    const data = await pool.query('SELECT * FROM tickets WHERE userHistoryId = ? AND deletedAt = null', userHistoryId);
    res.json({data: data, message: 'all tickets'});
}

exports.createTicket = async function(req, res, next){
    const newTicket = {
        name: req.body.name,
        description: req.body.description,
        createdAt: new Date(),
        userHistoryId: req.body.userHistoryId,
        ticketStatusId: req.body.ticketStatusId
    }
    const result = await pool.query('INSERT INTO tickets SET ?', newTicket);
    res.json({res: result, message: 'ticket created'});
}

exports.updateTicket = async function(req, res, next){
    const id = req.body.id;
    const updateTicket = {
        name: req.body.name,
        description: req.body.description,
        updatedAt: new Date(),
        userHistoryId: req.body.userHistoryId,
        ticketStatusId: req.body.ticketStatusId
    }
    const result = await pool.query('UPDATE tickets SET ? WHERE id = ?', updateTicket, id);
    res.json({res: result, message: 'updating ticket'});
}

exports.deleteTicket = async function(req, res, next){
    const deleteTicket = {
        id: req.body.id,
        deletedAt: new Date()
    }
    const result = await pool.query('UPDATE tickets SET ? WHERE id = ?', deleteTicket, deleteTicket.id);
    res.json({res: result, message: 'ticket deleting'});
}
