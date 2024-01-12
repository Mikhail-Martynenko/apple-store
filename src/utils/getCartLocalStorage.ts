import {calculateTotalPrice} from "./calculateTotalPrice";
import {TCartItem} from "../redux/slices/cartSlice";

export const getCartLocalStorage = () => {
    const data = sessionStorage.getItem('cart');
    const products = data ? JSON.parse(data) : [];
    const totalPrice = calculateTotalPrice(products)
    return {
        products: products as TCartItem[],
        totalPrice,
    }
};
