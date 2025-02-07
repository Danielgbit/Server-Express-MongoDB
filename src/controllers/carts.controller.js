const CartManager = require('../data/carts');
const ProductManager = require('../data/products');

const cartManager = new CartManager();
const productManager = new ProductManager();

const createCart = async (req, res) => {
    try {
        const newCart = cartManager.createCart();
        if(!newCart){ return res.status(404).send('failed created cart'); }

        res.status(201).send('cart created successfully');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getCart = async (req, res) => {
    try {
        const cart = cartManager.getCartById(req.params.id);
        res.status(200).send(cart);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

const addProductToCart = async (req, res) => {
    try {
        const cartId = req.params.cartId;
        const productId = req.params.productId;

        cartManager.addProductToCart(cartId, productId);
        
        res.status(201).send('add product successfull');
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

const removeProductFromCart = async (req, res) => {
    try {
      const { cartId, productId } = req.params;

      cartManager.removeProductFromCart(cartId, productId);
  
      res.status(410).send('deleted product in cart successfully');
  
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  };


module.exports = {
    createCart,
    getCart,
    addProductToCart,
    removeProductFromCart
};