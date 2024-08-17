const prestamo = require('../models/model_prestamo')

exports.crear_prestamo = async (req, res) => {
    const {lv_monto, lv_tasaInteres, lv_duracion} = req.body
    const lv_prestamo = new prestamo({id_usuario: req.usuario.id, lv_monto,lv_tasaInteres,lv_duracion})

    try {
    
        await prestamo.save()
        res.status(201).json({message: 'Prestamo Creado', prestamo})

    } catch (error) {
        res.status(400).json({error: error.message})
    }
}