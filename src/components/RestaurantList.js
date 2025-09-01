// src/components/RestaurantList.js
import React from "react";
import RestaurantCard from "./RestaurantCard";
import restaurants from "../data/restaurants";

export default function RestaurantList(){
  return (
    <div style={{maxWidth:1100, margin:"24px auto", padding:"0 16px"}}>
      <h2 style={{marginTop:0}}>Restaurants</h2>

      <div style={{
        display:"grid",
        gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))",
        gap:16
      }}>
        {restaurants.map(r => <RestaurantCard key={r.id} r={r} />)}
      </div>
    </div>
  );
}
