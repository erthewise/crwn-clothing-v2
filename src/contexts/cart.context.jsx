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

const incrementDecrement = (cartItems, product, process) => {
  if (process === 'decrement' && product.quantity === 1) {
    return removeCartItem(cartItems, product);
  } else if (process === 'decrement' && product.quantity > 1) {
    return cartItems.map((item) => item.id === product.id
      ? { ...item, quantity: item.quantity -1 }
      : item
    )
  } else {
    return cartItems.map((item) => item.id === product.id
      ? { ...item, quantity: item.quantity + 1 }
      : item
    )
  } 
}

const removeCartItem = (cartItems, productToRemove) => {
  const indexToRemove = cartItems.map((item) => item.id).indexOf(productToRemove.id);
  return cartItems.filter((item, index) => index !== indexToRemove);
}

// const totalItems = (cartItems) => {
//   return cartItems.map((item) => item.quantity).reduce((total, itemQuantity) => total + itemQuantity);
// }

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  cartTotalItems: 0,
  incrementItem: () => {},
  decerementItem: () => {},
  removeItem: () => {}
})

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartTotalItems, setCartTotalItems] = useState(0);
  
  useEffect(() => {
    const newCartCount = cartItems.reduce(
      (total, item) => total + item.quantity, 0);
    setCartTotalItems(newCartCount)
  }, [cartItems])

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };

  const incrementItem = (product) => {
    const process = 'increment';
    setCartItems(incrementDecrement(cartItems, product, process));
  }

  const decrementItem = (product) => {
    const process = 'decrement';
    setCartItems(incrementDecrement(cartItems, product, process));
  }

  const removeItem = (productToRemove) => {
    setCartItems(removeCartItem(cartItems, productToRemove));
  };

  

  const value = { 
    isCartOpen, 
    setIsCartOpen, 
    cartItems, 
    addItemToCart,
    cartTotalItems, 
    incrementItem, 
    decrementItem, 
    removeItem 
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
