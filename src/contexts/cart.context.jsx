import { createContext, useReducer } from "react";

import { createAction } from "../utils/reducer/reducer.utils";

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

export const CART_ACTION_TYPES = {
  TOGGLE_CART_IS_OPEN: 'TOGGLE_CART_IS_OPEN',
  SET_CART_ITEMS: 'SET_CART_ITEMS',
}

const cartReducer = (state, action) => {
  const { type, payload } = action;

  switch(type) {
    case CART_ACTION_TYPES.TOGGLE_CART_IS_OPEN:
      return {
        ...state,
        isCartOpen: payload
      }
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        ...payload
      }
    default:
      throw new Error(`Unhandled type of ${type} in cartReducer`);
  }
}

const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartTotalItems: 0,
  totalAmount: 0,
}

export const CartProvider = ({ children }) => {
  const [ { isCartOpen, cartItems, cartTotalItems, totalAmount }, dispatch ] = useReducer(cartReducer, INITIAL_STATE);

  const updateCartItemsReducer = (newCartItems) => {
    const newCartCount = newCartItems.reduce((total, item) => total + item.quantity, 0);
    const newCartTotal = newCartItems.reduce((total, item) => total + (item.quantity * item.price), 0);

    dispatch(createAction(CART_ACTION_TYPES.SET_CART_ITEMS, { cartItems: newCartItems, cartTotalItems: newCartCount, totalAmount: newCartTotal }));
  }

  const setIsCartOpen = () => {
    dispatch(createAction(CART_ACTION_TYPES.TOGGLE_CART_IS_OPEN, !isCartOpen));
  }

  const addItemToCart = (productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    updateCartItemsReducer(newCartItems);
  }

  const removeItem = (cartItemToRemove) => {
    const newCartItems = removeCartItem(cartItems, cartItemToRemove);
    updateCartItemsReducer(newCartItems);
  }

  const clearItemFromCart = (cartItemToClear) => {
    const newCartItems = clearCartItem(cartItems, cartItemToClear);
    updateCartItemsReducer(newCartItems);
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
