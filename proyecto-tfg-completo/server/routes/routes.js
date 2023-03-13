const express = require('express')
const showProducts = require('../api/api')
const router = express.Router()

router.get('/',showProducts)

module.exports = router