const express = require('express')
const showProducts = require('../controllers/product')
const router = express.Router()

router.get('/',showProducts)

module.exports = router