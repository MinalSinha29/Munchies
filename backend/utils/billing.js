// backend/utils/billing.js
export function computeTotals(items, opts = {}) {
  // basic policies — tweak as you like
  const TAX_RATE = 0.05;             // 5% GST
  const DELIVERY_THRESHOLD = 500;     // free delivery ≥ ₹500
  const DELIVERY_FEE = 40;

  const subtotal = items.reduce((s, it) => s + it.price * it.qty, 0);
  const tax = Math.round(subtotal * TAX_RATE);
  const deliveryFee = subtotal >= DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE;

  // simple discount hook (for future coupons)
  const discount = Math.round(opts.discountAmount || 0);

  const total = Math.max(0, subtotal + tax + deliveryFee - discount);

  return { subtotal, tax, deliveryFee, discount, total };
}

export function invoiceNumber(orderId, createdAt = new Date()) {
  // e.g., INV-202511-ABC123
  const month = `${createdAt.getFullYear()}${String(createdAt.getMonth()+1).padStart(2,"0")}`;
  return `INV-${month}-${String(orderId).slice(-6).toUpperCase()}`;
}
