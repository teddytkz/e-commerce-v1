const express = require('express')
const router = express.Router()
const tokenController = require('../controllers/tokenController')

router.get('/refresh', tokenController.getRefreshToken)

module.exports = router