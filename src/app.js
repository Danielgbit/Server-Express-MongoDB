const express = require("express");
const app = express();
const path = require("path");
const http = require("http");
const { Server } = require("socket.io");
const { engine } = require("express-handlebars");

const server = http.createServer(app);
const io = new Server(server);
const port = 8080;

// Configurar Handlebars
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "./views"));

app.use(express.static("public"));

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

const productRouter = require("./routes/products.routes");
const cartRouter = require("./routes/carts.routes");

// Middleware para procesar JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas (deben ir antes de app.listen)
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);

app.get("/", (req, res) => {
    res.render("home", { titulo: "Chat en Tiempo Real" });
});

app.get('/realtimeproducts', (req, res) => {
  res.render('realTimeProducts', { products });
});

app.listen(port, () => {
  console.log(`Servidor ejecutándose en: http://localhost:${port}`);
});

module.exports = app;
