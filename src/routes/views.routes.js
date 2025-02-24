const express = require("express");
const router = express.Router();
const { getProducts, getProductById } = require("../services/productService");
const { getCartById } = require("../services/cartService");


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
    try {
        const { id } = req.params;
        const response = await getCartById('67bce9956195aea12778e074');

        // 📌 Verificar si el carrito se obtuvo correctamente
        if (!response || response.status !== "success" || !response.payload) {
            console.error("❌ Error de conexión al obtener el carrito");
            return res.status(500).send("Error al obtener el carrito");
        }

        // 🛒 Obtener la lista de productos del carrito
        const cartProducts = response.payload.products;

        // 🔄 Obtener los detalles de cada producto en paralelo
        const products = await Promise.all(cartProducts.map(async (item) => {
            const productResponse = await getProductById(item._id);
            if (productResponse.status === "success") {
                return { 
                    ...productResponse.payload, 
                    quantity: item.quantity // Agregamos la cantidad del carrito
                };
            }
            return null; // Si falla la consulta, ignoramos el producto
        }));

        // 📌 Filtrar productos nulos (por si alguna consulta falla)
        const validProducts = products.filter(product => product !== null);

        console.log("✅ Productos listos para renderizar:", validProducts);

        // 🖼️ Renderizar la vista "cart" con los productos
        res.render("cart", { products: validProducts });

    } catch (error) {
        console.error("❌ Error en la consulta del carrito:", error.message);
        res.status(500).send("Error interno del servidor");
    }
});

router.post("/cart/:cartId/add/:productId", async (req, res) => {
    try {
        const { cartId, productId } = req.params;

        const cart = await CartModel.findById(cartId);
        if (!cart) {
            return res.status(404).json({ status: "error", message: "Carrito no encontrado" });
        }

        // Buscar si el producto ya existe en el carrito
        const productIndex = cart.products.findIndex(p => p.productId.toString() === productId);

        if (productIndex > -1) {
            // Si existe, aumentar la cantidad
            cart.products[productIndex].quantity += 1;
        } else {
            // Si no existe, agregarlo con cantidad 1
            cart.products.push({ productId, quantity: 1 });
        }

        await cart.save();
        res.json({ status: "success", message: "Producto agregado", payload: cart });
    } catch (error) {
        res.status(500).json({ status: "error", message: "No se pudo agregar el producto" });
    }
});







module.exports = router;
