const express = require("express");
const path = require("path");
const { createServer } = require("http");
const { Server } = require("socket.io");
const { engine } = require("express-handlebars");
const mongoose = require('mongoose');

const productRouter = require("./routes/products.routes");
const cartRouter = require("./routes/carts.routes");

const pass = '123';
const nameDB = 'NodeJsDB';


const connectMongoDB = async () => {
    try {
        await mongoose.connect(`mongodb+srv://danielbitmobb:${pass}@ecommerce-cluster.c4vok.mongodb.net/${nameDB}?retryWrites=true&w=majority&appName=Ecommerce-Cluster`);
        console.log('connect mongoDB');
    } catch (error) {
        console.log(`failed connection MongoDB ${error.message}`);
        
    }
};

connectMongoDB();

const { getProducts, deleteProduct, addProduct, getProductById, updateProduct } = require("./services/productService");
const { log } = require("console");

const app = express();
const port = 8080;

const httpServer = createServer(app);
const io = new Server(httpServer);

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


app.get("/realtimeproducts", async (req, res) => {
  const products = await getProducts();
  res.render("realTimeProducts", { title: "Productos en Tiempo Real", products });
});

// Ruta para mostrar el detalle de un producto
app.get("/products/:id", async (req, res) => {
  const productId = req.params.id;
  const product = await getProductById(productId);

  if (!product) {
      return res.status(404).send("Producto no encontrado");
  }

  res.render("productDetail", { product });
});


// Ruta para mostrar el formulario de edición
app.get("/editproduct/:id", async (req, res) => {
  const productId = req.params.id;
  const product = await getProductById(productId);
  if (product) {
      res.render("editProduct", { product });
  } else {
      res.status(404).send("Producto no encontrado");
  }
});

io.on("connection", async (socket) => {
  console.log("Cliente conectado");

  try {
      const products = await getProducts(); // Obtener los productos antes de emitir
      socket.emit("updateProducts", products);
  } catch (error) {
      console.error("Error al obtener productos:", error);
  }

  // Escuchar evento para agregar productos
  socket.on("addProduct", async (product) => {
      try {
          await addProduct(product);
          const products = await getProducts();
          io.emit("updateProducts", products);
      } catch (error) {
          console.error("Error al agregar producto:", error);
      }
  });

  // Escuchar evento de editar producto
  socket.on("editProduct", async (updatedProduct) => {
      try {
          await updateProduct(updatedProduct.id, updatedProduct);
          const products = await getProducts();
          io.emit("updateProducts", products); // Enviar los productos actualizados a todos los clientes
      } catch (error) {
          console.error("Error al actualizar producto:", error);
      }
  });

  // Escuchar evento para eliminar productos
  socket.on("deleteProduct", async (productId) => {
      try {
          await deleteProduct(productId);
          const products = await getProducts(); // Obtener productos actualizados
          io.emit("updateProducts", products);
      } catch (error) {
          console.error("Error al eliminar producto:", error);
      }
  });
});

// Rutas de la API
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);

// Iniciar el servidor HTTP
httpServer.listen(port, () => {
  console.log(`Servidor en ejecución: http://localhost:${port}`);
});

// Exportar la aplicación para pruebas
module.exports = app;
