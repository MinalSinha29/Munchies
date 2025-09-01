import React from "react";

function RestaurantList({ restaurants, onSelect }) {
  return (
    <div style={{ padding: "20px" }}>
      <h2>Restaurants</h2>
      <ul>
        {restaurants.map((res) => (
          <li
            key={res.id}
            style={{ cursor: "pointer", margin: "10px 0" }}
            onClick={() => onSelect(res)}
          >
            {res.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RestaurantList;
