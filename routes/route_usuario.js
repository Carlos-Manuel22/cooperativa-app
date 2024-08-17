const express = require('express')
const {registro, login} = require('../controller/control_usuario')
const router = express.Router()

router.post('/registro',registro)
router.post('/login', login)

module.exports = router