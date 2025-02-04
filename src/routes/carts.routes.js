const express = require('express');
const router = express.Router();

const {
    createCart,
    getCart,
    addProductToCart
} = require('../controllers/carts.controller');

router.post('/', createCart);
router.get('/:id', getCart);
router.post('/:id/product/:pid', addProductToCart);

module.exports = router;