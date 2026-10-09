// backend/routes/orderRoutes.js
import express from "express";
import Order from "../models/Order.js";
import Restaurant from "../models/Restaurant.js";
import { protect } from "../middleware/authMiddleware.js";
import { computeTotals } from "../utils/billing.js";
import { buildOrderItems } from "../utils/orderItems.js";

const router = express.Router();

/**
 * POST /api/orders
 * Create a new order (login required).
 * The browser only sends { items: [{ itemId, qty }], paymentMethod }.
 * Names, prices and totals are calculated here on the server.
 */
router.post("/", protect, async (req, res) => {
  try {
    const { items: cartItems, paymentMethod } = req.body;

    if (!Array.isArray(cartItems) || cartItems.length === 0) {
      return res.status(400).json({ message: "No items in order" });
    }

    const itemIds = cartItems.map((i) => i?.itemId).filter(Boolean);
    const restaurants = await Restaurant.find({ "menu.itemId": { $in: itemIds } });

    const { items, error } = buildOrderItems(cartItems, restaurants);
    if (error) return res.status(400).json({ message: error });

    const totals = computeTotals(items);

    const order = await Order.create({
      user: req.user._id,
      items,
      paymentMethod: paymentMethod || "Unknown",
      ...totals,
    });

    res.status(201).json({ message: "✅ Order placed successfully", order });
  } catch (err) {
    console.error("💥 Error creating order:", err);
    res.status(500).json({ message: "Error placing order", error: err.message });
  }
});

/**
 * GET /api/orders/mine
 * Return orders for the current user (JWT required)
 */
router.get("/mine", protect, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    console.error("💥 Error fetching user's orders:", err);
    res.status(500).json({ message: "Error fetching orders" });
  }
});

/**
 * GET /api/orders/:id
 * Fetch a single order by id (for bill page). Only the owner can see it.
 */
router.get("/:id", protect, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });
    if (!order.user || String(order.user) !== String(req.user._id)) {
      return res.status(403).json({ message: "Not allowed to view this order" });
    }
    res.json(order);
  } catch (err) {
    console.error("💥 Error fetching order by id:", err);
    res.status(500).json({ message: "Error fetching order" });
  }
});

export default router;
