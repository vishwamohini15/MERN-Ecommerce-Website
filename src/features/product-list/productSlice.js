import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchAllproduct } from './productAPI';

const initialState = {
  products: [],
  status: 'idle',
};


export const fetchAllproductasync = createAsyncThunk(
  'product/fetchAllproduct',
  async () => {
    const response = await fetchAllproduct();
    //the value we return become the fulfilled action payload
    return response.data;
  }
);

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
   
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllproductasync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllproductasync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products = action.payload;
      });
  },
});

export const { increment } = productSlice.actions;

export const selectAllproducts = (state) => state.product.products;

export default productSlice.reducer;
