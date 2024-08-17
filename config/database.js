const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const conexion_DB = async () => {
    
    try {

        await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB Conectado !");

    } catch (error) {
        console.error("Error al conectar a MongoDB", error.message);
        process.exit(1);
    }

};

module.exports = conexion_DB;