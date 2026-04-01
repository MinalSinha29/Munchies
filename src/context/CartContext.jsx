import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  // 🟢 Load cart from localStorage when app starts
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("munchies-cart");
    return saved ? JSON.parse(saved) : [];
  });

  // 🟢 Whenever cart changes, save to localStorage
  useEffect(() => {
    localStorage.setItem("munchies-cart", JSON.stringify(cart));
  }, [cart]);

  // 🟠 Add item or increase quantity
  const addToCart = (item) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.name === item.name);
      if (existing) {
        return prev.map((i) =>
          i.name === item.name ? { ...i, qty: i.qty + 1 } : i
        );
      } else {
        return [...prev, { ...item, qty: 1 }];
      }
    });
  };

  // 🔵 Decrease quantity
  const decreaseQty = (itemName) => {
    setCart((prev) =>
      prev
        .map((i) =>
          i.name === itemName ? { ...i, qty: i.qty - 1 } : i
        )
        .filter((i) => i.qty > 0)
    );
  };

  // 🔴 Remove item completely
  const removeFromCart = (itemName) => {
    setCart((prev) => prev.filter((i) => i.name !== itemName));
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
