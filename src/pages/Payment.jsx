// src/pages/Payment.jsx
import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Payment() {
  const { cart, total, clearCart } = useCart();
  const [method, setMethod] = useState("UPI");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handlePayment = async () => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    setLoading(true);
    try {
      // small UX delay
      await new Promise((res) => setTimeout(res, 1200));

      // The server checks login and calculates names, prices and totals itself,
      // so we only send which items and how many.
      const { data } = await axios.post("/api/orders", {
        items: cart.map((i) => ({ itemId: i.itemId, qty: i.qty })),
        paymentMethod: method,
      });

      const orderId = data?.order?._id;
      if (!orderId) throw new Error("Order id missing in response");

      // clear cart + go to Bill page
      clearCart();
      navigate(`/order/${orderId}`);
    } catch (error) {
      console.error("Error while placing order:", error);
      if (error.response?.status === 401) {
        alert("Please log in to place your order.");
        navigate("/auth");
      } else {
        alert(error.response?.data?.message || "❌ Something went wrong while placing your order.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "24px auto", padding: 20, color: "#fff" }}>
      <Link to="/cart" style={{ textDecoration: "none", color: "#ffb703" }}>
        ← Back to Cart
      </Link>

      <h2 style={{ marginTop: 10 }}>💳 Payment Page</h2>

      <h3 style={{ marginTop: 20 }}>Order Summary</h3>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {cart.map((item, index) => (
          <li
            key={index}
            style={{
              background: "#151824",
              margin: "8px 0",
              padding: "12px 14px",
              borderRadius: "10px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span>{item.name} × {item.qty}</span>
            <span>₹{item.price * item.qty}</span>
          </li>
        ))}
      </ul>

      <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "bold", fontSize: "18px", marginTop: 10 }}>
        <span>Total:</span>
        <span>₹{total}</span>
      </div>

      <h3 style={{ marginTop: 25 }}>Select Payment Method</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {["UPI", "Credit/Debit Card", "Cash on Delivery"].map((option) => (
          <label key={option}>
            <input
              type="radio"
              name="payment"
              value={option}
              checked={method === option}
              onChange={(e) => setMethod(e.target.value)}
              style={{ marginRight: "8px" }}
            />
            {option}
          </label>
        ))}
      </div>

      <button
        onClick={handlePayment}
        disabled={loading}
        style={{
          marginTop: 20,
          width: "100%",
          background: loading
            ? "linear-gradient(90deg, #999, #777)"
            : "linear-gradient(90deg, #ffb703, #ff8500)",
          color: "#000",
          border: "none",
          padding: "12px 14px",
          borderRadius: "10px",
          fontWeight: "bold",
          cursor: loading ? "not-allowed" : "pointer",
          transition: "0.3s ease",
        }}
      >
        {loading ? "Processing Payment..." : `Pay ₹${total} Now`}
      </button>
    </div>
  );
}
