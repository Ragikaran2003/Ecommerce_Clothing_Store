import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import SingleProduct from "./pages/SingleProduct";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product/:productId" element={<SingleProduct />} />
          <Route path="/orders" element={<Orders />} />
          <Route
            path="*"
            element={
              <div className="p-8 text-center">
                <h2 className="text-2xl font-bold mb-4">Page Not Found</h2>
                <p className="text-gray-600">
                  The page you're looking for doesn't exist.
                </p>
              </div>
            }
          />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
