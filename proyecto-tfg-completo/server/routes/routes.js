const express = require('express')
const router = express.Router()
const db = require('../database')
const connection = db()



router.get('/api', async (req, res) => {
    const [results] = await connection.query('SELECT * FROM producto')
    res.json(results);
})

router.post('/api', async(req, res) => {
    console.log(req.body);
    const objeto = {
        title: req.body.titulo,
        description: req.body.descripcion,
        condition: req.body.estado,
        time_left: '2020/01/01',
        price: req.body.precio,
        img: '2020/01/01',
        created_by: 1,
        categoria: req.body.categoria,
    }
    const [results] = await connection.query('INSERT INTO producto SET ?',[objeto])
    console.log(results);
    res.send(results)
})

router.post('/api', )
module.exports = router