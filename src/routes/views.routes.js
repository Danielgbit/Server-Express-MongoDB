const express = require("express");
const router = express.Router();
const { getProducts, getProductById } = require("../services/productService");
const {
  getCartById,
  postCreateCart,
  postProductInCart,
  updateProductInCartQuantity,
  removeProductInCart,
  clearCart
} = require("../services/cartService");

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
  res.render("realTimeProducts", {
    title: "Productos en Tiempo Real",
    products: response.payload,
  });
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
    const response = await getCartById(id);

    // Verificar si el carrito se obtuvo correctamente
    if (!response || response.status !== "success" || !response.payload) {
      console.error("Error de conexión al obtener el carrito");
      return res.status(500).send("Error al obtener el carrito");
    }
    const cartProducts = response.payload.products;

    // Obtener los detalles de cada producto en paralelo
    const products = await Promise.all(
      cartProducts.map(async (item) => {
        const productResponse = await getProductById(item._id);
        if (productResponse.status === "success") {
          return {
            ...productResponse.payload,
            quantity: item.quantity, // Agregamos la cantidad del carrito
          };
        }
        return null;
      })
    );

    const validProducts = products.filter((product) => product !== null);
    res.render("cart", { products: validProducts });
  } catch (error) {
    res.status(500).send("Error interno del servidor");
  }
});

router.get("/cart", async (req, res) => {
  try {
    if (!req.session.cardId) {
      const createCart = await postCreateCart();
      req.session.cartId = createCart.payload._id;
    }
    res.redirect(`/cart/${req.session.cartId}`);
  } catch (error) {
    res
      .status(500)
      .json({ status: "error", message: "No se pudo agregar el producto" });
  }
});

router.post("/addProductInCart/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await postProductInCart({ cartId: req.session.cartId, productId: id });

    res.redirect(`/cart/${req.session.cartId}`);
  } catch (error) {
    res
      .status(500)
      .json({ status: "error", message: "No se pudo agregar el producto" });
  }
});

router.post("/updateProductInCart/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { action } = req.body;

    updateProductInCartQuantity({
      cartId: req.session.cartId,
      productId: id,
      action: action,
    });
    res.redirect(`/cart/${req.session.cartId}`);
  } catch (error) {
    res
      .status(500)
      .json({ status: "error", message: "No se pudo agregar el producto" });
  }
});

router.post("/deleteProductInCart/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await removeProductInCart({
        cartId: req.session.cartId,
        productId: id,
      });
    res.redirect(`/cart/${req.session.cartId}`);
  } catch (error) {
    res
      .status(500)
      .json({ status: "error", message: "No se pudo agregar el producto" });
  }
});

router.post("/clearCart", async (req, res) => {
    try {

      await clearCart({ id: req.session.cartId });

      res.redirect(`/cart/${req.session.cartId}`);      

    } catch (error) {
      res
        .status(500)
        .json({ status: "error", message: "No se pudo agregar el producto" });
    }
  });

module.exports = router;
