import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { cart, total, addToCart, decreaseQty, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    navigate("/payment"); // ✅ Go to Payment Page instead of clearing cart here
  };

  return (
    <div style={{ maxWidth: 600, margin: "24px auto", padding: 20, color: "#fff" }}>
      <Link to="/" style={{ textDecoration: "none", color: "#ffb703" }}>
        ← Back
      </Link>

      <h2 style={{ marginTop: 10 }}>🛒 Your Cart</h2>

      {cart.length === 0 ? (
        <p style={{ color: "#cbd3e1", marginTop: 10 }}>Your cart is empty.</p>
      ) : (
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
                alignItems: "center",
                border: "1px solid #1e2230",
              }}
            >
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: "600" }}>{item.name}</div>
                <div style={{ color: "#cbd3e1", fontSize: "14px" }}>₹{item.price}</div>
              </div>

              {/* Quantity Controls */}
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <button
                  onClick={() => decreaseQty(item.name)}
                  style={{
                    background: "#333",
                    color: "#fff",
                    border: "none",
                    borderRadius: "50%",
                    width: "28px",
                    height: "28px",
                    cursor: "pointer",
                    fontSize: "18px",
                    lineHeight: "20px",
                  }}
                >
                  −
                </button>
                <span style={{ fontSize: "16px" }}>{item.qty}</span>
                <button
                  onClick={() => addToCart(item)}
                  style={{
                    background: "#333",
                    color: "#fff",
                    border: "none",
                    borderRadius: "50%",
                    width: "28px",
                    height: "28px",
                    cursor: "pointer",
                    fontSize: "18px",
                    lineHeight: "20px",
                  }}
                >
                  +
                </button>
              </div>

              {/* Remove button */}
              <button
                onClick={() => removeFromCart(item.name)}
                style={{
                  background: "none",
                  color: "#ff4d6d",
                  border: "none",
                  marginLeft: "8px",
                  fontSize: "18px",
                  cursor: "pointer",
                }}
                title="Remove item"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}

      <hr style={{ marginTop: 20, borderColor: "#333" }} />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: "18px",
          fontWeight: "bold",
          marginTop: 10,
        }}
      >
        <span>Total:</span>
        <span>₹{total}</span>
      </div>

      <button
        onClick={handleCheckout}
        style={{
          marginTop: 16,
          width: "100%",
          background: "#ffb703",
          color: "#000",
          border: "none",
          padding: "10px 12px",
          borderRadius: "10px",
          fontWeight: "bold",
          cursor: "pointer",
        }}
      >
        Proceed to Payment
      </button>
    </div>
  );
}

