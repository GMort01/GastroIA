import React, { createContext, useMemo, useState } from 'react';

export const CartContext = createContext({
  cartItems: [],
  cartCount: 0,
  subtotal: 0,
  tip: 0,
  total: 0,
  addItem: () => {},
  removeItem: () => {},
  increaseQuantity: () => {},
  decreaseQuantity: () => {},
  setTip: () => {},
  clearCart: () => {},
});

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [tip, setTip] = useState(0);

  const addItem = (item) => {
    setCartItems((prevItems) => {
      const existing = prevItems.find((cartItem) => cartItem.id === item.id);
      if (existing) {
        return prevItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prevItems, { ...item, quantity: 1 }];
    });
  };

  const removeItem = (itemId) => {
    setCartItems((prevItems) => prevItems.filter((cartItem) => cartItem.id !== itemId));
  };

  const increaseQuantity = (itemId) => {
    setCartItems((prevItems) =>
      prevItems.map((cartItem) =>
        cartItem.id === itemId ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
      )
    );
  };

  const decreaseQuantity = (itemId) => {
    setCartItems((prevItems) =>
      prevItems
        .map((cartItem) =>
          cartItem.id === itemId
            ? { ...cartItem, quantity: Math.max(1, cartItem.quantity - 1) }
            : cartItem
        )
        .filter((cartItem) => cartItem.quantity > 0)
    );
  };

  const clearCart = () => {
    setCartItems([]);
    setTip(0);
  };

  const subtotal = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.precio * item.quantity, 0),
    [cartItems]
  );

  const total = useMemo(() => subtotal + tip, [subtotal, tip]);

  const cartCount = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems]
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        subtotal,
        tip,
        total,
        addItem,
        removeItem,
        increaseQuantity,
        decreaseQuantity,
        setTip,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
