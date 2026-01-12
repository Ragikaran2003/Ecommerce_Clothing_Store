import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";
import { ShoppingBag, User, ShoppingCart, LogOut } from "lucide-react";

const Navbar = () => {
  const { token, userName, logout } = useContext(AuthContext);
  const { getItemCount } = useContext(CartContext);

  const cartItemCount = getItemCount();

  return (
    <nav className="bg-white shadow-md border-b border-gray-300 px-4 md:px-8 py-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <ShoppingBag className="w-8 h-8 text-black" />
          <span className="text-xl font-bold text-black">Clothing Store</span>
        </Link>

        <div className="flex items-center gap-6">
          <Link to="/" className="text-gray-700 hover:text-black font-medium">
            Home
          </Link>

          {token && (
            <Link to="/orders" className="text-gray-700 hover:text-black font-medium">
              Orders
            </Link>
          )}

          <div className="flex items-center gap-4">
            {!token ? (
              <>
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-black font-medium flex items-center gap-1"
                >
                  <User className="w-4 h-4" />
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors font-medium"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <>
                <div className="flex items-center gap-2 text-gray-700">
                  <User className="w-4 h-4" />
                  <span className="font-medium">Hi, {userName}</span>
                </div>
                <button
                  onClick={logout}
                  className="text-gray-700 hover:text-black font-medium flex items-center gap-1"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </>
            )}

            <Link
              to="/cart"
              className="relative p-2 text-gray-700 hover:text-black"
            >
              <ShoppingCart className="w-6 h-6" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
