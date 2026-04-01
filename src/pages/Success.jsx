import React from "react";
import { Link } from "react-router-dom";

export default function Success() {
  return (
    <div style={{
      textAlign: "center",
      color: "#fff",
      marginTop: "100px"
    }}>
      <h1>🎉 Order Placed Successfully!</h1>
      <p style={{ color: "#cbd3e1", marginTop: "10px" }}>
        Your delicious food is on its way 🚚💨
      </p>

      <Link
        to="/"
        style={{
          display: "inline-block",
          marginTop: "20px",
          background: "#ffb703",
          color: "#000",
          padding: "10px 18px",
          borderRadius: "10px",
          textDecoration: "none",
          fontWeight: "bold"
        }}
      >
        Back to Home
      </Link>
    </div>
  );
}
