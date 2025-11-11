import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchCount, fetchLoggedInUser, updateUser } from './userAPI';
import { fetchLoggedInUserOrders } from './userAPI';
// import { updateUserAsync } from '../auth/authSlice';

const initialState = {
  status: 'idle',
  userinfo: null,  //this info will be used in case of detailed user info, while auth will
  //only be used for loggedinuer id etc checks. 
};


export const fetchloggedInUserorderAsync = createAsyncThunk(
  'counter/fetchLoggedInUserOrders',
  async (id) => {
    const response = await fetchLoggedInUserOrders(id);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);


export const fetchLoggedInUserAsyc = createAsyncThunk(
  'counter/fetchLoggedInUser',
  async (id) => {
    const response = await fetchLoggedInUser(id);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const updateUserAsync = createAsyncThunk(
  'counter/updateUser',
  async (update) => {
    const response = await updateUser(update);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);


export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchloggedInUserorderAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchloggedInUserorderAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        //this info can be diffrentor more from logged in user info
        state.userinfo.orders = action.payload;
      })
        .addCase(updateUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.userinfo=action.payload;
      })
       .addCase(fetchLoggedInUserAsyc.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLoggedInUserAsyc.fulfilled, (state, action) => {
        state.status = 'idle';
        //this info can be diffrentor more from logged in user info
        state.userinfo = action.payload;
      })
  },
});

export const selectUserOrders=(state)=>state.user.userinfo.orders;
export const selectUserInfo=(state)=>state.user.userinfo;

export const { increment } = userSlice.actions;


export default userSlice.reducer;
