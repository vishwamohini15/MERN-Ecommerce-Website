import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {fetchproductsByfilter, fetchBrands, fetchCategory, fetchproductById, createProduct, updateProduct } from './productAPI';

const initialState = {
  products: [],
  brands:[],
  categories:[],
  status: 'idle',
  totalItems:0,
  selectedProduct:null,
};




export const fetchproductByIDasync = createAsyncThunk(
  'product/fetchproductById',
  async (id) => {
    const response = await fetchproductById(id);
    //the value we return become the fulfilled action payload
    return response.data;
  }
);

export const fetchproductsByFilterasync = createAsyncThunk(
  'product/fetchproductsByfilter',
  async ({filter, sort, pagination, admin}) => {
    const response = await fetchproductsByfilter(filter, sort, pagination, admin);
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

// X-Total-Count
export const createProductAsync = createAsyncThunk(
  'product/createProduct',
  async (product) => {
    const response = await createProduct(product);
    return response.data;
  }
);


export const updateProductAsync = createAsyncThunk(
  'product/updateProduct',
  async (update) => {
    const response = await updateProduct(update);
    return response.data;
  }
);



export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    clearSelectedproduct:(state)=>{
      state.selectedProduct=null
    }
  },
  extraReducers: (builder) => {
    builder
    
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
       .addCase(fetchproductByIDasync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchproductByIDasync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.selectedProduct = action.payload;
      })
       .addCase(createProductAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createProductAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products.push(action.payload)
      })
       .addCase(updateProductAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateProductAsync.fulfilled, (state, action) => {
        state.status = 'idle';
       const index=state.products.findIndex(
        (product) =>product.id===action.payload.id
      )
        state.products[index]= action.payload
      })
  },
});

export const { clearSelectedproduct } = productSlice.actions;

export const selectAllproducts = (state) => state.product.products;
export const selectBrands = (state) => state.product.brands;
export const selectCategories = (state) => state.product.categories;
export const selectProductById = (state) => state.product.selectedProduct;

export const selecttotalItems = (state) => state.product.totalItems;


export default productSlice.reducer;
