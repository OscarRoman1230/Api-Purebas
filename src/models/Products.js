const pool = require('../database');

exports.getProducts = async function(req, res, next){
    const data = await pool.query(`SELECT id,
        nombre, descripcion, concat('$', format(valor, 2)) as valor, valor as valor2, url_img, categoria_id 
        FROM productos`);
    res.json({data: data, message: 'all products'});
}

exports.getProductsByCat = async function(req, res, next){
    const data = req.params;
    const datos = await pool.query(`SELECT id, nombre, descripcion, 
        concat('$', format(valor, 2)) as valor, valor as valor2, url_img, categoria_id 
        FROM productos WHERE categoria_id = ?`, data.id);
    res.json({data: datos, message: 'all products by categorie'});
}
