// src/components/Home.js
import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="home">
      <h1>Welcome to MM Munchies 🍔</h1>
      <p>Discover the best restaurants around you!</p>
      <Link to="/restaurants">
        <button>Explore Restaurants</button>
      </Link>
    </div>
  );
}
