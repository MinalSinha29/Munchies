import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import restaurants from "../data/restaurants";
import { useCart } from "../context/CartContext";

export default function RestaurantMenu() {
  const { id } = useParams();
  const navigate = useNavigate();
  const restaurant = restaurants.find((r) => r.id === id);

  const { addToCart, total, cart } = useCart();

  if (!restaurant) {
    return (
      <div style={{ color: "white", padding: 20 }}>
        <h2>Restaurant not found</h2>
        <Link to="/" style={{ color: "#ff4d6d" }}>← Back to Home</Link>
      </div>
    );
  }

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    navigate("/cart");
  };

  return (
    <div style={{ maxWidth: 600, margin: "24px auto", padding: 20, color: "#fff" }}>
      <Link to="/" style={{ textDecoration: "none", color: "#ffb703" }}>
        ← Back
      </Link>

      <h2 style={{ marginTop: 10 }}>{restaurant.name} - Menu</h2>
      <p style={{ color: "#cbd3e1" }}>{restaurant.cuisines.join(", ")}</p>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {restaurant.menu.map((item, index) => (
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
            <div>
              <div style={{ fontWeight: "600" }}>{item.name}</div>
              <div style={{ color: "#cbd3e1", fontSize: "14px" }}>₹{item.price}</div>
            </div>

            <button
              onClick={() => addToCart(item)}
              style={{
                background: "#ff4d6d",
                color: "#fff",
                border: "none",
                padding: "8px 12px",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Add
            </button>
          </li>
        ))}
      </ul>

      <hr style={{ marginTop: 20, borderColor: "#333" }} />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
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
        Checkout
      </button>
    </div>
  );
}
