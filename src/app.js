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
const handlebarsHelpers = require("./utils/handlebarsHelpers");
const sessionConfig = require("./config/sessionConfig");

const app = express();
const port = 8080;
const httpServer = createServer(app);

// Conectar WebSockets
const io = new Server(httpServer);
socketHandler(io);

connectMongoDB();

const handlebars = engine({
  defaultLayout: "main",
  helpers: handlebarsHelpers
});

app.engine("handlebars", handlebars);
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "http://localhost:8080",
    credentials: true,
  })
);

app.use(sessionConfig);

// Rutas de vistas
app.use("/", viewRouter);
app.use("/api/products", productRouter);
app.use("/api/carts", cartsRoutes);

httpServer.listen(port, () => {
  console.log(`Servidor en ejecución: http://localhost:${port}`);
});

module.exports = app;