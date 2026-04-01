// backend/routes/orderRoutes.js
import express from "express";
import Order from "../models/Order.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * POST /api/orders
 * Create a new order (guest or logged-in)
 */
router.post("/", async (req, res) => {
  try {
    console.log("📦 New Order Request:", req.body);

    const { user, items, total, paymentMethod } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "No items in order" });
    }
    if (!total || total <= 0) {
      return res.status(400).json({ message: "Invalid total amount" });
    }

    const order = await Order.create({
      user: user || null,
      items,
      total,
      paymentMethod: paymentMethod || "Unknown",
    });

    console.log("✅ Order saved:", order._id);
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
 * Fetch a single order by id (for bill page)
 * (You can add `protect` + ownership checks later)
 */
router.get("/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (err) {
    console.error("💥 Error fetching order by id:", err);
    res.status(500).json({ message: "Error fetching order" });
  }
});

export default router;
