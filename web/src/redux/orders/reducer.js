import { createSlice } from '@reduxjs/toolkit';
import { REQUEST_STATE } from './utils';
import {
  addOrderAsync,
  getOrdersAsync,
  removeOrderAsync,
  updateOrderAsync,
} from './thunk';

const INITIAL_STATE = {
  list: [],
  getOrders: REQUEST_STATE.IDLE,
  addOrder: REQUEST_STATE.IDLE,
  removeOrder: REQUEST_STATE.IDLE,
  updateOrder: REQUEST_STATE.IDLE,
  error: null,
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState: INITIAL_STATE,
  reducers: {
    sortOrders(state, action) {
      let sortedOrderList = state.list.sort((a, b) => {
        if (a.title.toLowerCase() < b.title.toLowerCase()) return -1;
        if (a.title.toLowerCase() > b.title.toLowerCase()) return 1;
        else return 0;
      });
      state = sortedOrderList;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getOrdersAsync.pending, state => {
        state.getOrders = REQUEST_STATE.PENDING;
        state.error = null;
      })
      .addCase(getOrdersAsync.fulfilled, (state, action) => {
        state.getOrders = REQUEST_STATE.FULFILLED;
        state.list = action.payload;
      })
      .addCase(getOrdersAsync.rejected, (state, action) => {
        state.getOrders = REQUEST_STATE.REJECTED;
        state.error = action.error;
      })
      .addCase(addOrderAsync.pending, state => {
        state.addOrder = REQUEST_STATE.PENDING;
        state.error = null;
      })
      .addCase(addOrderAsync.fulfilled, (state, action) => {
        state.addOrder = REQUEST_STATE.FULFILLED;
        state.list.push(action.payload);
      })
      .addCase(addOrderAsync.rejected, (state, action) => {
        state.addOrder = REQUEST_STATE.REJECTED;
        state.error = action.error;
      })
      .addCase(removeOrderAsync.pending, state => {
        state.removeOrder = REQUEST_STATE.PENDING;
        state.error = null;
      })
      .addCase(removeOrderAsync.fulfilled, (state, action) => {
        state.removeOrder = REQUEST_STATE.FULFILLED;
      })
      .addCase(removeOrderAsync.rejected, (state, action) => {
        state.removeOrder = REQUEST_STATE.REJECTED;
        state.error = action.error;
      })
      .addCase(updateOrderAsync.pending, state => {
        state.updateOrder = REQUEST_STATE.PENDING;
        state.error = null;
      })
      .addCase(updateOrderAsync.fulfilled, (state, action) => {
        state.updateOrder = REQUEST_STATE.FULFILLED;
        state.list = action.payload;
        //state.list.push(action.payload);
      })
      .addCase(updateOrderAsync.rejected, (state, action) => {
        state.updateOrder = REQUEST_STATE.REJECTED;
        state.error = action.error;
      });
  },
});

export default ordersSlice.reducer;
export const {
  actions: { sortOrders },
} = ordersSlice;
