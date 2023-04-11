const express = require('express')
const router = express.Router()
const app = express();

const db = require('../database')
const connection = db()
const multer = require('multer')
const fs = require('fs')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const folderPath = `../public/images/${app.locals.id}`;
        fs.mkdirSync(folderPath, { recursive: true });
        cb(null, folderPath)
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})
const upload = multer({ storage: storage })

router.get('/api', async (req, res) => {
    try {
        const [results] = await connection.query('SELECT * FROM producto')
        res.json(results);
    } catch (error) {
        res.status(404).send("Error")
    }
})
router.get('/api/:id', async (req, res) => {
    try {
        const [results] = await connection.query('SELECT * FROM producto WHERE categoria = ?', [req.params.id])
        res.json(results);
    } catch (error) {
        res.status(404).send("Error")
    }
})
router.get('/api', async (req, res) => {
    try {
        const [results] = await connection.query('SELECT * FROM producto')
        res.json(results);
    } catch (error) {
        res.status(404).send("Error")
    }
})

router.post('/api', async (req, res) => {
    let directoryPath = `../public/images/${req.body.created_by}`
    fs.mkdirSync(directoryPath, { recursive: true });
    req.body.rutaImg = '/'+req.body.rutaImgPortada
    const objeto = {
        title: req.body.titulo,
        description: req.body.descripcion,
        condition: req.body.estado,
        time_left: '2020/01/01',
        price: req.body.precio,
        img: req.body.rutaImg,
        created_by: req.body.created_by,
        categoria: req.body.categoria,
    }
    app.locals.id = req.body.created_by
    const [results] = await connection.query('INSERT INTO producto SET ?', [objeto])
    res.send(results)

    // try {
    // } catch (error) {
    //     res.status(404).send(error)
    // }
})

router.post("/api/localImages", upload.array('files'), async (req, res) => {
    res.json({ files: req.files })

});


router.post('/register', async (req, res) => {
    try {
        const objeto = req.body
        const [mailExists] = await connection.query('SELECT mail FROM cliente')
        if (mailExists.length < 1) {
            const [results] = await connection.query('INSERT INTO cliente SET ?', [objeto])
            res.send(results)
        }
    } catch (error) {
        res.status(404).send(error)
    }
})

router.post('/login', async (req, res) => {
    try {
        const objeto = req.body
        const [response] = await connection.query('SELECT * FROM cliente WHERE mail = ? AND password = ?', [objeto.mail, objeto.password])

        res.send(JSON.stringify(response[0]))

    } catch (error) {
        res.status(404).send(error)
    }
})

module.exports = router