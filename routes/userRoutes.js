const express = require("express")
const router = express.Router()
const userController = require('../controllers/userController')

//GET
router.get('/', userController.getAllUser)
router.get('/:id', userController.getUser)

//PUT
router.put('/:id', userController.updateUser)

//POST

router.post('/register', userController.postRegister)
router.post('/login', userController.postLogin)
router.post('/logout', userController.logout)

module.exports = router