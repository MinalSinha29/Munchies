import React from "react";
import { useParams } from "react-router-dom";

function RestaurantMenu() {
  const { id } = useParams(); // get restaurant id from URL

  return (
    <div>
      <h2>Restaurant Menu (ID: {id})</h2>
      <p>Here we will show the menu items of this restaurant.</p>
    </div>
  );
}

export default RestaurantMenu;
