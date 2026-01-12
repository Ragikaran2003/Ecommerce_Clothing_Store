import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../api/axios";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!token) return;

      try {
        const response = await api.get("/orders");
        setOrders(response.data || []);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [token]);

  if (!token) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">My Orders</h2>
        <p className="mb-6">Please login to view your orders</p>
        <Link to="/login" className="bg-black text-white px-6 py-3 rounded-lg">
          Login
        </Link>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="p-8">
        <h2 className="text-2xl font-bold mb-6">My Orders</h2>
        <Loading message="Loading orders..." />
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">My Orders</h2>
        <p className="mb-6">No orders found</p>
        <Link to="/" className="bg-black text-white px-6 py-3 rounded-lg">
          Shop Now
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-8">My Orders</h2>

      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order._id} className="border border-gray-400 p-6 rounded-lg shadow-sm">
            <div className="flex justify-between mb-4">
              <div>
                <h3 className="font-bold">Order #{order._id.slice(-6)}</h3>
                <p className="text-gray-600">
                  {new Date(order.orderDate).toLocaleDateString()}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold">Rs.{order.totalPrice}</p>
                <p className="text-gray-600">{order.items.length} items</p>
              </div>
            </div>

            <div className="space-y-4">
              {order.items.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-2 border border-gray-400 rounded-lg"
                >
                  <img
                    src={`/images/${item.product.image}`}
                    alt={item.product.name}
                    className="w-16 h-16 object-cover rounded"
                    onError={(e) =>
                      (e.target.src =
                        "https://via.placeholder.com/64x64?text=No+Image")
                    }
                  />
                  <div className="flex-1">
                    <p className="font-medium">{item.product.name}</p>
                    <p className="text-gray-600">
                      Size: {item.size} | Qty: {item.quantity}
                    </p>
                  </div>
                  <p className="font-bold">
                    Rs.{item.product.price * item.quantity}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
