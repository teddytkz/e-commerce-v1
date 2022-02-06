const express = require('express')
const router = express.Router()
const productController = require('../controllers/productController')
const productImages = require('../models/productImagesModel')

//GET
router.get('/', productController.getAllProduct)
router.get('/:id', productController.getProduct)

//PUT
router.put('/:id', productController.updateProduct)

//POST
router.post('/addProduct', productController.upload.array('images', 10), productController.createProduct)

module.exports = router