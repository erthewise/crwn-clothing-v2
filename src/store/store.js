import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { 
  persistReducer, 
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import logger from 'redux-logger'
import storage from 'redux-persist/lib/storage'

import userReducer from './user/userSlice';
import categoryReducer from './categories/categorySlice';
import cartReducer from './cart/cartSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart']
}

const rootReducer = combineReducers({
  user: userReducer,
  category: categoryReducer,
  cart: cartReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      }})
    .concat(logger),
})

export const persistor = persistStore(store);