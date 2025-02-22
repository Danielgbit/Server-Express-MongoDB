const express = require("express");
const router = express.Router();
const {
  createCart,
  getCart,
  addProductToCart,
  removeProductFromCart,
} = require("../controllers/carts.controller");

// Crear un carrito
router.post("/created", createCart);

// Obtener un carrito por ID
router.get("/:id", getCart);

// Agregar un producto al carrito
router.post("/:cartId/product/:productId", addProductToCart); // Línea 11

// Eliminar un producto del carrito
router.delete("/delete/:cartId/product/:productId", removeProductFromCart);

module.exports = router;