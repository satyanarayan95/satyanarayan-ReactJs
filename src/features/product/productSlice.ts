import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export type prod = {
  _id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  avatar: string;
  developerEmail: string;
  favourited: boolean;
};

export interface CounterState {
  products: prod[];
  loading: boolean;
  error: string;
}

const initialState: CounterState = {
  products: [],
  loading: false,
  error: "",
};

export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async () => {
    const url: string = process.env.REACT_APP_BASE_URL as string;
    const token: string = process.env.REACT_APP_AUTH_BEARER as string;
    const res = await axios.get(`${url}/api/products`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const { products } = res.data;
    return products;
  }
);

export const productSlice = createSlice({
  name: "Product",
  initialState,
  reducers: {
    AddFavourites: (state, action: PayloadAction<string>) => {
      const arr = state.products.map((p) => {
        if (p._id === action.payload)
          return { ...p, favourited: !p.favourited };
        return p;
      });
      state.products = arr;
    },
    RemoveProduct: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter((p) => {
        return p._id !== action.payload;
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchProducts.fulfilled,
        (state, action: PayloadAction<prod[]>) => {
          state.loading = false;
          state.products = action.payload;
        }
      )
      .addCase(fetchProducts.rejected, (state) => {
        state.error = "Encountered Error while fetching product data";
      });
  },
});

export const { AddFavourites, RemoveProduct } = productSlice.actions;

export default productSlice.reducer;
