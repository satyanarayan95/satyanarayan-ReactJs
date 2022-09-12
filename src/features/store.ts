import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./product/productSlice";
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, productSlice)

export const store = configureStore({
    reducer: {
        persistedReducer
    }
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch