// src/components/Header.jsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function Header({ q, onQ, vegOnly, onVegOnly }) {
  const { cart } = useCart();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // Load user & listen for login/logout events
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));

    const handleUserLogin = () => {
      const u = localStorage.getItem("user");
      if (u) setUser(JSON.parse(u));
    };
    const handleUserLogout = () => setUser(null);

    window.addEventListener("userLogin", handleUserLogin);
    window.addEventListener("userLogout", handleUserLogout);
    return () => {
      window.removeEventListener("userLogin", handleUserLogin);
      window.removeEventListener("userLogout", handleUserLogout);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    window.dispatchEvent(new Event("userLogout"));
    alert("👋 Logged out successfully!");
    navigate("/");
  };

  return (
    <header
      style={{
        background: "linear-gradient(90deg, #1a1a2e, #16213e)",
        padding: "14px 0",
        color: "#fff",
        boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "16px",
          padding: "0 20px",
        }}
      >
        {/* Brand */}
        <Link
          to="/"
          style={{ display: "flex", alignItems: "center", textDecoration: "none" }}
        >
          <span
            style={{
              fontSize: "22px",
              fontWeight: "bold",
              color: "#ffb703",
              letterSpacing: "1px",
            }}
          >
            M&M
          </span>
          <span style={{ color: "#fff", fontWeight: "500", marginLeft: "5px", fontSize: "20px" }}>
            Munchies
          </span>
        </Link>

        {/* Search */}
        <input
          type="text"
          placeholder="Search restaurants or cuisines..."
          value={q}
          onChange={(e) => onQ(e.target.value)}
          style={{
            flex: "1",
            background: "#0f3460",
            border: "none",
            outline: "none",
            borderRadius: "8px",
            padding: "10px 14px",
            color: "#fff",
            fontSize: "14px",
            boxShadow: "inset 0 0 5px rgba(255,255,255,0.1)",
          }}
        />

        {/* Veg Toggle */}
        <label
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            color: "#d6d6d6",
            fontSize: "14px",
            cursor: "pointer",
          }}
        >
          <input
            type="checkbox"
            checked={vegOnly}
            onChange={(e) => onVegOnly(e.target.checked)}
            style={{ accentColor: "#00ff88", width: "16px", height: "16px", cursor: "pointer" }}
          />
          Veg Only
        </label>

        {/* Cart + Auth */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          {/* Cart */}
          <div
            style={{ position: "relative", cursor: "pointer" }}
            onClick={() => navigate("/cart")}
          >
            <ShoppingCart size={24} color="#ffb703" />
            {cart.length > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: "-6px",
                  right: "-8px",
                  background: "#ff4d4d",
                  color: "#fff",
                  fontSize: "12px",
                  fontWeight: "bold",
                  borderRadius: "50%",
                  padding: "3px 6px",
                }}
              >
                {cart.length}
              </span>
            )}
          </div>

          {/* Auth Section */}
          {!user ? (
            <button
              onClick={() => navigate("/auth")}
              style={{
                background: "linear-gradient(90deg, #ffb703, #ff8500)",
                color: "#000",
                border: "none",
                padding: "8px 16px",
                borderRadius: "8px",
                fontWeight: "bold",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
            >
              Login / Signup
            </button>
          ) : (
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{ fontSize: "15px", fontWeight: "500", color: "#eee" }}>
                Hi, {user.name.split(" ")[0]} 👋
              </span>

              {/* NEW: My Orders button */}
              <button
                onClick={() => navigate("/my-orders")}
                style={{
                  background: "#ffb703",
                  color: "#000",
                  border: "none",
                  padding: "8px 12px",
                  borderRadius: "8px",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                My Orders
              </button>

              <button
                onClick={handleLogout}
                style={{
                  background: "#ff4d4d",
                  color: "#fff",
                  border: "none",
                  padding: "8px 14px",
                  borderRadius: "8px",
                  fontWeight: "bold",
                  cursor: "pointer",
                  transition: "0.3s ease",
                }}
                onMouseOver={(e) => (e.currentTarget.style.background = "#ff6666")}
                onMouseOut={(e) => (e.currentTarget.style.background = "#ff4d4d")}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
