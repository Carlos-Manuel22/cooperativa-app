const Usuario = require('../models/model_usuario');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/* Lógica para el registro de usuario */
exports.registro = async (req, res) => {
    const { lv_nombre, lv_correo, lv_clave } = req.body;

    try {
        // Verificar si el correo ya está registrado
        const usuarioExistente = await Usuario.findOne({ lv_correo });
        if (usuarioExistente) {
            return res.status(400).json({ message: 'El correo ya está registrado.' });
        }

        // Hashear la contraseña
        const lv_hashClave = await bcrypt.hash(lv_clave, 10);
        const nuevoUsuario = new Usuario({ lv_nombre, lv_correo, lv_clave: lv_hashClave });

        // Guardar el nuevo usuario
        await nuevoUsuario.save();
        res.status(201).json({ message: 'Usuario creado exitosamente!' });
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el usuario: ' + error.message });
    }
};

/* Lógica para inicio de sesión */
exports.login = async (req, res) => {
    const { lv_correo, lv_clave } = req.body;

    try {
        const lv_usuario = await Usuario.findOne({ lv_correo });
        if (!lv_usuario) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        // Comparar la contraseña
        const esContraseñaValida = await bcrypt.compare(lv_clave, lv_usuario.lv_clave);
        if (!esContraseñaValida) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        // Generar el token
        const token = jwt.sign({ id: lv_usuario._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Error al iniciar sesión: ' + error.message });
    }
};
