const getProducts = require('../models/productModel')

const showProducts = (req, res) => {
    getProducts((err, results) => {
        res.json(results);
    });
}

module.exports = showProducts