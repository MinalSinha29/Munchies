import React, { useMemo, useState } from "react";
import Header from "../components/Header";
import Filters from "../components/Filters";
import RestaurantCard from "../components/RestaurantCard";
import data from "../data/restaurants";
import { SortAsc, SortDesc } from "lucide-react";
import cn from "classnames";

const SORTERS = {
  relevance: () => 0,
  rating_desc: (a, b) => b.rating - a.rating,
  eta_asc: (a, b) => a.eta - b.eta,
  price_asc: (a, b) => a.priceForTwo - b.priceForTwo,
  price_desc: (a, b) => b.priceForTwo - a.priceForTwo,
};

export default function Home() {
  const [q, setQ] = useState("");
  const [selectedCats, setSelectedCats] = useState(new Set());
  const [priceBand, setPriceBand] = useState(null);
  const [vegOnly, setVegOnly] = useState(false);
  const [minRating, setMinRating] = useState(null);
  const [sortBy, setSortBy] = useState("relevance");

  const categories = useMemo(() => {
    const s = new Set();
    data.forEach(r => (r.categories || []).forEach(c => s.add(c)));
    const preferred = ["Pizza","Burger","South Indian","Biryani","Sushi","Quick Bites","Veg Meals","Mexican","Casual Dining"];
    const rest = [...s].filter(x => !preferred.includes(x)).sort();
    return [...preferred.filter(x => s.has(x)), ...rest];
  }, []);

  const applyToggleCat = (c) => {
    const copy = new Set(selectedCats);
    copy.has(c) ? copy.delete(c) : copy.add(c);
    setSelectedCats(copy);
  };

  const filtered = useMemo(() => {
    return data
      .filter(r =>
        q.trim()
          ? (r.name + " " + r.cuisines.join(" ") + " " + (r.categories||[]).join(" "))
              .toLowerCase().includes(q.toLowerCase())
          : true
      )
      .filter(r => (vegOnly ? r.veg : true))
      .filter(r => (minRating ? r.rating >= minRating : true))
      .filter(r => {
        if (!priceBand) return true;
        const p = r.priceForTwo;
        const tests = {
          lt500: p < 500,
          "500to1000": p >= 500 && p <= 1000,
          "1000to1500": p > 1000 && p <= 1500,
          gt1500: p > 1500,
        };
        return tests[priceBand];
      })
      .filter(r => {
        if (selectedCats.size === 0) return true;
        const tags = new Set([...(r.categories||[]), ...r.cuisines]);
        for (const c of selectedCats) if (tags.has(c)) return true;
        return false;
      })
      .slice()
      .sort(SORTERS[sortBy]);
  }, [q, vegOnly, minRating, priceBand, selectedCats, sortBy]);

  return (
    <div className="container">
      <Header q={q} onQ={setQ} vegOnly={vegOnly} onVegOnly={setVegOnly} />
      <Filters
        categories={categories}
        selectedCats={selectedCats}
        onToggleCat={applyToggleCat}
        priceBand={priceBand}
        onPriceBand={setPriceBand}
        minRating={minRating}
        onMinRating={setMinRating}
      />

      <div className="toolbar">
        <div className="count">{filtered.length} restaurants</div>
        <div className="sorter">
          <label>Sort by:&nbsp;</label>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="relevance">Relevance</option>
            <option value="rating_desc">Rating: High to Low</option>
            <option value="eta_asc">Delivery Time</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
          </select>
          {sortBy.includes("asc") ? <SortAsc size={16}/> : sortBy.includes("desc") ? <SortDesc size={16}/> : null}
        </div>
      </div>

      <div className={cn("grid")}>
        {filtered.map(r => (
          <RestaurantCard key={r.id} r={r} />
        ))}
      </div>
    </div>
  );
}
