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
        return res.json({message: 'this user already exist in the system'});
    }
    newUser.password = await helpers.encryptPassword(req.body.password);
    const result = await pool.query('INSERT INTO users SET ?', newUser);

    return res.json({message: 'user has created', result: result});
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
            const token = jwt.sign(payload, 'secretkey', {
                expiresIn: 1440
            });

            return res.json({token: token, message: 'auth is successful'});
        } else {
            return res.json({message: 'password or email is incorrect'});
        }
    } else {
        return res.json({message: 'The email does not exists'});
    }
}