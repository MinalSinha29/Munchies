// backend/scripts/seedSampleOrders.js
// Creates SAMPLE users and orders so the recommendation and analytics phases
// have data to work with. These are generated demo records, not real customers.
//
//   npm run seed        (menu must be seeded first)
//   npm run seed:orders
//
// Safe to re-run: it deletes the previous sample data first.
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import connectDB from "../config/db.js";
import User from "../models/User.js";
import Order from "../models/Order.js";
import Restaurant from "../models/Restaurant.js";
import { buildOrderItems } from "../utils/orderItems.js";
import { computeTotals } from "../utils/billing.js";

dotenv.config();

export const SAMPLE_PASSWORD = "Sample@123";
export const SAMPLE_EMAIL_DOMAIN = "@munchies.test";

// Small seeded random generator, so every run gives the same data.
function makeRng(seed) {
  let a = seed;
  return () => {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Each persona = a taste. Users get one persona, so patterns exist to be found.
const PERSONAS = [
  { name: "south-indian-veg", likes: (d) => d.veg && ["South Indian", "Breakfast", "Snack", "Beverage"].includes(d.category) },
  { name: "pizza-lover", likes: (d) => d.veg && ["Pizza", "Sides", "Beverage", "Dessert"].includes(d.category) },
  { name: "fast-food-nonveg", likes: (d) => ["Burger", "Sides", "Snack", "Beverage"].includes(d.category) && (!d.veg || d.category === "Sides") },
  { name: "north-indian", likes: (d) => ["Main Course", "Bread", "Rice", "Dessert", "Biryani"].includes(d.category) },
  { name: "asian", likes: (d) => ["Sushi", "Starter", "Soup", "Rice"].includes(d.category) },
  { name: "mexican", likes: (d) => ["Tacos", "Bowl", "Snack", "Beverage"].includes(d.category) },
];

/**
 * Pure function (no database): builds the sample users and orders in memory.
 * @param {Array} restaurants  restaurant documents (plain objects) with menus
 * @param {{usersPerPersona?: number, seed?: number, now?: Date}} opts
 */
export function generateSampleData(restaurants, opts = {}) {
  const { usersPerPersona = 8, seed = 42, now = new Date() } = opts;
  const rng = makeRng(seed);
  const pick = (arr) => arr[Math.floor(rng() * arr.length)];
  const allDishes = restaurants.flatMap((r) => r.menu.map((d) => ({ ...d, restaurantId: r.id })));

  const users = [];
  const orders = [];
  let n = 0;

  for (const persona of PERSONAS) {
    const liked = allDishes.filter(persona.likes);
    for (let u = 0; u < usersPerPersona; u++) {
      n += 1;
      const userKey = `sample${n}`;
      users.push({ key: userKey, name: `Sample User ${n}`, email: `${userKey}${SAMPLE_EMAIL_DOMAIN}`, persona: persona.name });

      const orderCount = 4 + Math.floor(rng() * 9); // 4-12 orders
      for (let o = 0; o < orderCount; o++) {
        const lines = [];
        const dishCount = 1 + Math.floor(rng() * 3); // 1-3 dishes
        for (let k = 0; k < dishCount; k++) {
          const dish = rng() < 0.85 ? pick(liked) : pick(allDishes); // a little noise
          lines.push({ itemId: dish.itemId, qty: 1 + Math.floor(rng() * 2) });
        }
        const { items } = buildOrderItems(lines, restaurants);
        const totals = computeTotals(items);
        const daysAgo = Math.floor(rng() * 90);
        const createdAt = new Date(now.getTime() - daysAgo * 86400000 - Math.floor(rng() * 86400000));
        orders.push({
          userKey,
          items,
          paymentMethod: pick(["UPI", "Credit/Debit Card", "Cash on Delivery"]),
          ...totals,
          status: "placed",
          isSample: true,
          createdAt,
          updatedAt: createdAt,
        });
      }
    }
  }
  return { users, orders };
}

const run = async () => {
  try {
    if (process.env.NODE_ENV === "production") throw new Error("Refusing to create sample data in production");
    await connectDB();

    const restaurants = await Restaurant.find().lean();
    if (!restaurants.length || !restaurants[0].menu?.[0]?.itemId) {
      throw new Error("Menu not seeded with item ids yet. Run `npm run seed` first.");
    }

    // clear previous sample data
    await Order.deleteMany({ isSample: true });
    await User.deleteMany({ email: new RegExp(`${SAMPLE_EMAIL_DOMAIN.replace(".", "\\.")}$`) });

    const { users, orders } = generateSampleData(restaurants);
    const passwordHash = bcrypt.hashSync(SAMPLE_PASSWORD, 10); // insertMany skips the pre-save hook
    const created = await User.insertMany(
      users.map((u) => ({ name: u.name, email: u.email, password: passwordHash, address: "Sample address, Mumbai" }))
    );
    const idByKey = new Map(users.map((u, i) => [u.key, created[i]._id]));

    await Order.insertMany(
      orders.map(({ userKey, ...o }) => ({ ...o, user: idByKey.get(userKey) })),
      { timestamps: false }
    );

    console.log(`✅ Created ${created.length} sample users and ${orders.length} sample orders`);
    console.log(`   Sample login: ${users[0].email} / ${SAMPLE_PASSWORD}`);
    process.exit();
  } catch (err) {
    console.error("❌ Sample data error:", err.message);
    process.exit(1);
  }
};

if (process.argv[1] && process.argv[1].endsWith("seedSampleOrders.js")) run();
