const express = require('express')
const router = express.Router()
const productController = require('../controllers/productController')

//GET
router.get('/', productController.getAllProduct)
router.get('/:id', productController.getProduct)

module.exports = router