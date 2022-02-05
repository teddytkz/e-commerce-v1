const express = require("express")
const router = express.Router()
const userController = require('../controllers/userController')

//GET
router.get('/alluser', userController.getAllUser)
router.get('/:id', userController.getUser)

//PUT
// router.put('/user/:id', userController.updateUser)

//POST
router.post('/register', userController.postRegister)
router.post('/login', userController.postLogin)

module.exports = router