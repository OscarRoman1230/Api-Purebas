const pool = require('../database');

exports.getUsers = async function(req, res, next) {
    const users = await pool.query('select * from users');
    console.log(users);
    res.json(users);
}

exports.newUser = async function (req, res, next) {
    const newUser = {
        email: req.body.email,
        password: req.body.password,
        fullname: req.body.fullname,
        estado: req.body.estado
    }

    const users = await pool.query('INSERT INTO users SET ?', newUser);
    res.json(users);
}
