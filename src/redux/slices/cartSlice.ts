import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from "../store";
import {getCartLocalStorage} from "../../utils/getCartLocalStorage";
import {calculateTotalPrice} from "../../utils/calculateTotalPrice";

export type TCartItem = {
    id: string,
    title: string,
    price: number,
    imageUrl: string,
    type: string,
    size: number,
    count: number,
}

 interface ICartInitialState {
    totalPrice: number,
    products: TCartItem[],
}

const {totalPrice, products} = getCartLocalStorage()

const initialState: ICartInitialState = {
    totalPrice,
    products,
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addProduct: (state, action: PayloadAction<TCartItem>) => {
            const findItem = state.products.find((object) => object.id === action.payload.id)
            if (findItem) {
                findItem.count++;
            } else {
                state.products.push({...action.payload, count: 1,});
            }
            state.totalPrice = calculateTotalPrice(state.products)
        },
        removeProduct: (state, action: PayloadAction<TCartItem>) => {
            state.products = state.products.filter(object => object.id !== action.payload.id);
            state.totalPrice -= action.payload.price * action.payload.count

        },
        minusProduct: (state, action: PayloadAction<string>) => {
            const findItem = state.products.find(object => object.id === action.payload);
            if (findItem) {
                findItem.count--;
                state.totalPrice -= findItem.price
            }
        },

        clearProducts: (state) => {
            state.products = [];
            state.totalPrice = 0;
        },
    },
})

export const cartSelector = (state: RootState) => state.cartReducer;
export const cartSelectorByItemId = (id: string) => (state: RootState) => state.cartReducer.products.find(obj => obj.id === id);
export const {addProduct, removeProduct, clearProducts, minusProduct} = cartSlice.actions

export default cartSlice.reducer