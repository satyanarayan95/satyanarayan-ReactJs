import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export type prod = {
  _id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  avatar: string;
  developerEmail: string;
  favourited: boolean;
}

export interface CounterState {
  products:prod[]
  loading: boolean
  error: string
}

const initialState: CounterState = {
  products: [],
  loading: false,
  error: ""
};

  const baseUrl =
    "https://upayments-studycase-api.herokuapp.com/api/products";
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNhdHlhbmFyYXlhbi5wYXRyYTU0OTVAZ21haWwuY29tIiwiZ2l0aHViIjoiaHR0cHM6Ly9naXRodWIuY29tL3NhdHlhbmFyYXlhbjk1IiwiaWF0IjoxNjYyOTAxNjc2LCJleHAiOjE2NjMzMzM2NzZ9.A1r2qm2zFI1196yR9nb9NTHnUtptgfppOIBe-EbxlFk";
  

export const fetchProducts = createAsyncThunk(
  'product/fetchProducts',
  async () => {
    const res = await axios.get(baseUrl, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const { products } = res.data;
    return products;
  }
);

export const productSlice = createSlice({
  name: 'Product',
  initialState,
  reducers: {
    AddFavourites: (state, action:PayloadAction<string>) => {
      const arr = state.products.map(p => {
        if(p._id === action.payload) return {...p, favourited:!p.favourited}
        return p;
      })
      state.products = arr;
    },
    RemoveProduct: (state, action:PayloadAction<string>) => {
      state.products = state.products.filter(p => {
        return p._id !== action.payload;
      })
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action:PayloadAction<prod[]>) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.error = "Encountered Error while fetching product data";
      });
  },
});

export const { AddFavourites, RemoveProduct } = productSlice.actions;

export default productSlice.reducer;
