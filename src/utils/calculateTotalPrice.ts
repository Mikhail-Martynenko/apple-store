import {TCartItem} from "../redux/slices/cartSlice";

export const calculateTotalPrice = (products: TCartItem[]) => {
  return products.reduce((sum, object) => object.price * object.count + sum, 0)
}