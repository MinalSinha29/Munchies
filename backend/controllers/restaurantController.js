// backend/controllers/restaurantController.js
import Restaurant from "../models/Restaurant.js";

export const getRestaurants = async (req, res) => {
  try {
    const list = await Restaurant.find();
    res.json(list);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
