const jwt = require('jsonwebtoken')

exports.autenticacion = (req, res, next) =>{
    const lv_token = req.headers['autorizacion']?.split(' ')[1]

    if(!token) return res.status(401).json({message: 'No se proporcionó un token. Verifique de nuevo'})
    
    jwt.verify(lv_token, process.env.JWT_SECRET, (error, usuario)=>{
        if(error) return res.status(403).json({message:'Token inválido'})
        req.usuario = usuario
        next()
    })
}
