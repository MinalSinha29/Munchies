// frontend/src/App.js
import React, { useMemo, useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import Header from "./components/Header";
import Filters from "./components/Filters";
import RestaurantCard from "./components/RestaurantCard";
import Auth from "./pages/Auth";
import { SortAsc, SortDesc } from "lucide-react";
import cn from "classnames";
import RestaurantMenu from "./pages/RestaurantMenu";
import Cart from "./pages/Cart";
import Payment from "./pages/Payment";
import Success from "./pages/Success";
import MyOrders from "./pages/MyOrders"; // create this page if you want to view orders
import Bill from "./pages/Bill"; 

const SORTERS = {
  relevance: () => 0,
  rating_desc: (a, b) => b.rating - a.rating,
  eta_asc: (a, b) => a.eta - b.eta,
  price_asc: (a, b) => a.priceForTwo - b.priceForTwo,
  price_desc: (a, b) => b.priceForTwo - a.priceForTwo,
};

export default function App() {
  const [q, setQ] = useState("");
  const [selectedCats, setSelectedCats] = useState(new Set());
  const [priceBand, setPriceBand] = useState(null);
  const [vegOnly, setVegOnly] = useState(false);
  const [minRating, setMinRating] = useState(null);
  const [sortBy, setSortBy] = useState("relevance");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch restaurants from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/api/restaurants");
        setData(res.data);
      } catch (error) {
        console.error("Error fetching restaurants:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const categories = useMemo(() => {
    const s = new Set();
    data.forEach((r) => (r.categories || []).forEach((c) => s.add(c)));
    const preferred = [
      "Pizza", "Burger", "South Indian", "Biryani", "Sushi",
      "Quick Bites", "Veg Meals", "Mexican", "Casual Dining"
    ];
    const rest = [...s].filter((x) => !preferred.includes(x)).sort();
    return [...preferred.filter((x) => s.has(x)), ...rest];
  }, [data]);

  const applyToggleCat = (c) => {
    const copy = new Set(selectedCats);
    copy.has(c) ? copy.delete(c) : copy.add(c);
    setSelectedCats(copy);
  };

  const filtered = useMemo(() => {
    return data
      .filter((r) =>
        q.trim()
          ? (r.name + " " + (r.cuisines || []).join(" ") + " " + (r.categories || []).join(" "))
              .toLowerCase()
              .includes(q.toLowerCase())
          : true
      )
      .filter((r) => (vegOnly ? r.veg : true))
      .filter((r) => (minRating ? r.rating >= minRating : true))
      .filter((r) => {
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
      .filter((r) => {
        if (selectedCats.size === 0) return true;
        const tags = new Set([...(r.categories || []), ...(r.cuisines || [])]);
        for (const c of selectedCats) if (tags.has(c)) return true;
        return false;
      })
      .slice()
      .sort(SORTERS[sortBy]);
  }, [q, vegOnly, minRating, priceBand, selectedCats, sortBy, data]);

  return (
    <Router>
      <Header q={q} onQ={setQ} vegOnly={vegOnly} onVegOnly={setVegOnly} />

      <Routes>
        <Route path="/" element={
          <div className="container">
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
                {sortBy.includes("asc") ? <SortAsc size={16} /> : sortBy.includes("desc") ? <SortDesc size={16} /> : null}
              </div>
            </div>

            <div className={cn("grid")}>
              {loading ? (
                <p style={{ textAlign: "center", marginTop: "2rem" }}>🍽️ Loading restaurants...</p>
              ) : filtered.length > 0 ? (
                filtered.map((r) => <RestaurantCard key={r._id || r.id} r={r} />)
              ) : (
                <p style={{ textAlign: "center", marginTop: "2rem" }}>😔 No restaurants found.</p>
              )}
            </div>
          </div>
        } />

        <Route path="/auth" element={<Auth />} />
        <Route path="/restaurant/:id" element={<RestaurantMenu />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/success" element={<Success />} />
        <Route path="/my-orders" element={<MyOrders />} />
        <Route path="/order/:id" element={<Bill />} />  {/* ✅ NEW */}
      </Routes>

      <footer className="site-footer">
        <div className="container footer-grid">
          <div className="brand">M&M Munchies</div>
          <div>
            <div className="footer-title">Company</div>
            <a href="#!">About</a>
            <a href="#!">Careers</a>
            <a href="#!">Partner with us</a>
          </div>
          <div>
            <div className="footer-title">Legal</div>
            <a href="#!">Terms & Conditions</a>
            <a href="#!">Privacy Policy</a>
            <a href="#!">Cookie Policy</a>
          </div>
          <div>
            <div className="footer-title">Available in</div>
            <span>Mumbai • Pune • Delhi • Bangalore</span>
          </div>
        </div>
        <div className="container footer-bottom">© {new Date().getFullYear()} M&M Munchies</div>
      </footer>
    </Router>
  );
}
