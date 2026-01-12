const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  addToCart,
  updateCartItem,
  removeCartItem,
  getCart,
} = require("../controllers/cartController");

router.get("/", protect, getCart);
router.post("/add", protect, addToCart);
router.put("/update", protect, updateCartItem);
router.post("/remove", protect, removeCartItem);

module.exports = router;
