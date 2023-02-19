import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from "axios";
import {TSortType} from "./filterSlice";
import {RootState} from "../store";

type TItem = {
    id: string,
    title: string,
    imageUrl: string,
    price: number,
    rating: number,
    sizes: number[],
    types: number[]
}
export type TSearchItemParams = {
    categoryIdCurrent: string,
    searchValue: string,
    pageNumber: string,
    sortType: TSortType
}

export enum EStatusLoading {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error',
}

interface IItemsInitialState {
    items: TItem[],
    statusLoading: EStatusLoading
}

// Создаю асинхронный экшен (action) и делаю запрос // Возвращаемый тип CartItem[], типизирую params Record<string, string>
export const fetchItemById = createAsyncThunk<TItem[], TSearchItemParams>('items/fetchByIdStatus', async (params) => {
        const {categoryIdCurrent, searchValue, pageNumber, sortType} = params;
        const response = await axios.get(`https://63e65191c8839ccc2855cf42.mockapi.io/apple-products?page=${pageNumber}&limit=8&${categoryIdCurrent}${searchValue}&sortBy=${sortType.sortProperty}&order=asc`);
        return response.data;
    }
)

const initialState: IItemsInitialState = {
    items: [],
    statusLoading: EStatusLoading.LOADING
}
export const itemsSlice = createSlice({
    name: 'items',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchItemById.pending, (state) => {
            state.statusLoading = EStatusLoading.LOADING;
            state.items = [];

        });
        builder.addCase(fetchItemById.fulfilled, (state, action) => {
            state.statusLoading = EStatusLoading.SUCCESS;
            state.items = action.payload;

        });
        builder.addCase(fetchItemById.rejected, (state) => {
            state.statusLoading = EStatusLoading.ERROR;
            state.items = [];
        });
    }
})
export const itemsSelector = (state: RootState) => state.itemsReducer

export default itemsSlice.reducer