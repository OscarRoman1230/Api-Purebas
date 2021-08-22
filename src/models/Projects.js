const pool = require('../database');

exports.getProjects = async function(req, res, next){
    const companyId = req.params.id;
    const data = await pool.query('SELECT * FROM projects WHERE companyId = ? AND deletedAt = null', companyId);
    res.json({data: data, message: 'all products'});
}

exports.createProject = async function(req, res, next){
    const newProject = {
        name: req.body.name,
        createdAt: new Date(),
        companyId: req.body.companyId
    }
    const result = await pool.query('INSERT INTO projects SET ?', newProject);
    res.json({res: result, message: 'project created'});
}

exports.updateProject = async function(req, res, next){
    const id = req.body.id;
    const updateProject = {
        name: req.body.name,
        updatedAt: new Date(),
        companyId: req.body.companyId
    }
    const result = await pool.query('UPDATE projects SET ? WHERE id = ?', updateProject, id);
    res.json({res: result, message: 'updating project'});
}

exports.deleteProject = async function(req, res, next){
    const deleteProject = {
        id: req.body.id,
        deletedAt: new Date()
    }
    const result = await pool.query('UPDATE projects SET ? WHERE id = ?', deleteProject, deleteProject.id);
    res.json({res: result, message: 'project deleting'});
}
