// backend/models/Order.js
import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
  itemId: String, // links to the menu item (needed for recommendations)
  name: String,
  price: Number, // unit price at the time of order
  qty: Number,
  restaurantId: String,
  restaurantName: String,
  category: String,
  veg: Boolean,
});

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
    items: [orderItemSchema],
    paymentMethod: { type: String, default: "Unknown" },

    // computed & persisted totals (calculated on server)
    subtotal: { type: Number, default: 0 },
    tax: { type: Number, default: 0 },
    deliveryFee: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    total: { type: Number, default: 0 }, // grand total
    status: { type: String, default: "placed" },

    // true for generated demo orders (see scripts/seedSampleOrders.js)
    isSample: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
