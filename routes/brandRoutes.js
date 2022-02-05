const express = require('express')
const router = express.Router()
const brandController = require('../controllers/brandController')

//GET
router.get('/:id', brandController.getBrand)
router.get('/', brandController.getAllBrand)

//POST
router.post('/update/:id', brandController.updateBrand)
router.post('/create', brandController.createBrand)

//DELETE
router.delete('/:id', brandController.deleteBrand)


module.exports = router