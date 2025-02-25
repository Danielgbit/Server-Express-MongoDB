const express = require("express");
const session = require("express-session");
const cors = require("cors");
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

app.use(cors({
  origin: "http://localhost:8080", // Ajusta al dominio del frontend
  credentials: true
}));


app.use(session({
  secret: "mi_secreto_super_seguro",
  resave: false,
  saveUninitialized: true,
  cookie: { 
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 días
    secure: false,  // En localhost debe ser false
    httpOnly: false // Para que el frontend pueda acceder a la cookie (Opcional)
  }
}));




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
