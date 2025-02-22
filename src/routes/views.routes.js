const express = require("express");
const router = express.Router();
const { getProducts, getProductById } = require("../services/productService");
const getCartById = require("../services/cartService");


// Página principal con productos
router.get("/", async (req, res) => {
    const response = await getProducts();
    if (response.status !== "success") {
        return console.error("Error de conexión");
    }
    res.render("index", { title: "Inicio", products: response.payload });
});

// Vista de productos en tiempo real
router.get("/realtimeproducts", async (req, res) => {
    const response = await getProducts();
    if (response.status !== "success") {
        return console.error("Error de conexión");
    }
    res.render("realTimeProducts", { title: "Productos en Tiempo Real", products: response.payload });
});

// Detalle de un producto
router.get("/products/:id", async (req, res) => {
    const productId = req.params.id;
    const response = await getProductById(productId);
    
    if (response?.status !== "success") {
        return console.error("Error en el servidor");
    }

    if (!response.payload) {
        return res.status(404).send("Producto no encontrado");
    }

    res.render("productDetail", { product: response.payload });
});

// Formulario de edición de producto
router.get("/editproduct/:id", async (req, res) => {
    const uid = req.params.id;
    const response = await getProductById(uid);
    
    if (!response.payload) {
        return res.status(404).send("Producto no encontrado");
    }

    res.render("editProduct", { product: response.payload });
});

router.get("/cart/:id", async (req, res) => {
    const id = req.params.id;
    const response = await getCartById(id);
    if (response.status !== "success") {
        return console.error("Error de conexión");
    }

     const productIds = response.payload.products;
     const products = await Promise.all(
         productIds.map(async (productId) => {
             const productResponse = await getProductById(productId);
             return productResponse.payload; 
         })
     );

     console.log(products);
     
    
    /* res.render("cart", { products: products }); */
});



module.exports = router;
