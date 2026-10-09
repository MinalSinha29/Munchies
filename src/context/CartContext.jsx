import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

// Items are identified by itemId (names can repeat across restaurants).
export const keyOf = (item) => item.itemId || item.name;

export function CartProvider({ children }) {
  // 🟢 Load cart from localStorage when app starts
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("munchies-cart");
    const parsed = saved ? JSON.parse(saved) : [];
    // drop old cart items saved before itemId existed
    return parsed.filter((i) => i.itemId);
  });

  // 🟢 Whenever cart changes, save to localStorage
  useEffect(() => {
    localStorage.setItem("munchies-cart", JSON.stringify(cart));
  }, [cart]);

  // 🟠 Add item or increase quantity
  const addToCart = (item) => {
    setCart((prev) => {
      const existing = prev.find((i) => keyOf(i) === keyOf(item));
      if (existing) {
        return prev.map((i) =>
          keyOf(i) === keyOf(item) ? { ...i, qty: i.qty + 1 } : i
        );
      } else {
        return [...prev, { ...item, qty: 1 }];
      }
    });
  };

  // 🔵 Decrease quantity
  const decreaseQty = (itemKey) => {
    setCart((prev) =>
      prev
        .map((i) =>
          keyOf(i) === itemKey ? { ...i, qty: i.qty - 1 } : i
        )
        .filter((i) => i.qty > 0)
    );
  };

  // 🔴 Remove item completely
  const removeFromCart = (itemKey) => {
    setCart((prev) => prev.filter((i) => keyOf(i) !== itemKey));
  };

  // 🟢 Clear the cart
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("munchies-cart");
  };

  // 💰 Calculate total
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        decreaseQty,
        removeFromCart,
        clearCart,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
