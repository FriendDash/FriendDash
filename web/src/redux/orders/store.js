import { configureStore } from '@reduxjs/toolkit';
import ordersReducer from './reducer';

export const store = configureStore({
  reducer: {
    orders: ordersReducer,
  },
  devTools: true,
});
