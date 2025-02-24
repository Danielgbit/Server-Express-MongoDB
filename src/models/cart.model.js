const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    products: {
        type: [
            {
                _id: { // Antes era productId, ahora usamos _id para mantener consistencia
                    type: mongoose.Schema.Types.ObjectId,
                    required: true,
                },
                quantity: {
                    type: Number,
                    required: true,
                    default: 1,
                },
            },
        ],
        required: true,
        default: [],
    },
});

const CartModel = mongoose.model('Cart', cartSchema);

module.exports = CartModel;