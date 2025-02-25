const express = require("express");
const router = express.Router();
const {
  createCart,
  getCart,
  addProductToCart,
  removeProductFromCart,
  getCarts,
  updateProductQuantity,
} = require("../controllers/carts.controller");

router.post("/created", createCart);

router.get("/:id", getCart);

router.get("/", getCarts);

router.post("/:cartId/product/:productId", addProductToCart);

router.delete("/delete/:cartId/product/:productId", removeProductFromCart);

router.put("/:cartId/product/:productId", updateProductQuantity);

module.exports = router;