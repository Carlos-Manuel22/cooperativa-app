const express = require('express')
const {crear_prestamo} = require ('../controller/control_prestamo')
const {autenticacion} = require('../middleware/autenticacion')
const router = express.Router()

router.post('/', autenticacion, crear_prestamo)

module.exports = router