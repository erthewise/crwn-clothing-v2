import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isCartOpen: false,
  cartItems: [],
  cartTotalItems: 0,
  totalAmount: 0,
}

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

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    toggleIsCartOpen: (state, action) => {
      state.isCartOpen = action.payload
    },
    addItemToCart: (state, action) => {
      const newCartItems = addCartItem(state.cartItems, action.payload);
      state.cartItems = newCartItems;
    },
    removeItem: (state, action) => {
      const newCartItems = removeCartItem(state.cartItems, action.payload);
      state.cartItems = newCartItems;
    },
    clearItemFromCart: (state, action) => {
      const newCartItems = clearCartItem(state.cartItems, action.payload);
      state.cartItems = newCartItems;
    },
    calculateCartTotals: (state) => {
      let newCartCount = 0;
      let newCartTotal = 0;

      state.cartItems.forEach((item) => {
        newCartCount += item.quantity;
        newCartTotal += item.quantity * item.price;
      });

      state.cartTotalItems = newCartCount;
      state.totalAmount = newCartTotal;
    },
    resetCart: () => initialState
  }
})


export const { toggleIsCartOpen, setCartItems, calculateCartTotals, addItemToCart, removeItem, clearItemFromCart, resetCart } = cartSlice.actions;

export default cartSlice.reducer;