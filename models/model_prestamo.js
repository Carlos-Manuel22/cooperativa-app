const mongoose = require("mongoose");

const prestamo_schema = new mongoose.Schema(
    {
       id_usuario:{
            type: mongoose.Schema.Types.ObjectId, ref: 'Usuarios',
            required: true
       },
       capital:{
            type: Number, required: true
       },
       tasa_interes:{
            type: Number, required: true 
       },
       duracion: {
            type: Number, required: true
       },
       estado: {
        type: String, default: 'Pendiente'
       },
    }
);

module.exports = mongoose.model("Prestamo", prestamo_schema);