const express = require('express')
const router = express.Router()
const app = express();

const db = require('../database')
const connection = db()
const multer = require('multer')
const fs = require('fs');
const bcrypt = require('bcrypt');
const stripe = require("stripe")('sk_test_51N5WqCJSil5ToMv4p5W88EWsDXCOV2OPD5fhQBxLjUNOhrLRJ3az2rgjgugTXoV63tAPNer7AZnZERFuSv2ij80S00cVdCgv4W');

const dirFolder = '../public/images/productos/';
const dir = fs.readdirSync(dirFolder);
app.locals.cont = 0

let max
const storage = multer.diskStorage({
    destination: async (req, file, cb) => {
        if (app.locals.cont == 0) {
            max = dir.length == 0 ? 1 : Math.max(...dir) + 1
            dir.push(max)
            app.locals.cont++
        }
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
    try {
        res.json({ files: req.files })
        app.locals.cont = 0
    } catch (error) {
        console.log(error);
    }
});

router.post("/api/localimages/perfil", uploadPerfil.single('file'), async (req, res) => {
    try {
        res.json({ file: req.file })
        const imgPerfil = `/images/user/${app.locals.id}/${req.file.originalname}`
        await connection.query('UPDATE cliente SET imgPerfil = ? WHERE id_cliente = ?', [imgPerfil, app.locals.id])
        
    } catch (error) {
        console.log(error);
    }

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
        const { condicion, price, categoria, ordenar } = req.query.objeto || {};

        const filtros = {};

        if (condicion !== undefined && condicion !== '') filtros.condicion = condicion
        if (categoria !== undefined && categoria !== '') filtros.categoria = categoria
        if (price !== undefined && price !== '') filtros.price = price;

        const values = [`${req.params.id}`, `%${req.params.id}%`, `%${req.params.id}%`];
        const filtrosValues = Object.values(filtros);
        values.splice(0, 0, ...filtrosValues);

        const whereConditions = Object.keys(filtros)
            .map((key) => {
                if (key === 'price') {
                    return `${key} < ?`;
                } else {
                    return `${key} = ?`;
                }
            })
            .join(' AND ');


        let sql;
        if (whereConditions.length > 0 && ordenar) {
            if (ordenar == "menor") {
                sql = `SELECT * FROM producto WHERE (${whereConditions}) AND (categoria LIKE ? OR title LIKE ? OR description LIKE ?) ORDER BY price ASC`;
            } else if (ordenar == "mayor") {
                sql = `SELECT * FROM producto WHERE (${whereConditions}) AND (categoria LIKE ? OR title LIKE ? OR description LIKE ?) ORDER BY price DESC`;
            } else {
                sql = `SELECT * FROM producto WHERE (${whereConditions}) AND (categoria LIKE ? OR title LIKE ? OR description LIKE ?)`;
            }
            const [results] = await connection.query(sql, values);
            results.map(i => i.favoritos == null ? i.favoritos = '' : i.favoritos)
            res.json(results);
        } else if (whereConditions.length == 0 && ordenar) {
            if (ordenar == "menor") {
                sql = `SELECT * FROM producto WHERE categoria LIKE ? OR title LIKE ? OR description LIKE ? ORDER BY price ASC`;
            } else if (ordenar == "mayor") {
                sql = `SELECT * FROM producto WHERE categoria LIKE ? OR title LIKE ? OR description LIKE ? ORDER BY price DESC`;
            }
            const [results] = await connection.query(sql, values);
            results.map(i => i.favoritos == null ? i.favoritos = '' : i.favoritos)
            res.json(results);
        } else if (whereConditions.length > 0) {
            sql = `SELECT * FROM producto WHERE (${whereConditions}) AND (categoria LIKE ? OR title LIKE ? OR description LIKE ?)`;
            const [results] = await connection.query(sql, values);;
            results.map(i => i.favoritos == null ? i.favoritos = '' : i.favoritos)
            res.json(results);
        } else {
            const [results] = await connection.query('SELECT * FROM producto WHERE categoria = ? OR title LIKE ? OR description LIKE ?', values);
            const [numero_maximo] = await connection.query('SELECT MAX(price) numero_maximo FROM producto WHERE categoria = ? OR title LIKE ? OR description LIKE ?', values);
            results.map(i => i.favoritos == null ? i.favoritos = '' : i.favoritos)
            results.push(numero_maximo)
            res.json(results);
        }
    } catch (error) {
        console.log(error);
        res.status(404).send("Error")
    }
})

