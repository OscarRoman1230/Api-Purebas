const pool = require('../database');
const helpers = require('../lib/helpers');

exports.getUsersEnable = async function(req, res, next) {
    const users = await pool.query("select * from users WHERE estado = 'activo'");
    //console.log(users);
    return res.json(users);
}

exports.getUsersDisable = async function(req, res, next) {
    const users = await pool.query("select * from users WHERE estado = 'inactivo'");
    //console.log(users);
    return res.json(users);
}

exports.newUser = async function (req, res, next) {
    const newUser = {
        email: req.body.email,
        password: req.body.password,
        fullname: req.body.fullname,
        estado: req.body.estado
    }

    const users = await pool.query('INSERT INTO users SET ?', newUser);
    return res.json(users);
}

exports.updateUser = async function(req, res, next) {
    const { id, email} = req.body;
    const newUser = {
        email,
        fullname: req.body.fullname,
        estado: req.body.estado
    };
    const user = await pool.query('SELECT * FROM users WHERE id = ?', id);
    if (user.length > 0) {
        const result = await pool.query('UPDATE users SET ? WHERE id = ?', [newUser, user[0].id]);
        return res.json({message: 'user has updated', result: result});
    } else {
        return res.json({message: 'this user does not exist in the system'});
    }

}

exports.disableUser = async function(req, res, next) {
    const {email} = req.params;
    const disable = {
        estado: req.body.estado
    };
    const user = await pool.query('SELECT * FROM users WHERE email = ?', email);
    if(user.length > 0) {
        const result = await pool.query('UPDATE users SET ? WHERE id = ?', [disable, user[0].id]);
        return res.json({message: 'user has been disabled', result: result});
    } else {
        return res.json({message: 'this user does not exist in the system'});
    }
}

exports.enableUser = async function(req, res, next) {
    const {email} = req.params;
    const disable = {
        estado: req.body.estado
    };
    const user = await pool.query('SELECT * FROM users WHERE email = ?', email);
    if(user.length > 0) {
        const result = await pool.query('UPDATE users SET ? WHERE id = ?', [disable, user[0].id]);
        return res.json({message: 'user has been enabled', result: result});
    } else {
        return res.json({message: 'this user does not exist in the system'});
    }
}
