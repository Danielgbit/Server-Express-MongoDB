const CartManager = require('../data/carts');
const ProductManager = require('../data/products');

const cartManager = new CartManager();
const productManager = new ProductManager();

const createCart = async (req, res) => {
/*     try {
        const newCart = cartManager.createCart();
        res.status(201).json(newCart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    } */
};

const getCart = async (req, res) => {
    try {
        const cart = cartManager.getCartById(req.params.id);
        console.log(cart);
        
        res.status(200).send(cart);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

const addProductToCart = async (req, res) => {
/*     try {
        const cartId = parseInt(req.params.cid);
        const productId = parseInt(req.params.pid);
        
        // Verificar si el producto existe
        productManager.getProductById(productId);s
        
        const cart = cartManager.addProductToCart(cartId, productId);
        res.json(cart);
    } catch (error) {
        res.status(404).json({ error: error.message });
    } */
};

module.exports = {
    createCart,
    getCart,
    addProductToCart
};