router.get('/subasta/:id/:categoria/:titulo', async (req, res) => {
    try {
        const [results] = await connection.query('SELECT * FROM producto WHERE id_producto = ? and categoria = ? and title = ?', [req.params.id, req.params.categoria, req.params.titulo])
        res.json(results);
    } catch (error) {
        console.log(error);
        res.status(404).send("Error")
    }
})
router.get('/perfil/:id', async (req, res) => {
    try {
        const [[getId]] = await connection.query('SELECT created_by FROM producto WHERE id_producto = ?', [req.params.id])
        const [results] = await connection.query('SELECT cliente.*, producto.* FROM cliente INNER JOIN producto ON cliente.id_cliente = producto.created_by WHERE producto.created_by = ?', [getId.created_by])
        app.locals.id = results[0].id_cliente
        res.json(results);
    } catch (error) {
        console.log(error);
        res.status(404).send("Error")
    }
})
router.get('/perfilLocal/:id', async (req, res) => {
    try {
        const [resultsC] = await connection.query('SELECT * FROM cliente WHERE id_cliente = ?', [req.params.id])
        const [resultsP] = await connection.query('SELECT * FROM producto WHERE created_by = ?', [req.params.id])
        const results = [resultsC, resultsP]
        app.locals.id = req.params.id
        res.json([results]);
    } catch (error) {
        console.log(error);
        res.status(404).send("Error")
    }
})

router.post('/subasta/:id/:categoria/:titulo', async (req, res) => {
    try {
        const [results] = await connection.query('UPDATE producto SET price = ?, ultimoPujador = ? WHERE id_producto = ? ', [req.body.price,req.body.ultimoPujador ,req.params.id]);
        res.send(results);
    } catch (error) {
        console.error(error);
        res.status(404).send("Error")
    }
})
router.post('/pujar/:id', async (req, res) => {
    try {
        const [resultsP] = await connection.query('SELECT * FROM cliente WHERE id_cliente = ?', [req.params.id]);
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [{
                price_data: {
                    currency: 'eur',
                    product_data: {
                        name: resultsP[0].mail,
                    },
                    unit_amount: parseFloat(req.body.price) * 100,
                    // product: resultsP[0].title,

                },
                quantity: 1,
            }],
            mode: 'payment',
            success_url: `http://localhost:8080/success`,
            cancel_url: `http://localhost:8080/cancel`,
        });
        await connection.query('UPDATE cliente SET nextSaldo = ? WHERE id_cliente = ?', [req.body.price, req.params.id]);

        res.json({url: session.url, saldo: req.body.price})

    } catch (error) {
        console.error(error);
        res.status(404).send("Error")
    }
})
router.get('/miDinero/:id', async (req, res) => {
    try {
        const [results] = await connection.query('SELECT saldo, id_cliente FROM cliente WHERE id_cliente = ?', [req.params.id]);
        const [resultsP] = await connection.query('SELECT created_by FROM producto WHERE created_by = ?', [results[0].id_cliente]);
    
        res.json({saldo: results[0], created_by: resultsP[0]})
        
    } catch (error) {
        console.log(error);
    }
})

