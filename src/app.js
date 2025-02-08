const express = require('express');
const app = express();
const http = require("http");
const { Server } = require("socket.io");

const server = http.createServer(app);
const io = new Server(server);
const port = 8080;

// Middleware para servir archivos estáticos (opcional)
app.use(express.static("public"));

// Manejo de conexiones Socket.IO
io.on("connection", (socket) => {
  console.log("Cliente conectado");

  socket.on("mensaje", (message) => {
    console.log("Mensaje recibido: ", message);

    // Enviar mensaje a todos los clientes conectados
    io.emit("mensaje", `Mensaje del servidor: ${message}`);
  });

  socket.on("disconnect", () => {
    console.log("Cliente desconectado");
  });
});

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
