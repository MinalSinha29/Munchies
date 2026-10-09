// backend/models/Restaurant.js
import mongoose from "mongoose";

const menuItemSchema = new mongoose.Schema(
  {
    itemId: { type: String, required: true }, // e.g. "dominos__margherita-pizza"
    name: { type: String, required: true },
    price: { type: Number, required: true },
    veg: { type: Boolean, default: true },
    spiceLevel: { type: Number, min: 0, max: 3, default: 0 }, // 0 = mild, 3 = very spicy
    category: String, // Pizza, Burger, Dessert, Beverage...
    description: String,
    ingredients: [String],
    allergens: [String],
  },
  { _id: false }
);

const restaurantSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true }, // keep your frontend id
    name: String,
    cuisines: [String],
    categories: [String],
    priceForTwo: Number,
    rating: Number,
    veg: Boolean,
    eta: Number,
    menu: [menuItemSchema],
  },
  { timestamps: true }
);

const Restaurant = mongoose.model("Restaurant", restaurantSchema);
export default Restaurant;
