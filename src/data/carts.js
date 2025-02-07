const { log } = require("console");
const fs = require("fs");
const path = require("path");
// src/data/carts.js
class CartManager {
  constructor() {
    this.path = path.join(__dirname, "../models/carts.json");
    this.carts = this.getCarts(); // Inicializa this.carts di
  }

      createCart() {
        const newCart = {
            id: this.currentId++,
            products: []
        };
        this.carts.push(newCart);
        return newCart;
    }

  getCarts() {
    try {
      const data = fs.readFileSync(this.path, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      // Si el archivo no existe o hay un error, devuelve un array vacío
      return [];
    }
  }

  getCartById(id) {
    id = Number(id);
    // Buscar el carrito por su id
    const cart = this.carts.find((c) => c.id === id);
    if (!cart) {
      console.log("Carrito no encontrado");
      return null;
    }
    // Devolver el carrito encontrado
    return cart;
  }
  /*     addProductToCart(cartId, productId) {
        const cart = this.getCartById(cartId);
        const existingProduct = cart.products.find(p => p.product === productId);
        
        if(existingProduct) {
            existingProduct.quantity++;
        } else {
            cart.products.push({
                product: productId,
                quantity: 1
            });
        }
        return cart;
    } */
}

module.exports = CartManager;
