const CartModel = require("../models/cart.model");
const { getProductById } = require('../services/productService')

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

const getCarts = async (req, res) => {
  try {
    const carts = await CartModel.find();
    if (!carts) {
      return res.status(404).json({ status: "error", message: "Carrito no encontrado" });
    }
    res.status(200).send({ status: 'success', payload: carts });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCart = async (req, res) => {
  try {
    const id = req.params.id;
    const cart = await CartModel.findById({
      _id: id
    });

    if (!cart) {
      return res.status(404).json({ status: "error", message: "Carrito no encontrado" });
    }

    let total = 0;

    for (const item of cart.products) {
      const product = await getProductById(item._id);

      if (product && product.payload && product.payload.price) {
        total += product.payload.price * item.quantity;
      } else {
        console.warn(`Producto con ID ${item._id} no encontrado o sin precio.`);
      }
    }

    res.status(200).send({
      status: 'success',
      payload: {
        cart: cart,
        total: total
      }
    });

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

    // Buscar si el producto ya está en el carrito
    const existingProduct = cart.products.find(product => product._id.toString() === productId);

    if (existingProduct) {
      // Si el producto ya existe, aumentar la cantidad
      existingProduct.quantity += 1;
    } else {
      // Si el producto no existe, agregarlo con cantidad = 1
      cart.products.push({ _id: productId, quantity: 1 });
    }

    await cart.save();
    res.status(201).json({ status: "success", message: "Producto agregado exitosamente", payload: cart });

  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};


const removeProductFromCart = async (req, res) => {
  try {
    const { cartId, productId } = req.params;

    // Buscar el carrito por su ID
    const cart = await CartModel.findById(cartId);
    if (!cart) {
      return res.status(404).json({ status: "error", message: "Carrito no encontrado" });
    }

    // Filtrar los productos para eliminar el producto especificado
    const initialProductCount = cart.products.length; // Cantidad inicial de productos
    cart.products = cart.products.filter(
      (product) => product._id.toString() !== productId
    );

    // Verificar si el producto fue eliminado
    if (cart.products.length === initialProductCount) {
      return res.status(404).json({ status: "error", message: "Producto no encontrado en el carrito" });
    }

    // Guardar el carrito actualizado
    const updatedCart = await cart.save();

    res.status(200).json({ status: "success", message: "Producto eliminado del carrito", payload: updatedCart });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};


const updateProductQuantity = async (req, res) => {
    const { cartId, productId } = req.params;
    const { action } = req.body; // action puede ser "increment" o "decrement"
    try {
        // Buscar el carrito por ID
        const cart = await CartModel.findById(cartId);
        if (!cart) {
            return res.status(404).json({ status: "error", message: "Carrito no encontrado" });
        }

        // Buscar el producto en el carrito
        const productIndex = cart.products.findIndex(
            (product) => product._id.toString() === productId
        );

        if (productIndex === -1) {
            return res.status(404).json({ status: "error", message: "Producto no encontrado en el carrito" });
        }

        // Determinar el cambio basado en la acción
        let newQuantity;
        if (action === "increment") {
            newQuantity = cart.products[productIndex].quantity + 1;
        } else if (action === "decrement") {
            newQuantity = cart.products[productIndex].quantity - 1;
        } else {
            return res.status(400).json({ status: "error", message: "Acción no válida" });
        }

        if (newQuantity < 1) {
            return res.status(400).json({ status: "error", message: "La cantidad no puede ser menor que 1" });
        }

        cart.products[productIndex].quantity = newQuantity;

        await cart.save();

        res.status(200).json({ status: "success", payload: cart });
    } catch (error) {
        console.error("Error al actualizar la cantidad del producto:", error);
        res.status(500).json({ status: "error", message: "Error interno del servidor" });
    }
};


const removeCart = async (req, res) => {
  try {
    // Verifica si el carrito está en la sesión
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ status: "error", message: "Carrito no encontrado en la sesión" });
    }

    const cartId = id;

    // Buscar el carrito en la base de datos
    const cart = await CartModel.findById(cartId);
    if (!cart) {
      return res.status(404).json({ status: "error", message: "Carrito no encontrado en la base de datos" });
    }

    // Vaciar el carrito
    cart.products = [];
    await cart.save();

    res.send({ status: "success", payload: cart });
  } catch (error) {
    console.error("Error al vaciar el carrito:", error);
    res.status(500).json({ status: "error", message: "No se pudo vaciar el carrito" });
  }
};


module.exports = {
  removeCart,
  createCart,
  getCart,
  addProductToCart,
  removeProductFromCart,
  getCarts,
  updateProductQuantity,
};