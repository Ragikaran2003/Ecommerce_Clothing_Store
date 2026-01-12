import { createContext, useState, useEffect, useContext, useRef } from "react";
import api from "../api/axios";
import { AuthContext } from "./AuthContext";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { token } = useContext(AuthContext);
  const [mergeDone, setMergeDone] = useState(false);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const merged = useRef(false);

  useEffect(() => {
    token ? loadUserCart() : loadGuestCart();
  }, [token]);

  useEffect(() => {
    if (token && !merged.current) {
      merged.current = true;
      mergeGuestCart();
    }
    if (!token) {
      loadGuestCart();
      setMergeDone(true);
      merged.current = false;
    }
  }, [token]);

  const loadGuestCart = () => {
    const items = JSON.parse(localStorage.getItem("guestCart") || "[]");
    setCart(items);
  };

  const saveGuestCart = (items) =>
    localStorage.setItem("guestCart", JSON.stringify(items));

  const loadUserCart = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/cart");
      setCart(data || []);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (item) => {
    if (token) {
      await api.post("/cart/add", {
        productId: item.product._id,
        size: item.size,
        quantity: item.quantity,
      });
      loadUserCart();
    } else {
      setCart((prev) => {
        const updated = [...prev];
        const i = updated.findIndex(
          (x) => x.product._id === item.product._id && x.size === item.size
        );
        i >= 0 ? (updated[i].quantity += item.quantity) : updated.push(item);
        saveGuestCart(updated);
        return updated;
      });
    }
  };

  const removeFromCart = async (productId, size) => {
    setCart((prev) => {
      const updated = prev.filter(
        (i) => !(i.product._id === productId && i.size === size)
      );
      !token && saveGuestCart(updated);
      return updated;
    });
    token && api.post("/cart/remove", { productId, size });
  };

  const updateQuantity = async (productId, size, quantity) => {
    if (quantity < 1) return removeFromCart(productId, size);

    setCart((prev) =>
      prev.map((i) =>
        i.product._id === productId && i.size === size
          ? { ...i, quantity }
          : i
      )
    );

    token
      ? api.put("/cart/update", { productId, size, quantity })
      : saveGuestCart(cart);
  };

  const clearCart = async () => {
    setCart([]);
    localStorage.removeItem("guestCart");
  };

  const mergeGuestCart = async () => {
    const guest = JSON.parse(localStorage.getItem("guestCart") || "[]");

    if (guest.length) {
      for (const i of guest) {
        await api.post("/cart/add", {
          productId: i.product._id,
          size: i.size,
          quantity: i.quantity,
        });
      }
      localStorage.removeItem("guestCart");
    }

    await loadUserCart();
    setMergeDone(true);
  };

  const placeOrder = async () => {
    if (!token) throw new Error("Login required");
    if (!mergeDone || cart.length === 0)
      throw new Error("Cart not ready");

    const res = await api.post("/orders");
    clearCart();
    return res.data;
  };


  const getCartTotal = () =>
    cart.reduce((s, i) => s + i.product.price * i.quantity, 0);

  const getItemCount = () =>
    cart.reduce((s, i) => s + i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        placeOrder,
        getCartTotal,
        getItemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
