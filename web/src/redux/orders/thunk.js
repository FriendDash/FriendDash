import { createAsyncThunk } from '@reduxjs/toolkit';
import { actionTypes } from './actionTypes';
import { addOrder, getOrders, removeOrder, updateOrder } from './service';

export const getOrdersAsync = createAsyncThunk(
  actionTypes.GET_ORDERS,
  async () => {
    return await getOrders();
  }
);

export const addOrderAsync = createAsyncThunk(
  actionTypes.ADD_ORDER,
  async order => {
    return await addOrder(order);
  }
);

export const updateOrderAsync = createAsyncThunk(
  actionTypes.UPDATE_ORDER,
  async (order, { dispatch }) => {
    await updateOrder(order);
    await dispatch(getOrdersAsync());
  }
);

export const removeOrderAsync = createAsyncThunk(
  actionTypes.REMOVE_ORDER,
  async (_id, { dispatch }) => {
    await removeOrder(_id);
    await dispatch(getOrdersAsync());
  }
);
