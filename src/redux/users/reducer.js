import { createSlice } from '@reduxjs/toolkit';
import { REQUEST_STATE } from '../utils';
import {
  addUserAsync,
  getUsersAsync,
  removeUserAsync,
  updateUserAsync,
  getUserByIdAsync
} from './thunk';

const INITIAL_STATE = {
  list: [],
  getUsers: REQUEST_STATE.IDLE,
  getUserById: REQUEST_STATE.IDLE,
  addUser: REQUEST_STATE.IDLE,
  removeUser: REQUEST_STATE.IDLE,
  updateUser: REQUEST_STATE.IDLE,
  error: null,
};

const usersSlice = createSlice({
  name: 'users',
  initialState: INITIAL_STATE,
  reducers: {
    sortUsers(state, action) {
      let sortedUserList = state.list.sort((a, b) => {
        if (a.title.toLowerCase() < b.title.toLowerCase()) return -1;
        if (a.title.toLowerCase() > b.title.toLowerCase()) return 1;
        else return 0;
      });
      state = sortedUserList;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getUsersAsync.pending, state => {
        state.getUsers = REQUEST_STATE.PENDING;
        state.error = null;
      })
      .addCase(getUsersAsync.fulfilled, (state, action) => {
        state.getUsers = REQUEST_STATE.FULFILLED;
        state.list = action.payload;
      })
      .addCase(getUsersAsync.rejected, (state, action) => {
        state.getUsers = REQUEST_STATE.REJECTED;
        state.error = action.error;
      })
      .addCase(getUserByIdAsync.pending, state => {
        state.getUserById = REQUEST_STATE.PENDING;
        state.error = null;
      })
      .addCase(getUserByIdAsync.fulfilled, (state, action) => {
        state.getUserById = REQUEST_STATE.FULFILLED;
      })
      .addCase(getUserByIdAsync.rejected, (state, action) => {
        state.getUserById = REQUEST_STATE.REJECTED;
        state.error = action.error;
      })
      .addCase(addUserAsync.pending, state => {
        state.addUser = REQUEST_STATE.PENDING;
        state.error = null;
      })
      .addCase(addUserAsync.fulfilled, (state, action) => {
        state.addUser = REQUEST_STATE.FULFILLED;
        state.list.push(action.payload);
      })
      .addCase(addUserAsync.rejected, (state, action) => {
        state.addUser = REQUEST_STATE.REJECTED;
        state.error = action.error;
      })
      .addCase(removeUserAsync.pending, state => {
        state.removeUser = REQUEST_STATE.PENDING;
        state.error = null;
      })
      .addCase(removeUserAsync.fulfilled, (state, action) => {
        state.removeUser = REQUEST_STATE.FULFILLED;
      })
      .addCase(removeUserAsync.rejected, (state, action) => {
        state.removeUser = REQUEST_STATE.REJECTED;
        state.error = action.error;
      })
      .addCase(updateUserAsync.pending, state => {
        state.updateUser = REQUEST_STATE.PENDING;
        state.error = null;
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.updateUser = REQUEST_STATE.FULFILLED;
        state.list = action.payload;
        //state.list.push(action.payload);
      })
      .addCase(updateUserAsync.rejected, (state, action) => {
        state.updateUser = REQUEST_STATE.REJECTED;
        state.error = action.error;
      });
  },
});

export default usersSlice.reducer;
export const {
  actions: { sortUsers },
} = usersSlice;