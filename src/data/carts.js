// src/data/carts.js
class CartManager {
    constructor() {
        this.carts = [];
        this.currentId = 1;
    }

    createCart() {
        const newCart = {
            id: this.currentId++,
            products: []
        };
        this.carts.push(newCart);
        return newCart;
    }

    getCartById(id) {
        const cart = this.carts.find(c => c.id === id);
        if(!cart) throw new Error('Carrito no encontrado');
        return cart;
    }

    addProductToCart(cartId, productId) {
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
    }
}

module.exports = CartManager;