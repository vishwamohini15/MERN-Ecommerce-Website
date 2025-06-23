import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addTocart, deleteItemFormCart, fetchItemsByUserId, updateCart } from './cartAPI';

const initialState = {
  status: 'idle',
  items: [],
};


export const addTocartAsync = createAsyncThunk(
  'cart/addTocart',
  async (item) => {
    const response = await addTocart(item);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const fetchitemsByUserIdAsync = createAsyncThunk(
  'cart/fetchItemsByUserId',
  async (userId) => {
    const response = await fetchItemsByUserId(userId);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const updatecartAsync = createAsyncThunk(
  'cart/updateCart',
  async (update) => {
    const response = await updateCart(update);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const deleteItemFromCartAsync = createAsyncThunk(
  'cart/deleteItemFormCart',
  async (itemId) => {
    const response = await deleteItemFormCart(itemId);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const counterSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addTocartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addTocartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items.push(action.payload);
      })
      .addCase(fetchitemsByUserIdAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchitemsByUserIdAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items= action.payload
      })
      .addCase(updatecartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updatecartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index=state.items.findIndex(item=>item.id===action.payload.id)
        state.items[index]= action.payload
      })
       .addCase(deleteItemFromCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteItemFromCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index=state.items.findIndex(item=>item.id===action.payload.id)
        state.items.splice(index,1)
      })
  },
});

export const { increment } = counterSlice.actions;

export const selectitems = (state) => state.cart.items;

export default counterSlice.reducer;
