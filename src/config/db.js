const mongoose = require("mongoose");

const pass = "123";
const nameDB = "NodeJsDB";

const connectMongoDB = async () => {
    try {
        await mongoose.connect(`mongodb+srv://danielbitmobb:${pass}@ecommerce-cluster.c4vok.mongodb.net/${nameDB}?retryWrites=true&w=majority&appName=Ecommerce-Cluster`);
        console.log("✅ Conectado a MongoDB");
    } catch (error) {
        console.error(`Error de conexión a MongoDB: ${error.message}`);
    }
};

module.exports = connectMongoDB;
