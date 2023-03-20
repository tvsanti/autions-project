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
        created_by: req.query.id_user,
        categoria: req.body.categoria,
    }
    const [results] = await connection.query('INSERT INTO producto SET ?',[objeto])
    console.log(results);
    res.send(results)
})

router.post('/login', async(req, res) => {
    try {
        const objeto = req.body
        const [mailExists] =  await connection.query('SELECT mail FROM cliente')
        console.log(mailExists);
        console.log(123);
        if (mailExists.length < 1) {
            const [results] = await connection.query('INSERT INTO cliente SET ?',[objeto])
            res.send(results)
        }
    } catch (error) {
        res.send(error)
    }
})

module.exports = router