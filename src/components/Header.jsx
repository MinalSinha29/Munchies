// src/components/Header.jsx

import React from "react";
import { Search, MapPin, ShoppingBag, User } from "lucide-react";
import cn from "classnames";
import { Link } from "react-router-dom";

export default function Header({ q, onQ, vegOnly, onVegOnly }) {
  return (
    <header className="site-header">
      <div className="container header-row">
        {/* Brand Logo (clickable, goes to homepage) */}
        <Link to="/" className="brand">
          <span className="logo-dot">M</span>
          <span className="logo-dot alt">M</span>
          <span className="brand-name"> &nbsp;Munchies</span>
        </Link>

        {/* Location */}
        <div className="location">
          <MapPin size={16} />
          <span>Set delivery location</span>
        </div>

        {/* Searchbox */}
        <div className={cn("searchbox")}>
          <Search size={18} />
          <input
            placeholder="Search for restaurant or cuisine"
            value={q}
            onChange={(e) => onQ(e.target.value)}
          />
        </div>

        {/* Veg Only Toggle */}
        <label className="veg-toggle">
          <input
            type="checkbox"
            checked={vegOnly}
            onChange={(e) => onVegOnly(e.target.checked)}
          />
          <span className="veg-pill">
            <span className="veg-dot" />
            Pure Veg
          </span>
        </label>

        {/* Cart Button */}
        <button className="bag">
          <ShoppingBag size={18} /> Cart
        </button>

        {/* Login/Signup Button linking to /auth */}
        <Link
          to="/auth"
          className="login-btn"
          style={{ display: "flex", alignItems: "center", gap: 8 }}
        >
          <User size={18} /> <span className="login-text">Login / Signup</span>
        </Link>
      </div>
    </header>
  );
}
