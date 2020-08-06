const pool = require('../database');

exports.saveSale = async function(req, res, next) {
    const data = req.body;
    const array = data.data;
    const cliente = {
        fullname: 'cliente predeterminado',
        telefono: '3201008008',
        direccion: 'calle falsa 123'
    }
    await pool.query('INSERT INTO cliente SET ?', cliente);
    const idclient = await pool.query('SELECT MAX(id) AS id FROM cliente;');
    console.log(idclient);
    var f = new Date();
    for (let i = 0; i < array.length; i++) {
        const venta = {
            producto_id: array[i].product.id,
            cliente_id: idclient.id,
            cantidad: array[i].cantidad,
            fecha: f
        }
        const data = await pool.query('INSERT INTO venta SET ?', venta);
        console.log(data);
    }
    res.json({message: 'Sale save successfully'});
}
