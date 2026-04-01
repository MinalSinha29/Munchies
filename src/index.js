// src/index.js
import React from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";
import App from "./App";
import { CartProvider } from "./context/CartContext";
import axios from "axios";

// 🪄 Automatically attach token to every request
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

const root = createRoot(document.getElementById("root"));
root.render(
  <CartProvider>
    <App />
  </CartProvider>
);
