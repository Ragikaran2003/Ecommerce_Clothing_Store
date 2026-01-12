import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { CartProvider } from "./context/CartContext";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";
import { FilterProvider } from "./context/FilterContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <FilterProvider>
      <CartProvider>
        <App />
        <Toaster position="top-right" />
      </CartProvider>
    </FilterProvider>
  </AuthProvider>
);