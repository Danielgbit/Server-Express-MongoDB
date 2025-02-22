const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    products: {
        type: Array,
        required: true,
        default: []
    }
});

const CartModel = mongoose.model('Cart', cartSchema);

module.exports = CartModel;