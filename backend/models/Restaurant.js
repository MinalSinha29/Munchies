// backend/models/Restaurant.js
import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true }, // keep your frontend id
  name: String,
  cuisines: [String],
  categories: [String],
  priceForTwo: Number,
  rating: Number,
  veg: Boolean,
  eta: Number,
  menu: [{ name: String, price: Number }]
}, { timestamps: true });

const Restaurant = mongoose.model("Restaurant", restaurantSchema);
export default Restaurant;
