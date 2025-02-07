const express = require('express');
const router = express.Router();

const {
    createCart,
    getCart,
    addProductToCart,
    removeProductFromCart
} = require('../controllers/carts.controller');

router.post('/created', createCart);
router.get('/:id', getCart);
router.post('/:cartId/product/:productId', addProductToCart);
router.delete('/delete/:cartId/product/:productId', removeProductFromCart);

module.exports = router;