import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers';

// Configure the Redux Store & Setup the Redux state
export const store = configureStore({ reducer: rootReducer });
