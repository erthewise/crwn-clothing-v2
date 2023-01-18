import { compose, applyMiddleware, combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'

import userReducer from './user/userSlice';
import categoriesReducer from './categories/categoriesSlice';
import cartReducer from './cart/cartSlice';

const middleWares = [];

const composedEnhancers = compose(applyMiddleware(...middleWares));

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['user']
}

const rootReducer = combineReducers({
  user: userReducer,
  categories: categoriesReducer,
  cart: cartReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  enhancers: composedEnhancers
})

export const persistor = persistStore(store);