const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require('uuid');



class CartManager {
  constructor() {
    this.path = path.join(__dirname, "../models/carts.json");
    this.carts = this.getCarts();
  }

  createCart() {
        const newCart = {
            id: uuidv4(),
            products: []
        };
      
        this.carts.push(newCart);
        fs.writeFileSync(this.path, JSON.stringify(this.carts, null, 2), 'utf-8');
        return newCart;
  };



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
    const cart = this.carts.find((cart) => cart.id === id);
    if (!cart) { return null;}
    return cart;
  }

 
  addProductToCart(cartId, productId) {
    const cart = this.getCartById(cartId);

    if (!cart) {
        throw new Error(`Carrito con ID ${cartId} no encontrado`);
    }

    const existingProduct = cart.products.find(p => p.product === productId);

    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        const newProduct = {
            product: productId,
            quantity: 1
        };
        cart.products.push(newProduct);
    }

    fs.writeFileSync(this.path, JSON.stringify(cart, null, 2), 'utf-8');
}

removeProductFromCart(cartId, productId) {
  const cart = this.getCartById(cartId);

  console.log(cart);
  

/*   if (!cart) {
    throw new Error(`Carrito con ID ${cartId} no encontrado`);
  }

  // Buscar el índice del producto en el carrito
  const productIndex = cart.products.findIndex(p => p.product === productId);

  // Si el producto no existe, lanzar un error
  if (productIndex === -1) {
    throw new Error(`Producto con ID ${productId} no encontrado en el carrito`);
  }

  // Eliminar el producto del carrito
  cart.products.splice(productIndex, 1);

  // Guardar el carrito actualizado
  this.saveCart(cart);

  console.log(`Producto ${productId} eliminado del carrito ${cartId}`); */
}
}

module.exports = CartManager;
