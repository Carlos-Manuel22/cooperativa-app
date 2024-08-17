const mongoose = require("mongoose");
const brcypt = require('bcrypt')

const usuario_Schema = new mongoose.Schema(
    {
        nombre: {type: String, required: true},
        email:{type: String, required: true, unique:true},
        contraseña:{type: String, required: true},
        rol:{type: String, enum:['administrador','miembro'],default: 'miembro'},
    }
);

usuario_Schema.pre('save', async function (next){
    if(!this.isModified('contraseña')) return next();
    this.contraseña = await brcypt.hash(this.contraseña, 10);
    next();
});

/*Para comparar contraseñas, usamos este método: */

usuario_Schema.methods.comparePassword = function (contraseña) {
    return bcyrt.compare(contraseña, this.contraseña);
};


module.exports = mongoose.model('Ususarios',usuario_Schema);