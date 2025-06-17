import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchAllproduct, fetchproductsByfilter } from './productAPI';

const initialState = {
  products: [],
  status: 'idle',
  totalItems:0
};


export const fetchAllproductasync = createAsyncThunk(
  'product/fetchAllproduct',
  async () => {
    const response = await fetchAllproduct();
    //the value we return become the fulfilled action payload
    return response.data;
  }
);

export const fetchproductsByFilterasync = createAsyncThunk(
  'product/fetchproductsByFilterasync',
  async ({filter, sort, pagination }) => {
    const response = await fetchproductsByfilter(filter, sort, pagination );
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
      })
       .addCase(fetchproductsByFilterasync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchproductsByFilterasync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products = action.payload.products;
        state.totalItems = action.payload.totalItems;

      });
  },
});

export const { increment } = productSlice.actions;

export const selectAllproducts = (state) => state.product.products;
export const selecttotalItems = (state) => state.product.totalItems;


export default productSlice.reducer;
