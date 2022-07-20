import { createAsyncThunk } from '@reduxjs/toolkit';
import { actionTypes } from './actionTypes';
import {
  addUser,
  getUsers,
  removeUser,
  updateUser,
  getUserById,
} from './service';

export const getUsersAsync = createAsyncThunk(
  actionTypes.GET_USERS,
  async () => {
    return await getUsers();
  }
);

// get by googleID
export const getUserByIdAsync = createAsyncThunk(
  actionTypes.GET_USER_BY_ID,
  async googleID => {
    return await getUserById(googleID);
  }
);

export const addUserAsync = createAsyncThunk(
  actionTypes.ADD_USER,
  async user => {
    return await addUser(user);
  }
);

export const updateUserAsync = createAsyncThunk(
  actionTypes.UPDATE_USER,
  async (user, { dispatch }) => {
    await updateUser(user);
    await dispatch(getUsersAsync());
  }
);

export const removeUserAsync = createAsyncThunk(
  actionTypes.REMOVE_USER,
  async (_id, { dispatch }) => {
    await removeUser(_id);
    await dispatch(getUsersAsync());
  }
);
