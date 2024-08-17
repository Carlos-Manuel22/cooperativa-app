const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const conexionDB = require('../backend/config/database');
const rutas_usuario = require('../backend/routes/route_usuario');
const rutas_prestamo = require('../backend/routes/route_prestamo');

dotenv.config();
conexionDB();

const app = express();

app.use(cors()); 


/* Rutas a crear: */
app.use(express.json());
app.use('/api/usuarios', rutas_usuario); 
app.use('/api/prestamos', rutas_prestamo);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Servidor conectado en el puerto ${PORT}`);
});
