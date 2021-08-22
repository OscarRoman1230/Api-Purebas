const pool = require('../database');

exports.getUserHistories = async function(req, res, next){
    const projectId = req.params.id;
    const data = await pool.query('SELECT * FROM userHistory WHERE projectId = ? AND deletedAt = null', projectId);
    res.json({data: data, message: 'all user history'});
}

exports.createUserHistory = async function(req, res, next){
    const newUserHistory = {
        name: req.body.name,
        description: req.body.description,
        createdAt: new Date(),
        projectId: req.body.companyId
    }
    const result = await pool.query('INSERT INTO userHistory SET ?', newUserHistory);
    res.json({res: result, message: 'user history created'});
}

exports.updateUserHistory = async function(req, res, next){
    const id = req.body.id;
    const updateUserHistory = {
        name: req.body.name,
        description: req.body.description,
        updatedAt: new Date(),
        projectId: req.body.projectId
    }
    const result = await pool.query('UPDATE userHistory SET ? WHERE id = ?', updateUserHistory, id);
    res.json({res: result, message: 'updating user history'});
}

exports.deleteUserHistory = async function(req, res, next){
    const deleteUserHistory = {
        id: req.body.id,
        deletedAt: new Date()
    }
    const result = await pool.query('UPDATE userHistory SET ? WHERE id = ?', deleteUserHistory, deleteUserHistory.id);
    res.json({res: result, message: 'user history deleting'});
}
