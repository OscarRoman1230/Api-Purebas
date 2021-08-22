const pool = require('../database');

exports.getTicketStatus = async function(req, res, next){
    const data = await pool.query('SELECT * FROM ticketStatus WHERE deletedAt = null');
    res.json({data: data, message: 'all ticket status'});
}

exports.createTicketStatus = async function(req, res, next){
    const newTicketStatus = {
        description: req.body.description,
        createdAt: new Date()
    }
    const result = await pool.query('INSERT INTO ticketStatus SET ?', newTicketStatus);
    res.json({res: result, message: 'ticket status created'});
}

exports.updateTicketStatus = async function(req, res, next){
    const id = req.body.id;
    const updateTicketStatus = {
        description: req.body.description,
        updatedAt: new Date()
    }
    const result = await pool.query('UPDATE ticketStatus SET ? WHERE id = ?', updateTicketStatus, id);
    res.json({res: result, message: 'updating ticket status'});
}

exports.deleteTicketStatus = async function(req, res, next){
    const deleteTicketStatus = {
        id: req.body.id,
        deletedAt: new Date()
    }
    const result = await pool.query('UPDATE ticketStatus SET ? WHERE id = ?', deleteTicketStatus, deleteTicketStatus.id);
    res.json({res: result, message: 'ticket status deleting'});
}
