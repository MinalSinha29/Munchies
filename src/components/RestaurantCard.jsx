import React from "react";
import { Link } from "react-router-dom";
import { Star } from "lucide-react";

export default function RestaurantCard({ r }) {
  return (
    <div
      style={{
        background: "#151824",
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
        transition: "transform .2s",
      }}
    >
      {/* ✅ Restaurant Image */}
      <img
        src={`/images/${r.id}.jpg`}
        alt={r.name}
        style={{
          width: "100%",
          height: "180px",
          objectFit: "cover",
        }}
        onError={(e) => {
          e.target.src = "/images/default.jpg"; // fallback image
        }}
      />

      {/* ✅ Restaurant Info */}
      <div style={{ padding: "14px" }}>
        <h3 style={{ color: "#fff" }}>{r.name}</h3>
        <p style={{ color: "#bbb" }}>{r.cuisines?.join(", ")}</p>

        <div style={{ marginTop: 10, color: "#ffb703" }}>
          ⭐ {r.rating} &nbsp; • &nbsp; ₹{r.priceForTwo} for two
        </div>

        <Link
          to={`/restaurant/${r.id}`}
          style={{
            display: "inline-block",
            marginTop: 10,
            background: "#ffb703",
            padding: "8px 14px",
            borderRadius: "8px",
            fontWeight: "bold",
            color: "#000",
            textDecoration: "none",
          }}
        >
          View Menu →
        </Link>
      </div>
    </div>
  );
}
