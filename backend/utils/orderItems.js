// backend/utils/orderItems.js
// Turns the cart sent by the browser into trusted order items.
// Names and prices always come from the database, never from the browser.

export const MAX_QTY_PER_ITEM = 20;

/**
 * @param {Array<{itemId: string, qty: number}>} cartItems  from the request body
 * @param {Array} restaurants  restaurant documents that contain those items
 * @returns {{ items?: Array, error?: string }}
 */
export function buildOrderItems(cartItems, restaurants) {
  if (!Array.isArray(cartItems) || cartItems.length === 0) {
    return { error: "No items in order" };
  }

  // itemId -> { restaurant, dish }
  const lookup = new Map();
  for (const r of restaurants) {
    for (const dish of r.menu) lookup.set(dish.itemId, { r, dish });
  }

  const merged = new Map(); // merge duplicate lines of the same item
  for (const line of cartItems) {
    const qty = Number(line?.qty);
    if (!line?.itemId || !Number.isInteger(qty) || qty < 1 || qty > MAX_QTY_PER_ITEM) {
      return { error: "Invalid item or quantity in order" };
    }
    if (!lookup.has(line.itemId)) {
      return { error: `Unknown menu item: ${line.itemId}` };
    }
    merged.set(line.itemId, (merged.get(line.itemId) || 0) + qty);
  }

  const items = [];
  for (const [itemId, qty] of merged) {
    const { r, dish } = lookup.get(itemId);
    items.push({
      itemId,
      name: dish.name,
      price: dish.price,
      qty,
      restaurantId: r.id,
      restaurantName: r.name,
      category: dish.category,
      veg: dish.veg,
    });
  }
  return { items };
}
