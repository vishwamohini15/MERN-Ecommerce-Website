import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchAllproduct, fetchproductsByfilter, fetchBrands, fetchCategory, fetchproductById } from './productAPI';

const initialState = {
  products: [],
  brands:[],
  categories:[],
  status: 'idle',
  totalItems:0,
  selectedProduct:null,
};


export const fetchAllproductasync = createAsyncThunk(
  'product/fetchAllproduct',
  async () => {
    const response = await fetchAllproduct();
    //the value we return become the fulfilled action payload
    return response.data;
  }
);

export const fetchAllproductByIDasync = createAsyncThunk(
  'product/fetchproductById',
  async (id) => {
    const response = await fetchproductById(id);
    //the value we return become the fulfilled action payload
    return response.data;
  }
);

export const fetchproductsByFilterasync = createAsyncThunk(
  'product/fetchproductsByfilter',
  async ({filter, sort, pagination }) => {
    const response = await fetchproductsByfilter(filter, sort, pagination );
    //the value we return become the fulfilled action payload
    return response.data;
  }
);

export const fetchBrandasync = createAsyncThunk(
  'product/fetchBrands',
  async () => {
    const response = await fetchBrands();
    //the value we return become the fulfilled action payload
    return response.data;
  }
);

export const fetchCategoryasync = createAsyncThunk(
  'product/fetchCategory',
  async () => {
    const response = await fetchCategory();
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

      })
      .addCase(fetchBrandasync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBrandasync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.brands = action.payload;
      })
      .addCase(fetchCategoryasync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategoryasync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.categories = action.payload;
      })
       .addCase(fetchAllproductByIDasync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllproductByIDasync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.selectedProduct = action.payload;
      })
  },
});

export const { increment } = productSlice.actions;

export const selectAllproducts = (state) => state.product.products;
export const selectBrands = (state) => state.product.brands;
export const selectCategories = (state) => state.product.categories;
export const selectProductById = (state) => state.product.selectedProduct;

export const selecttotalItems = (state) => state.product.totalItems;


export default productSlice.reducer;
