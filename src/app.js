const express = require("express");
const path = require("path");
const { createServer } = require("http");
const { Server } = require("socket.io");
const { engine } = require("express-handlebars");

const productRouter = require("./routes/products.routes");
const cartRouter = require("./routes/carts.routes");

// 🔹 Importar la lista de productos desde un módulo separado
const { getProducts } = require("./services/productService");

// Inicializar la aplicación Express
const app = express();
const port = 8080;

// Crear el servidor HTTP y Socket.IO
const httpServer = createServer(app);
const io = new Server(httpServer);

// 🔹 Configurar Handlebars con una estructura más limpia
app.engine("handlebars", engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

// Middleware para servir archivos estáticos y procesar JSON
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Rutas de vistas
app.get("/", async (req, res) => {
  const products = await getProducts();
  res.render("index", { title: "Inicio", products });
});

// 🔹 Ruta para la vista en tiempo real
app.get("/realtimeproducts", (req, res) => res.render("realTimeProducts", { products }));


// 🔹 Configurar Socket.IO en una función modular
io.on("connection", (socket) => {
  console.log("🟢 Cliente conectado");

  // Enviar lista de productos al cliente
  socket.emit("updateProducts", products);

  // Manejo de agregar productos
  socket.on("addProduct", (product) => {
    addProduct(product);
    io.emit("updateProducts", products);
  });

  // Manejo de eliminar productos
  socket.on("deleteProduct", (productId) => {
    deleteProduct(productId);
    io.emit("updateProducts", products);
  });

  socket.on("disconnect", () => {
    console.log("🔴 Cliente desconectado");
  });
});

// Rutas de la API
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);

// Iniciar el servidor HTTP
httpServer.listen(port, () => {
  console.log(`✅ Servidor en ejecución: http://localhost:${port}`);
});

// Exportar la aplicación para pruebas
module.exports = app;
