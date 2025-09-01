import React from "react";
import cn from "classnames";

const bands = [
  { id: "lt500", label: "Less than ₹500" },
  { id: "500to1000", label: "₹500–₹1000" },
  { id: "1000to1500", label: "₹1000–₹1500" },
  { id: "gt1500", label: "₹1500+" },
];

export default function Filters({
  categories,
  selectedCats,
  onToggleCat,
  priceBand,
  onPriceBand,
  minRating,
  onMinRating,
}) {
  return (
    <div className="filters">
      <div className="chip-row">
        {categories.map((c) => (
          <button
            key={c}
            className={cn("chip", selectedCats.has(c) && "chip--active")}
            onClick={() => onToggleCat(c)}
          >
            {c}
          </button>
        ))}

        <button
          className={cn("chip", minRating === 4 && "chip--active")}
          onClick={() => onMinRating(minRating === 4 ? null : 4)}
          title="Show rating 4.0+"
        >
          Ratings 4.0+
        </button>
      </div>

      <div className="chip-row wrap">
        {bands.map((b) => (
          <button
            key={b.id}
            className={cn("chip", priceBand === b.id && "chip--active")}
            onClick={() => onPriceBand(priceBand === b.id ? null : b.id)}
          >
            {b.label}
          </button>
        ))}

        {(selectedCats.size || priceBand || minRating) ? (
          <button
            className="chip clear"
            onClick={() => {
              // simple reset without switch/case
              selectedCats.forEach(c => onToggleCat(c));
              onPriceBand(null);
              onMinRating(null);
            }}
          >
            Clear filters
          </button>
        ) : null}
      </div>
    </div>
  );
}


