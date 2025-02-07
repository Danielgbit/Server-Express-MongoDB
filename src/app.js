const express = require('express');
const app = express();
const port = 8080;

const productRouter = require('./routes/products.routes');
const cartRouter = require('./routes/carts.routes');

// Middleware para procesar JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas (deben ir antes de app.listen)
app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('¡Hola desde mi servidor con Express.js!');
});

// Iniciar servidor
app.listen(port, () => {
    console.log(`Servidor ejecutándose en: http://localhost:${port}`);
});

module.exports = app;
