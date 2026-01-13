const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      size: String,
      quantity: Number,
    },
  ],
  status: {type: String , required: true, default:"pending"},
  totalPrice: { type: Number, required: true },
  orderDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Order", orderSchema);
