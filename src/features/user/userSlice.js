import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchCount } from './counterAPI';
import { fetchLoggedInUserOrders } from './userAPI';

const initialState = {
  userOrders: [],
  status: 'idle',
};


export const fetchloggedInUserorderAsync = createAsyncThunk(
  'counter/fetchLoggedInUserOrders',
  async (amount) => {
    const response = await fetchLoggedInUserOrders(amount);
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
        state.userOrders = action.payload;
      });
  },
});

export const { increment } = counterSlice.actions;


export default counterSlice.reducer;
