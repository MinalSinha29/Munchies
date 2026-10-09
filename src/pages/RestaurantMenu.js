import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/CartContext";

export default function RestaurantMenu() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);

  const { cart, addToCart, decreaseQty, total } = useCart();

  // Menu comes from the backend (single source of truth)
  useEffect(() => {
    setLoading(true);
    axios
      .get(`/api/restaurants/${id}`)
      .then((res) => setRestaurant(res.data))
      .catch(() => setRestaurant(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <div style={{ color: "white", padding: 20 }}>🍽️ Loading menu...</div>;
  }

  if (!restaurant) {
    return (
      <div style={{ color: "white", padding: 20 }}>
        <h2>Restaurant not found</h2>
        <Link to="/" style={{ color: "#ff4d6d" }}>← Back to Home</Link>
      </div>
    );
  }

  // Get the quantity of a specific menu item
  const getQty = (itemId) => {
    const found = cart.find((i) => i.itemId === itemId);
    return found ? found.qty : 0;
  };

  // What goes into the cart (enough to place the order and group it by restaurant)
  const toCartItem = (item) => ({
    itemId: item.itemId,
    name: item.name,
    price: item.price,
    veg: item.veg,
    restaurantId: restaurant.id,
    restaurantName: restaurant.name,
  });

  // Navigate to cart page
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
        {restaurant.menu.map((item, index) => {
          const qty = getQty(item.itemId);
          return (
            <li
              key={item.itemId || index}
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
                <div style={{ fontWeight: "600" }}>
                  <span title={item.veg ? "Veg" : "Non-veg"} style={{ marginRight: 6 }}>
                    {item.veg ? "🟢" : "🔴"}
                  </span>
                  {item.name}
                  {item.spiceLevel > 0 && (
                    <span style={{ marginLeft: 6 }}>{"🌶️".repeat(item.spiceLevel)}</span>
                  )}
                </div>
                <div style={{ color: "#cbd3e1", fontSize: "14px" }}>₹{item.price}</div>
                {item.description && (
                  <div style={{ color: "#8f9bb3", fontSize: "13px", marginTop: 2 }}>
                    {item.description}
                  </div>
                )}
                {item.allergens && item.allergens.length > 0 && (
                  <div style={{ color: "#8f9bb3", fontSize: "12px", marginTop: 2 }}>
                    Contains: {item.allergens.join(", ")}
                  </div>
                )}
              </div>

              {/* Quantity Control Section */}
              {qty > 0 ? (
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <button
                    onClick={() => decreaseQty(item.itemId)}
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
                  <span style={{ fontSize: "16px" }}>{qty}</span>
                  <button
                    onClick={() => addToCart(toCartItem(item))}
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
              ) : (
                <button
                  onClick={() => addToCart(toCartItem(item))}
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
              )}
            </li>
          );
        })}
      </ul>

      <hr style={{ marginTop: 20, borderColor: "#333" }} />

      {/* Total and Checkout */}
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
