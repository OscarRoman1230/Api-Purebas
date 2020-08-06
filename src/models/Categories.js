const pool = require('../database');

exports.getCategories = async function(req, res, next){
    const data = await pool.query("SELECT * FROM categoria");
    console.log(data);
    res.json({data: data, message: 'all products'});
}
