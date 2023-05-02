const express = require('express')
const router = express.Router()
const app = express();

const db = require('../database')
const connection = db()
const multer = require('multer')
const fs = require('fs');

const dirFolder = '../public/images/productos/';
const dir = fs.readdirSync(dirFolder);
app.locals.cont = 0
const storage = multer.diskStorage({
    destination: async (req, file, cb) => {
        let max
        console.log('cont ========>',app.locals.cont);
        if (app.locals.cont == 0) {
            max = dir.length == 0 ? 1 : Math.max(...dir) + 1
            dir.push(max)
            app.locals.cont++
        }else {
            max = dir.length == 0 ? 1 : Math.max(...dir)
        }
        console.log('max ========>',max);
        app.locals.max = max
        const folderPath = `../public/images/productos/${max}`;
        fs.mkdirSync(folderPath, { recursive: true });
        cb(null, folderPath)
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
});
const storagePerfil = multer.diskStorage({
    destination: async (req, file, cb) => {
        const folderPath = `../public/images/user/${app.locals.id}`;
        fs.mkdirSync(folderPath, { recursive: true });
        
        cb(null, folderPath)
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
});


const upload = multer({ storage: storage })
const uploadPerfil = multer({ storage: storagePerfil })


// Middlewares para imagenes
router.post("/api/localimages/productos", upload.array('files'), async (req, res) => {
    res.json({ files: req.files })
});

router.post("/api/localimages/perfil", uploadPerfil.single('file'), async (req, res) => {
    res.json({ file: req.file})
    const imgPerfil = `/images/user/${app.locals.id}/${req.file.originalname}`
    await connection.query('UPDATE cliente SET imgPerfil = ? WHERE id_cliente = ?',[imgPerfil, app.locals.id])
    
});



// Rutas

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

router.get('/subasta/:id/:categoria/:titulo', async (req, res) => {
    try {
        const [results] = await connection.query('SELECT * FROM producto WHERE id_producto = ? and categoria = ? and title = ?', [req.params.id, req.params.categoria, req.params.titulo])
        res.json(results);
    } catch (error) {
        console.log('Error');
        res.status(404).send("Error")
    }
})
router.get('/perfil/:id', async (req, res) => {
    try {
        const [results] = await connection.query('SELECT cliente.*, producto.* FROM cliente INNER JOIN producto ON cliente.id_cliente = producto.created_by WHERE cliente.id_cliente = ? AND producto.created_by = ? ', [req.params.id,req.params.id])
        app.locals.id = results[0].id_cliente
        res.json(results);
    } catch (error) {
        console.log(error);
        res.status(404).send("Error")
    }
})

router.post('/subasta/:id/:categoria/:titulo', async (req, res) => {
    try {
        const [results] = await connection.query('UPDATE producto SET price = ? WHERE id_producto = ? ', [req.body.price, req.params.id])
        res.json(results);
    } catch (error) {
        console.error(error);
        res.status(404).send("Error")
    }
})

router.get('/subasta/:id/', async (req, res) => {
    const folderPath = `../public/images/productos/${req.params.id}`;
    fs.readdir(folderPath, (err, files) => {
        files = files.map(i => `/images/productos/${req.params.id}/${i}`)
        res.send(files)
    });

})


router.post('/api', async (req, res) => {
    const max = app.locals.max
    const dirImg = `../public/images/productos/${max}`;
    const fileInDirImg = fs.readdirSync(dirImg);
    const objeto = {
        title: req.body.titulo,
        description: req.body.descripcion,
        condition: req.body.estado,
        time_left: req.body.time_left,
        price: req.body.precio,
        img: `/images/productos/${max}/${fileInDirImg[0]}`,
        created_by: req.body.created_by,
        categoria: req.body.categoria,
    };

    const [results] = await connection.query('INSERT INTO producto SET ?', [objeto,]);

    let directoryPath = `../public/images/productos/${max}`;
    fs.mkdirSync(directoryPath, { recursive: true });
    res.send(results);
    //     try {
    //     } catch (error) {
    //         res.status(404).send(error);
    // }
});

router.post('/api/editarPerfil', async (req, res) => {
    console.log(req.body);
    const [results] = await connection.query('UPDATE cliente SET nombre = ? WHERE id_cliente = ?',[req.body.user , app.locals.id])
    res.send(results);

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