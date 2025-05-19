import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    console.log("Adding to cart:", product);
  
    if (!product.id) {
      console.warn("Product missing ID:", product);
      return;
    }
  
    setCart((prev) => {
      const existingIndex = prev.findIndex(item => item.id === product.id);
      if (existingIndex !== -1) {
        const updatedCart = [...prev];
        updatedCart[existingIndex].quantity += 1;
        return updatedCart;
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };
  

  const removeFromCart = (productIndex) => {
    setCart((prev) => prev.filter((_, index) => index !== productIndex));
  };

  const clearCart = () => {
    setCart([]);
  };

  const increaseQuantity = (index) => {
    setCart((prev) => {
      const updated = [...prev];
      updated[index].quantity += 1;
      return updated;
    });
  };

  const decreaseQuantity = (index) => {
    setCart((prev) => {
      const updated = [...prev];
      if (updated[index].quantity > 1) {
        updated[index].quantity -= 1;
      } else {
        updated.splice(index, 1); // remove item if quantity hits 0
      }
      return updated;
    });
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        increaseQuantity,
        decreaseQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
