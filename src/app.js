const express = require("express");
const path = require("path");
const { createServer } = require("http");
const { Server } = require("socket.io");
const { engine } = require("express-handlebars");

const productRouter = require("./routes/products.routes");
const cartsRoutes = require("./routes/carts.routes");

const viewRouter = require("./routes/views.routes"); // Vistas

const connectMongoDB = require("./config/db");
const socketHandler = require("./services/socketService");


const app = express();
const port = 8080;

const httpServer = createServer(app);

// Conectar WebSockets
const io = new Server(httpServer);
socketHandler(io);



// Conectar a MongoDB
connectMongoDB();

app.engine("handlebars", engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

// Middleware para servir archivos estáticos y procesar JSON
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Rutas de vistas
app.use("/", viewRouter);

// Rutas de la API
app.use("/api/products", productRouter);
// Rutas
app.use("/api/carts", cartsRoutes);

// Iniciar el servidor HTTP
httpServer.listen(port, () => {
  console.log(`Servidor en ejecución: http://localhost:${port}`);
});

// Exportar la aplicación para pruebas
module.exports = app;
