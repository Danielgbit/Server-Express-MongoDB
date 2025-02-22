const CartModel = require("../models/cart.model");
const mongoose = require("mongoose");

const createCart = async (req, res) => {
  try {
    const newCart = {
      products: [],
    };

    const response = await CartModel.create(newCart);
    res.status(201).send({ status: 'success', payload: response });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCart = async (req, res) => {
  try {
    const uid = req.params.id;
    const cart = await CartModel.findById(uid);
    if (!cart) {
      return res.status(404).json({ status: "error", message: "Carrito no encontrado" });
    }
    res.status(200).send({ status: 'success', payload: cart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addProductToCart = async (req, res) => {
  try {
    const { cartId, productId } = req.params;

    const cart = await CartModel.findById(cartId);
    if (!cart) {
      return res.status(404).json({ status: "error", message: "Carrito no encontrado" });
    }

    const productObjectId = mongoose.Types.ObjectId(productId);
    cart.products.push(productObjectId);

    await cart.save();
    res.status(201).json({ status: "success", message: "Producto agregado exitosamente", payload: cart });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

const removeProductFromCart = async (req, res) => {
  try {
    const { cartId, productId } = req.params;

    const productObjectId = mongoose.Types.ObjectId(productId);
    const updatedCart = await CartModel.findByIdAndUpdate(
      cartId,
      { $pull: { products: productObjectId } },
      { new: true }
    );

    if (!updatedCart) {
      return res.status(404).json({ status: "error", message: "Carrito no encontrado" });
    }

    res.status(200).json({ status: "success", message: "Producto eliminado del carrito", payload: updatedCart });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

module.exports = {
  createCart,
  getCart,
  addProductToCart,
  removeProductFromCart,
};