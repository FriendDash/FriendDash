import { combineReducers, configureStore } from '@reduxjs/toolkit';
import ordersReducer from './orders/reducer';
import usersReducer from './users/reducer';

const reducer = combineReducers({
  orders: ordersReducer,
  users: usersReducer,
})
export const store = configureStore({
  reducer: {
    reducer
  },
  devTools: true,
});