router.post('/miDinero/:id', async (req, res) => {
    try {
        const [resultsD] = await connection.query('SELECT nextSaldo,saldo FROM cliente WHERE id_cliente = ?', [req.params.id]);
        let results
        if (resultsD[0].saldo == null) {
            [results] = await connection.query('UPDATE cliente SET saldo = ? WHERE id_cliente = ?', [resultsD[0].nextSaldo, req.params.id]);
        } else {
            [results] = await connection.query('UPDATE cliente SET saldo = saldo + ? WHERE id_cliente = ?', [resultsD[0].nextSaldo, req.params.id]);
        }
        await connection.query('UPDATE cliente SET nextSaldo = ? WHERE id_cliente = ?', [0, req.params.id]);
        res.json(results[0])
        
    } catch (error) {
        console.log(error);
    }

})
router.post('/miDineroCancelado/:id', async (req, res) => {
    try {
        const [results] = await connection.query('UPDATE cliente SET nextSaldo = ? WHERE id_cliente = ?', [0, req.params.id]);
        res.json(results[0])
        
    } catch (error) {
        console.log(error);
    }
})


router.post('/delSubasta', async (req, res) => {
    try {
        const { id_producto } = req.body
        const [results] = await connection.query('DELETE FROM producto WHERE id_producto = ?', [id_producto])
        res.json(results);
    } catch (error) {
        console.error(error);
        res.status(404).send("Error")
    }
})

router.get('/subasta/:id/', async (req, res) => {
    try {
        const folderPath = `../public/images/productos/${req.params.id}`;
        fs.readdir(folderPath, (err, files) => {
            files = files.map(i => `/images/productos/${req.params.id}/${i}`)
            res.send(files)
        });
    } catch (error) {
        console.log(error);
    }

})


router.post('/api', async (req, res) => {
    try {
        const max = app.locals.max
        const dirImg = `../public/images/productos/${max}`;
        const fileInDirImg = fs.readdirSync(dirImg);
        const objeto = {
            title: req.body.titulo,
            description: req.body.descripcion,
            condicion: req.body.estado,
            time_left: req.body.time_left,
            price: req.body.precio,
            img: `/images/productos/${max}/${fileInDirImg[0]}`,
            created_by: req.body.created_by,
            categoria: req.body.categoria,
        };
    
        const [results] = await connection.query('INSERT INTO producto SET ?', [objeto]);
        let directoryPath = `../public/images/productos/${max}`;
        fs.mkdirSync(directoryPath, { recursive: true });
        res.send(results);
    } catch (error) {
        console.log(error);
    }
});

router.post('/api/editarPerfil', async (req, res) => {
    try {
        const [results] = await connection.query('UPDATE cliente SET nombre = ? WHERE id_cliente = ?', [req.body.user, app.locals.id])
        res.send(results);
        
    } catch (error) {
        console.log(error);
    }

});


router.post('/register', async (req, res) => {
    try {
        const objeto = req.body
        const [mailExists] = await connection.query('SELECT mail FROM cliente WHERE mail = ?', [objeto.mail])

        if (mailExists.length == 0) {
            const salt = await bcrypt.genSalt(10);
            const password = objeto.password;
            const hashedPassword = await bcrypt.hash(password, salt);
            objeto.password = hashedPassword
            const [results] = await connection.query('INSERT INTO cliente SET ?', [objeto])
            res.send(results)
        } else {
            res.sendStatus(404)
        }
    } catch (error) {
        console.log(error);
        res.status(404).send(error)
    }
})

router.post('/login', async (req, res) => {
    try {
        const objeto = req.body
        const [getPassword] = await connection.query('SELECT password FROM cliente WHERE mail = ?', [objeto.mail])
        if (getPassword.length>0) {
            const [response] = await connection.query('SELECT * FROM cliente WHERE mail = ? AND password = ?', [objeto.mail, getPassword[0].password])
            const isMatch = await bcrypt.compare(objeto.password, getPassword[0].password);
            if (isMatch) res.send(JSON.stringify(response[0]))
        }else {
            res.send(false)
        }

    } catch (error) {
        console.log(error);
        res.status(404).send(error)
    }
})






