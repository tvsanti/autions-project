const express = require('express')
const router = express.Router()
const db = require('../database')
const connection = db()




router.get('/api', async (req, res) => {
    try {
        const [results] = await connection.query('SELECT * FROM producto')
        res.json(results);
    } catch (error) {
        res.status(404).send("Error")
    }
})

router.post('/api', async(req, res) => {
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
    try {
        const [results] = await connection.query('INSERT INTO producto SET ?',[objeto])
        res.send(results)
    } catch (error) {
        res.status(404).send(error)
    }
})

router.post('/login', async(req, res) => {
    try {
        const objeto = req.body
        const [mailExists] =  await connection.query('SELECT mail FROM cliente')
        if (mailExists.length < 1) {
            const [results] = await connection.query('INSERT INTO cliente SET ?',[objeto])
            res.send(results)
        }
    } catch (error) {
        res.status(404).send(error)
    }
})

module.exports = router