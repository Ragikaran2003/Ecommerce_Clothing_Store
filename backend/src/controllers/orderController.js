const Order = require("../models/Order");
const User = require("../models/User");
const sendOrderConfirmationMail = require("../services/orderMailService");
const sendEmail = require("../utils/sendEmail");

exports.placeOrder = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("cart.product");

    if (!user || !user.cart.length) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const totalPrice = user.cart.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );

    const order = await Order.create({
      user: user._id,
      items: user.cart,
      totalPrice,
    });

    await User.findByIdAndUpdate(user._id, { $set: { cart: [] } });

    await sendOrderConfirmationMail(user, order);

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).populate(
      "items.product"
    );
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
