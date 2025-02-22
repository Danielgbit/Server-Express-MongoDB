const express = require("express");
const router = express.Router();
const {
  createCart,
  getCart,
  addProductToCart,
  removeProductFromCart,
  getCarts,
} = require("../controllers/carts.controller");

router.post("/created", createCart);

router.get("/:id", getCart);

router.get("/", getCarts);

router.post("/:cartId/product/:productId", addProductToCart); // Línea 11

router.delete("/delete/:cartId/product/:productId", removeProductFromCart);

module.exports = router;