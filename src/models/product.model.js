const mongoose = require("mongoose");

const productScheme = new mongoose.Schema({
    title: String,
    Description: String,
    price: Number
})

const ProductModel = mongoose.model('Products', productScheme);

module.exports = ProductModel;