const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
});

const ProductModel = mongoose.model("Products", productSchema);

module.exports = ProductModel;
