import React from "react";
import { useParams } from "react-router-dom";

function RestaurantPage() {
  const { id } = useParams();

  return (
    <div className="restaurant-page">
      <h2>Restaurant Menu</h2>
      <p>Showing menu for restaurant ID: {id}</p>
    </div>
  );
}

export default RestaurantPage;
