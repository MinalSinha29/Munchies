// backend/seed.js
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import Restaurant from "./models/Restaurant.js";
import restaurants from "./data/restaurantsSeed.js";

dotenv.config();

const run = async () => {
  try {
    await connectDB();
    await Restaurant.deleteMany();
    await Restaurant.insertMany(restaurants);
    console.log("✅ Seeded restaurants");
    process.exit();
  } catch (err) {
    console.error("❌ Seeding error:", err.message);
    process.exit(1);
  }
};

run();
