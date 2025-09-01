import React from "react";
import { Star } from "lucide-react";
import cn from "classnames";

function initials(name) {
  return name.split(" ").slice(0,2).map(w=>w[0]).join("").toUpperCase();
}

export default function RestaurantCard({ r }) {
  return (
    <div className="card">
      <div className={cn("thumb")}>
        <div className="avatar">{initials(r.name)}</div>
      </div>

      <div className="card-body">
        <div className="card-title">
          <span>{r.name}</span>
          {r.veg && <span className="veg-badge" title="Pure Veg"/>}
        </div>

        <div className="meta">
          <span className="rating">
            <Star size={14}/> {r.rating.toFixed(1)}
          </span>
          <span>• {r.eta} mins</span>
          <span>• ₹{r.priceForTwo} for two</span>
        </div>

        <div className="faded">
          {r.cuisines.join(", ")}
        </div>
      </div>
    </div>
  );
}
