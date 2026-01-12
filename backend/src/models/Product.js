const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  image: String,
  category: { type: String, enum: ["Men", "Women", "Kids"], required: true },
  sizes: [{ type: String, enum: ["S", "M", "L", "XL"] }],
});

module.exports = mongoose.model("Product", productSchema);
