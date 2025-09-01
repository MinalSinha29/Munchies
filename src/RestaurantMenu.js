import React from "react";

function RestaurantMenu({ restaurant, onBack }) {
  if (!restaurant) return null;

  return (
    <div style={{ padding: "20px" }}>
      <h2>{restaurant.name} - Menu</h2>
      <button onClick={onBack} style={{ marginBottom: "20px" }}>⬅ Back</button>
      <ul>
        {restaurant.menu.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default RestaurantMenu;
