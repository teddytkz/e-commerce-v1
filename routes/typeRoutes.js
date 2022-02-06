const express = require('express')
const router = express.Router()
const typeController = require('../controllers/typeController')

//GET
router.get('/', typeController.getAllType)
router.get('/:id', typeController.getType)

//POST
router.post('/update/:id', typeController.updateType)
router.post('/create', typeController.createType)

//DELETE
router.delete('/:id', typeController.deleteType)

module.exports = router