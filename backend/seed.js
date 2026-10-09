// backend/seed.js
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import Restaurant from "./models/Restaurant.js";
import restaurants from "./data/restaurantsSeed.js";
import dishDetails from "./data/dishDetails.js";

dotenv.config();

const slug = (s) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

// Adds itemId + dish details (veg, spice, category, ingredients, allergens...)
export function enrichRestaurants(list) {
  return list.map((r) => ({
    ...r,
    menu: r.menu.map((dish) => {
      const details = dishDetails[dish.name];
      if (!details) {
        throw new Error(`Missing details for dish "${dish.name}" (${r.id}) in data/dishDetails.js`);
      }
      return {
        itemId: `${r.id}__${slug(dish.name)}`,
        name: dish.name,
        price: dish.price,
        ...details,
      };
    }),
  }));
}

const run = async () => {
  try {
    await connectDB();
    const enriched = enrichRestaurants(restaurants);
    await Restaurant.deleteMany();
    await Restaurant.insertMany(enriched);
    const dishes = enriched.reduce((n, r) => n + r.menu.length, 0);
    console.log(`✅ Seeded ${enriched.length} restaurants with ${dishes} dishes`);
    process.exit();
  } catch (err) {
    console.error("❌ Seeding error:", err.message);
    process.exit(1);
  }
};

// only run when called directly: node seed.js
if (process.argv[1] && process.argv[1].endsWith("seed.js")) run();
