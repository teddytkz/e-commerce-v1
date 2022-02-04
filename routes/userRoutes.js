const express = require("express")
const router = express.Router()
const userController = require('../controllers/userController')

//GET
router.get('/alluser', userController.getAllUser)

module.exports = router