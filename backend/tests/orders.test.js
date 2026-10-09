// Run with: npm test   (inside the backend folder)
import test from "node:test";
import assert from "node:assert/strict";
import { buildOrderItems } from "../utils/orderItems.js";
import { computeTotals } from "../utils/billing.js";
import { enrichRestaurants } from "../seed.js";
import restaurants from "../data/restaurantsSeed.js";

const data = enrichRestaurants(restaurants);

test("every dish gets a unique itemId and details", () => {
  const ids = data.flatMap((r) => r.menu.map((d) => d.itemId));
  assert.equal(new Set(ids).size, ids.length);
  for (const r of data) {
    for (const d of r.menu) {
      assert.ok(d.description && d.ingredients.length > 0, `${d.name} needs details`);
    }
  }
});

test("buildOrderItems takes name and price from the database, not the browser", () => {
  const { items, error } = buildOrderItems(
    [{ itemId: "dominos__margherita-pizza", qty: 2, price: 1, name: "hacked" }],
    data
  );
  assert.equal(error, undefined);
  assert.equal(items[0].name, "Margherita Pizza");
  assert.equal(items[0].price, 250);
  assert.equal(items[0].restaurantId, "dominos");
});

test("buildOrderItems rejects unknown items and bad quantities", () => {
  assert.ok(buildOrderItems([{ itemId: "nope", qty: 1 }], data).error);
  assert.ok(buildOrderItems([{ itemId: "dominos__margherita-pizza", qty: 0 }], data).error);
  assert.ok(buildOrderItems([{ itemId: "dominos__margherita-pizza", qty: 99 }], data).error);
  assert.ok(buildOrderItems([], data).error);
});

test("buildOrderItems merges duplicate lines", () => {
  const { items } = buildOrderItems(
    [
      { itemId: "kfc__french-fries", qty: 1 },
      { itemId: "kfc__french-fries", qty: 2 },
    ],
    data
  );
  assert.equal(items.length, 1);
  assert.equal(items[0].qty, 3);
});

test("computeTotals: 5% GST, delivery fee 40 under 500, free from 500", () => {
  assert.deepEqual(computeTotals([{ price: 200, qty: 1 }]), {
    subtotal: 200, tax: 10, deliveryFee: 40, discount: 0, total: 250,
  });
  assert.equal(computeTotals([{ price: 250, qty: 2 }]).deliveryFee, 0);
});

import { generateSampleData } from "../scripts/seedSampleOrders.js";

test("sample data: users, orders, valid items, repeatable", () => {
  const a = generateSampleData(data, { seed: 1, now: new Date("2026-10-01") });
  const b = generateSampleData(data, { seed: 1, now: new Date("2026-10-01") });
  assert.equal(a.users.length, 48);
  assert.ok(a.orders.length > 48 * 4);
  assert.deepEqual(a.orders[0].items, b.orders[0].items);
  assert.ok(a.orders.every((o) => o.total > 0 && o.items.length > 0 && o.isSample));
  const emails = new Set(a.users.map((u) => u.email));
  assert.equal(emails.size, 48);
});
