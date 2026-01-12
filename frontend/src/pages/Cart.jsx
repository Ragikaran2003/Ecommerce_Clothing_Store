import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Loading from "../components/Loading";

const Cart = () => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    getCartTotal,
    placeOrder,
    clearCart,
    getItemCount,
    loading: cartLoading,
  } = useContext(CartContext);

  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const [processing, setProcessing] = useState(false);
  const [removingItem, setRemovingItem] = useState(null);
  const [updatingItem, setUpdatingItem] = useState(null);

  const handlePlaceOrder = async () => {
    if (!token) return navigate("/login");

    try {
      setProcessing(true);
      await placeOrder();
      await clearCart();
      toast.success("Order placed successfully");
      navigate("/");
    } catch {
      toast.error("Order failed");
    } finally {
      setProcessing(false);
    }
  };

  const handleRemoveItem = async (productId, size) => {
    const itemKey = `${productId}-${size}`;
    setRemovingItem(itemKey);

    try {
      await removeFromCart(productId, size);
      toast.success("Item removed from cart");
    } catch {
      toast.error("Failed to remove item");
    } finally {
      setRemovingItem(null);
    }
  };

  const handleUpdateQuantity = async (productId, size, quantity) => {
    if (quantity < 1) return;

    const itemKey = `${productId}-${size}`;
    setUpdatingItem(itemKey);

    try {
      await updateQuantity(productId, size, quantity);
    } catch {
      toast.error("Failed to update quantity");
    } finally {
      setUpdatingItem(null);
    }
  };

  if (cartLoading) {
    return (
      <div className="max-w-6xl mx-auto p-4 md:p-6">
        <h2 className="text-2xl font-bold mb-6">Your Cart</h2>
        <Loading message="Loading your cart..." />
      </div>
    );
  }

  if (!cart.length) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-10 text-center">
        <h2 className="text-2xl font-bold mb-4">Your Cart is Empty</h2>
        <p className="text-gray-600 mb-6">Add some products to your cart</p>
        <button
          onClick={() => navigate("/")}
          className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6">
      <h2 className="text-2xl font-bold mb-6">Your Cart</h2>

      <div className="space-y-4">
        {cart.map((item) => {
          const productId = item.product?._id;
          const size = item.size;
          const name = item.product?.name;
          const price = item.product?.price || 0;
          const image = item.product?.image;
          const itemKey = `${productId}-${size}`;
          const isRemoving = removingItem === itemKey;
          const isUpdating = updatingItem === itemKey;

          return (
            <div
              key={itemKey}
              className={`flex flex-col md:flex-row justify-between border border-gray-400 p-4 rounded-lg shadow-sm hover:shadow-md ${
                isRemoving || isUpdating ? "opacity-70" : ""
              }`}
            >
              <div className="flex items-center space-x-4 mb-4 md:mb-0">
                <div className="w-24 h-24 shrink-0 relative">
                  {(isRemoving || isUpdating) && (
                    <div className="absolute inset-0 bg-gray-100 bg-opacity-70 rounded-lg flex items-center justify-center z-10">
                      <div className="w-8 h-8">
                        <Loading size="small" />
                      </div>
                    </div>
                  )}
                  <img
                    src={`/images/${image}`}
                    onClick={() => navigate(`/product/${productId}`)} 
                    alt={name}
                    className="w-full h-full object-cover rounded-lg cursor-pointer"
                  />
                </div>

                <div>
                  <h3 onClick={() => navigate(`/product/${productId}`)} className="font-semibold text-lg cursor-pointer">{name}</h3>
                  <p className="text-sm text-gray-600">Size: {size}</p>
                  <p className="font-medium">Rs.{price}</p>
                </div>
              </div>

              <div className="flex items-center justify-between md:justify-end gap-4">
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() =>
                      handleUpdateQuantity(productId, size, item.quantity - 1)
                    }
                    className="w-8 h-8 flex items-center justify-center border border-gray-500 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    disabled={item.quantity <= 1 || isRemoving || isUpdating}
                  >
                    −
                  </button>

                  <div className="relative">
                    <span className="font-medium w-8 text-center block">
                      {item.quantity}
                    </span>
                    {isUpdating && (
                      <div className="absolute -top-1 -right-1 w-4 h-4">
                        <Loading size="extra-small" />
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() =>
                      handleUpdateQuantity(productId, size, item.quantity + 1)
                    }
                    className="w-8 h-8 flex items-center justify-center border border-gray-500 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    disabled={isRemoving || isUpdating}
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => handleRemoveItem(productId, size)}
                  disabled={isRemoving || isUpdating}
                  className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 min-w-30 justify-center cursor-pointer"
                >
                  {isRemoving ? (
                    <>
                      <Loading size="small" />
                      <span>Removing...</span>
                    </>
                  ) : (
                    "Remove"
                  )}
                </button>

                <div className="text-right">
                  <p className="text-sm text-gray-600">Subtotal</p>
                  <p className="font-bold">Rs.{price * item.quantity}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 bg-gray-50 p-6 rounded-lg border border-gray-400">
        <h3 className="text-xl font-bold mb-4">Order Summary</h3>

        <div className="space-y-3 mb-6">
          <div className="flex justify-between">
            <span>Items ({getItemCount()}):</span>
            <span>Rs.{getCartTotal()}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping:</span>
            <span>Rs.{getCartTotal() > 2000 ? 0 : 99}</span>
          </div>
          <div className="flex justify-between border-t border-gray-400 pt-3 font-bold text-lg">
            <span>Total:</span>
            <span>Rs.{getCartTotal() + (getCartTotal() > 2000 ? 0 : 99)}</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => navigate("/")}
            disabled={processing}
            className="flex-1 border border-gray-500 text-black py-3 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            Continue Shopping
          </button>

          <button
            onClick={handlePlaceOrder}
            disabled={processing}
            className={`flex-1 py-3 rounded-lg flex items-center justify-center gap-2 cursor-pointer
              ${!token ? "bg-red-500 hover:bg-red-600 text-amber-50" : "bg-black hover:bg-gray-800 text-amber-50"}
              ${processing ? "disabled:bg-gray-400 cursor-not-allowed" : ""}`}
          >
            {processing ? (
              <>
                <Loading size="small" color="white" />
                <span>Processing Order...</span>
              </>
            ) : !token ? (
              "Login to Place Order"
            ) : (
              "Place Order"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
