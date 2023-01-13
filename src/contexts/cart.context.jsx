import { useEffect } from "react";
import { createContext, useState } from "react";

const addCartItem = (cartItems, productToAdd) => {
  const itemExists = cartItems.find((item) => item.id === productToAdd.id)

  if (itemExists) {
    return cartItems.map((item) => item.id === productToAdd.id
      ? { ...item, quantity: item.quantity + 1 }
      : item
    );
  } else {
    return [...cartItems, {...productToAdd, quantity: 1}];
  }
}

const removeCartItem = (cartItems, productToRemove) => {
  const existingCartItem = cartItems.find((item) => item.id === productToRemove.id)
 
  if (existingCartItem.quantity === 1) {
    return cartItems.filter((item) => item.id !== productToRemove.id)
  }

  return cartItems.map((item) => item.id === productToRemove.id
      ? { ...item, quantity: item.quantity - 1 }
      : item
  )
}

const clearCartItem = (cartItems, cartItemToClear) => {
  return cartItems.filter((item) => item.id !== cartItemToClear.id);
}

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  cartTotalItems: 0,
  removeItem: () => {},
  totalAmount: 0,
})

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartTotalItems, setCartTotalItems] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  
  useEffect(() => {
    const newCartCount = cartItems.reduce(
      (total, item) => total + item.quantity, 0);
    setCartTotalItems(newCartCount)
  }, [cartItems])

  useEffect(() => {
    const newTotal = cartItems.reduce(
      (total, item) => total + (item.quantity * item.price), 0);
    setTotalAmount(newTotal)
  }, [cartItems])

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };

  const removeItem = (productToRemove) => {
    setCartItems(removeCartItem(cartItems, productToRemove));
  };

  const clearItemFromCart = (cartItemToClear) => {
    setCartItems(clearCartItem(cartItems, cartItemToClear))
  }

  const value = { 
    isCartOpen, 
    setIsCartOpen, 
    cartItems, 
    addItemToCart,
    cartTotalItems,
    removeItem,
    totalAmount,
    clearItemFromCart
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
