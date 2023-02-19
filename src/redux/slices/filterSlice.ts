import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from "../store";

export enum ESortProperty {
    RATING = 'rating',
    PRICE = 'price',
    TITLE = 'title',
}

export type TSortType = {
    nameSort: string,
    sortProperty: ESortProperty,
}

export interface IFilterInitialState {
    search: string,
    categoryId: number,
    pageNumber: number,
    sortType: TSortType,
}

const initialState: IFilterInitialState = {
    search: '',
    categoryId: 0,
    pageNumber: 1,
    sortType: {
        nameSort: 'популярности',
        sortProperty: ESortProperty.RATING
    },
}

export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setSearch: (state, action: PayloadAction<string>) => {
            state.search = action.payload
        },
        setCategoryId: (state, action: PayloadAction<number>) => {
            state.categoryId = action.payload
        },
        setSortType: (state, action: PayloadAction<TSortType>) => {
            state.sortType = action.payload
        },
        setPageNumber: (state, action: PayloadAction<number>) => {
            state.pageNumber = action.payload
        },
        setFilters: (state, action: PayloadAction<IFilterInitialState>) => {
            state.sortType.nameSort = action.payload.sortType.nameSort
            state.sortType.sortProperty = action.payload.sortType.sortProperty
            state.pageNumber = Number(action.payload.pageNumber)
            state.categoryId = Number(action.payload.categoryId)
        },
    },
})
export const filterSelector = (state: RootState) => state.filterReducer;
export const {setCategoryId, setSortType, setPageNumber, setFilters, setSearch} = filterSlice.actions

export default filterSlice.reducer