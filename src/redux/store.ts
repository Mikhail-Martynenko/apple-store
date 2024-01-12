import { configureStore } from '@reduxjs/toolkit'
import filterReducer from './slices/filterSlice'
import cartReducer from './slices/cartSlice'
import itemsReducer from './slices/itemsSlice'
import {useDispatch} from "react-redux";
export const store = configureStore({
    reducer: {
        filterReducer,
        cartReducer,
        itemsReducer,
    },
})

export type TAppDispatch = typeof store.dispatch
export const useAppDispatch: () => TAppDispatch = useDispatch

export type RootState = ReturnType<typeof store.getState>
