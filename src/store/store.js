import { compose, applyMiddleware } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';

import userReducer from './user/userSlice';
import categoriesReducer from './categories/categoriesSlice';

const middleWares = [];

const composedEnhancers = compose(applyMiddleware(...middleWares));

export const store = configureStore({
  reducer: {
    user: userReducer,
    categories: categoriesReducer
  },
  enhancers: composedEnhancers
})