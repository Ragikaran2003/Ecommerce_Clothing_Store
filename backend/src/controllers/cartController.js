const User = require("../models/User");

exports.getCart = async (req, res) => {
  const user = await User.findById(req.user.id).populate("cart.product");
  res.json(user.cart);
};

exports.addToCart = async (req, res) => {
  const { productId, size, quantity } = req.body;

  const user = await User.findById(req.user.id);

  const itemIndex = user.cart.findIndex(
    (item) =>
      item.product.toString() === productId && item.size === size
  );

  if (itemIndex !== -1) {
    user.cart[itemIndex].quantity += quantity;
  } else {
    user.cart.push({ product: productId, size, quantity });
  }

  await user.save();
  res.json(user.cart);
};

exports.updateCartItem = async (req, res) => {
  const { productId, size, quantity } = req.body;

  const user = await User.findById(req.user.id);

  const item = user.cart.find(
    (item) =>
      item.product.toString() === productId && item.size === size
  );

  if (!item) {
    return res.status(404).json({ message: "Item not found" });
  }

  item.quantity = quantity;
  await user.save();

  res.json(user.cart);
};

exports.removeCartItem = async (req, res) => {
  const { productId, size } = req.body;

  const user = await User.findById(req.user.id);

  user.cart = user.cart.filter(
    (item) =>
      item.product.toString() !== productId || item.size !== size
  );

  await user.save();
  res.json(user.cart);
};
