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

// const totalItems = (cartItems) => {
//   return cartItems.map((item) => item.quantity).reduce((total, itemQuantity) => total + itemQuantity);
// }

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  cartTotalItems: 0,
})

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartTotalItems, setCartTotalItems] = useState(0);
  
  const addItemToCart = (productToAdd) => {
    setCartItems(() => {
      const items = addCartItem(cartItems, productToAdd);
      setCartTotalItems(items.reduce((total, item) => total + item.quantity, 0));
    return items;
    });
  }

  

  const value = { isCartOpen, setIsCartOpen, cartItems, addItemToCart, cartTotalItems, };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
