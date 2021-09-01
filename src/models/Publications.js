const pool = require('../database');

exports.getPublications = async function(req, res, next){
    const data = await pool.query(`SELECT p.description, p.link, p.createdAt, u.fullName FROM publications p
                                    INNER JOIN users u ON p.userId = u.id 
                                    WHERE p.deletedAt IS NULL`);
    res.json({data: data, message: 'all publications'});
}

exports.getMyPublications = async function(req, res, next){
    const userId = req.params.id;
    const data = await pool.query(`SELECT p.description, p.link, p.createdAt, u.fullName FROM publications p
                                    INNER JOIN users u ON p.userId = u.id 
                                    WHERE p.userId = ? AND p.deletedAt IS NULL`, userId);
    res.json({data: data, message: 'all publications by this user'});
}

exports.createPublication = async function(req, res, next){
    const newPublication = {
        description: req.body.description,
        link: req.body.link,
        createdAt: new Date(),
        userId: req.body.userId
    }
    const result = await pool.query('INSERT INTO publications SET ?', newPublication);
    res.json({res: result, message: 'publication created'});
}

exports.updatePublication = async function(req, res, next){
    const id = req.body.id;
    const updatePublication = {
        description: req.body.description,
        link: req.body.link,
        updatedAt: new Date(),
        userId: req.body.userId
    }
    const result = await pool.query('UPDATE publications SET ? WHERE id = ?', [updatePublication, id]);
    res.json({res: result, message: 'updating publication'});
}

exports.deletePublication = async function(req, res, next){
    const deletePublication = {
        id: req.body.id,
        deletedAt: new Date()
    }
    const result = await pool.query('UPDATE publications SET ? WHERE id = ?', [deletePublication, deletePublication.id]);
    res.json({res: result, message: 'publication deleting'});
}
