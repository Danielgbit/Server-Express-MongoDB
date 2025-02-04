const express = require('express');
const app = express();
const port = 8080;

const productRouter = require('./routes/products.routes');
const cartRouter = require('./routes/carts.routes');

app.get('/', (req, res) => {
    res.send('¡Hola desde mi servidor con Express.js!');
});

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});


// Middlewares
app.use(express.json());

// Rutas
app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);

module.exports = app


