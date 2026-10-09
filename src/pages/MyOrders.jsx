// src/pages/MyOrders.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (!token || !user) {
      navigate("/auth");
      return;
    }

    const fetchOrders = async () => {
      try {
        const { data } = await axios.get(
          "/api/orders/mine",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setOrders(data);
      } catch (err) {
        console.error("❌ Error fetching orders:", err);
        alert("Couldn't load your orders. Please log in again.");
        navigate("/auth");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [navigate]);

  return (
    <div style={{ maxWidth: 900, margin: "24px auto", padding: 16, color: "#fff" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2>🧾 My Orders</h2>
        <Link to="/" style={{ color: "#ffb703", textDecoration: "none" }}>
          ← Back to Home
        </Link>
      </div>

      {loading ? (
        <p style={{ marginTop: 20, color: "#ffb703" }}>Loading your orders…</p>
      ) : orders.length === 0 ? (
        <div style={{ marginTop: 20 }}>
          <p>You haven’t placed any orders yet.</p>
          <Link to="/" style={{ color: "#ffb703" }}>Browse restaurants →</Link>
        </div>
      ) : (
        <div style={{ display: "grid", gap: 14, marginTop: 12 }}>
          {orders.map((o) => (
            <div
              key={o._id}
              style={{
                background: "#151824",
                borderRadius: 12,
                padding: 14,
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <div>
                  <div style={{ fontWeight: 700 }}>
                    Order #{o._id.slice(-6).toUpperCase()}
                  </div>
                  <div style={{ fontSize: 13, color: "#bbb" }}>
                    {new Date(o.createdAt).toLocaleString()}
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontWeight: 700 }}>₹{o.total}</div>
                  <div style={{ fontSize: 13, color: "#bbb" }}>
                    {o.paymentMethod || "Unknown"} • {o.status || "placed"}
                  </div>
                </div>
              </div>

              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {o.items.map((it, idx) => (
                  <li
                    key={idx}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "8px 0",
                      borderTop:
                        idx === 0 ? "none" : "1px dashed rgba(255,255,255,0.1)",
                    }}
                  >
                    <span>{it.name} × {it.qty}</span>
                    <span>₹{it.price * it.qty}</span>
                  </li>
                ))}
              </ul>

              <div style={{ marginTop: 10, display: "flex", gap: 10 }}>
                <button
                  onClick={() => navigate(`/order/${o._id}`)}
                  style={{
                    background: "#ffb703",
                    color: "#000",
                    border: "none",
                    padding: "8px 12px",
                    borderRadius: 8,
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                >
                  View Bill
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