router.post('/favourites', async (req, res) => {
    try {
        const [[getLikes]] = await connection.query('SELECT favoritos FROM cliente WHERE id_cliente = ?', [req.body.cookie])
        let favoritos = getLikes?.favoritos
        if (favoritos == null || favoritos == '') {
            favoritos = [req.body.id_producto]
        } else {
            favoritos = favoritos + ',' + req.body.id_producto
        }
        const [results] = await connection.query('UPDATE cliente SET favoritos = ? WHERE id_cliente = ?', [favoritos, req.body.cookie])
        res.send(results)

    } catch (error) {
        console.log(error);
        res.status(404).send(error)
    }
})



router.post('/favouritesProducto', async (req, res) => {
    try {
        const [[getFavoritos]] = await connection.query('SELECT favoritos FROM producto WHERE id_producto = ?', [req.body.id_producto])
        let favoritosProducto = getFavoritos?.favoritos
        if (favoritosProducto == null || favoritosProducto == '') {
            favoritosProducto = [req.body.cookie]
        } else {
            favoritosProducto = favoritosProducto + ',' + req.body.cookie
        }
        const [results] = await connection.query('UPDATE producto SET favoritos = ? WHERE id_producto = ?', [favoritosProducto, req.body.id_producto])
        res.send(results)

    } catch (error) {
        console.log(error);
        res.status(404).send(error)
    }
})



router.post('/favouritesDel', async (req, res) => {
    try {
        const [[getLikes]] = await connection.query('SELECT favoritos FROM cliente WHERE id_cliente = ?', [req.body.cookie])
        let favoritos = getLikes?.favoritos
        if (favoritos != null || favoritos != '') {
            favoritos = favoritos.split(',').filter(i => i != req.body.id_producto)
        }
        const [results] = await connection.query('UPDATE cliente SET favoritos = ? WHERE id_cliente = ?', [favoritos.toString(), req.body.cookie])
        res.send(results)
    } catch (error) {
        console.log(error);
        res.status(404).send(error)
    }
})




router.post('/favouritesProductoDel', async (req, res) => {
    try {
        const [[getFavoritos]] = await connection.query('SELECT favoritos FROM producto WHERE id_producto = ?', [req.body.id_producto])
        let favoritosProducto = getFavoritos?.favoritos
        if (favoritosProducto != null || favoritosProducto != '') {
            favoritosProducto = favoritosProducto.split(',').filter(i => i == !req.body.cookie)
        }
        const [results] = await connection.query('UPDATE producto SET favoritos = ? WHERE id_producto = ?', [favoritosProducto.toString(), req.body.id_producto])
        res.send(results)
    } catch (error) {
        console.log(error);
        res.status(404).send(error)
    }
})







router.get('/favourites/:id', async (req, res) => {
    try {

        let [response] = await connection.query('SELECT favoritos FROM cliente WHERE id_cliente = ?', [req.params.id])
        response = response[0]?.favoritos.split(",")
        let arrayFavourites = []
        for (let i = 0; i < response.length; i++) {
            const element = response[i];
            const favourite = await connection.query('SELECT * FROM producto WHERE id_producto = ?', [element])

            arrayFavourites.push(favourite[0][0])
        }
        res.send(arrayFavourites)

    } catch (error) {
        console.log(error);
        res.status(404).send(error)
    }
})
router.get('/delExpiredProductos', async (req, res) => {
    try {
        const [response] = await connection.query('SELECT * FROM producto WHERE time_left < NOW()')
        response.forEach(async (subasta) => {
            const [responseCreaded] = await connection.query('SELECT * FROM cliente WHERE id_cliente = ?', [subasta.created_by])
            await connection.query(`UPDATE cliente SET saldo = saldo - ?  WHERE id_cliente = ?`,[subasta.price, subasta.ultimoPujador])
            if (responseCreaded[0].saldo == null) {
                await connection.query(`UPDATE cliente SET saldo = saldo WHERE id_cliente = ?`,[subasta.price, subasta.created_by])
            }else {
                await connection.query(`UPDATE cliente SET saldo = saldo + ?  WHERE id_cliente = ?`,[subasta.price, subasta.created_by])
            }
            await connection.query(`DELETE FROM producto WHERE id_producto = ${subasta.id_producto}`)
        });
        
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
    }
});


module.exports = router