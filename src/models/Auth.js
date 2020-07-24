const pool = require('../database');
const helpers = require('../lib/helpers');
const jwt = require('jsonwebtoken');

exports.singUp = async function(req, res, next){

    const newUser = {
        email: req.body.email,
        password: '',
        fullname: req.body.fullname,
        estado: req.body.estado
    }
    const user = await pool.query('SELECT * FROM users WHERE email = ?', newUser.email);
    if (user.length !== 0) {
        return res.json({message: 'this user already exist in the system', status: 2});
    }
    newUser.password = await helpers.encryptPassword(req.body.password);
    const result = await pool.query('INSERT INTO users SET ?', newUser);

    return res.json({message: 'user has created', result: result, status: 1});
}

exports.singIn = async function(req, res, next) {
    const auth = {
        email: req.body.email,
        password: req.body.password
    }

    const user = await pool.query('SELECT * FROM users WHERE email = ?', auth.email);

    if (user.length > 0) {
        const validPassword = await helpers.matchPassword(auth.password, user[0].password);
        if (validPassword) {
            const token = jwt.sign({_id: user[0].id}, 'secretkey', {
                expiresIn: 1440
            });
            return res.json({token: token, user: user[0], message: 'auth is successful', status: 1});
        } else {
            return res.json({message: 'password or email is incorrect', status: 2});
        }
    } else {
        return res.json({message: 'The email does not exists', status: 2});
    }
}