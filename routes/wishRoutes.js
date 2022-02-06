const express = require('express')
const router = express.Router()

const wishController = require('../controllers/wishController')
const tokenMiddleware = require('../middleware/verifyToken')

//GET
router.get('/', tokenMiddleware.verifyToken, wishController.getWish)
//PUT

//POST
router.post('/add', tokenMiddleware.verifyToken, wishController.addWish)
router.post('/delete', tokenMiddleware.verifyToken, wishController.removeWish)


module.exports = router