// backend/controllers/orderController.js
import Order from "../models/Order.js";

export const createOrder = async (req, res) => {
  const { items, total, paymentMethod } = req.body;
  try {
    const order = await Order.create({
      user: req.user._id,
      items,
      total,
      paymentMethod,
    });
    res.status(201).json({ message: "Order placed", orderId: order._id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
