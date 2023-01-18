import { compose, applyMiddleware } from 'redux';
import { configureStore } from '@reduxjs/toolkit';

import userReducer from './user/userSlice';
import categoriesReducer from './categories/categoriesSlice';
import cartReducer from './cart/cartSlice';

const middleWares = [];

const composedEnhancers = compose(applyMiddleware(...middleWares));

export const store = configureStore({
  reducer: {
    user: userReducer,
    categories: categoriesReducer,
    cart: cartReducer
  },
  enhancers: composedEnhancers
})