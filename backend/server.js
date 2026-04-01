// backend/server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import restaurantRoutes from "./routes/restaurantRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

dotenv.config();
connectDB();

const app = express();

// ✅ Middlewares
app.use(cors());
app.use(express.json());

// ✅ Routes
app.use("/api/restaurants", restaurantRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);

// ✅ Root route
app.get("/", (req, res) => {
  res.send("🍽️ M&M Munchies API is running successfully!");
});

// ✅ 404 handler (optional but clean)
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// ✅ Global error handler (optional)
app.use((err, req, res, next) => {
  console.error("💥 Server Error:", err.stack);
  res.status(500).json({ message: "Something went wrong on the server" });
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on port ${PORT}`)
);
