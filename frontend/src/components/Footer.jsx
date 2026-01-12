import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingBag, Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";
import { FilterContext } from "../context/FilterContext";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();
  const { setCategoryFilter, setSizeFilter, setSearch, setMinPrice, setMaxPrice } = useContext(FilterContext);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCategoryClick = (category) => {
    setCategoryFilter(category);
    scrollToTop();
    navigate("/");
  };

  const handleResetFilters = () => {
    setCategoryFilter("");
    setSizeFilter("");
    setSearch("");
    setMinPrice(0);
    setMaxPrice(20000);
    scrollToTop();
    navigate("/");
  };

  return (
    <footer className="bg-black text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" onClick={scrollToTop} className="flex items-center gap-2">
              <ShoppingBag className="w-8 h-8 text-white" />
              <span className="text-2xl font-bold">Clothing Store</span>
            </Link>
            <p className="text-gray-400 text-sm">
              Your one-stop destination for trendy and comfortable clothing. Quality fashion for every occasion.
            </p>
            <div className="flex gap-4 pt-4">
              <a href="https://facebook.com" target="_blank" className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://instagram.com" target="_blank" className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://twitter.com" target="_blank" className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" onClick={scrollToTop} className="text-gray-400 hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/" onClick={scrollToTop} className="text-gray-400 hover:text-white transition-colors">Products</Link>
              </li>
              <li>
                <Link to="/cart" onClick={scrollToTop} className="text-gray-400 hover:text-white transition-colors">Shopping Cart</Link>
              </li>
              <li>
                <Link to="/orders" onClick={scrollToTop} className="text-gray-400 hover:text-white transition-colors">My Orders</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <button onClick={() => handleCategoryClick("Men")} className="text-gray-400 hover:text-white transition-colors">Men's Collection</button>
              </li>
              <li>
                <button onClick={() => handleCategoryClick("Women")} className="text-gray-400 hover:text-white transition-colors">Women's Collection</button>
              </li>
              <li>
                <button onClick={() => handleCategoryClick("Kids")} className="text-gray-400 hover:text-white transition-colors">Kids' Collection</button>
              </li>
              <li>
                <button onClick={handleResetFilters} className="text-gray-400 hover:text-white transition-colors">New Arrivals</button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3 text-gray-400 text-sm">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5" />
                <span>Point Pedro, Jaffna, Sri Lanka</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5" />
                <span>+94 71 473 7273</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5" />
                <span>support@clothingstore.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">© {currentYear} Clothing Store. All rights reserved.</p>
            <div className="flex gap-6 text-sm">
              <Link to="/" onClick={scrollToTop} className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link>
              <Link to="/" onClick={scrollToTop} className="text-gray-400 hover:text-white transition-colors">Terms of Service</Link>
              <Link to="/" onClick={scrollToTop} className="text-gray-400 hover:text-white transition-colors">Refund Policy</Link>
            </div>
          </div>

          <div className="mt-4 text-center text-gray-500 text-sm">
            Created by{" "}
            <a href="https://ragikaran2003.free.nf" target="_blank" rel="noopener noreferrer" className="hover:text-white underline">
              Baskaran Ragikaran
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
