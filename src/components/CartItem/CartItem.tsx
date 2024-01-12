import React, {useEffect} from 'react';

import {useDispatch} from "react-redux";
import {addProduct, minusProduct, removeProduct, TCartItem} from "../../redux/slices/cartSlice";

import Minus from "./Icons/Minus";
import Plus from "./Icons/Plus";
import Cross from "./Icons/Cross";

type TCartItemProps = {
    id: string,
    title: string,
    price: number,
    imageUrl: string,
    type: number[],
    size: number[],
    count: number,
}
const CartItem: React.FC<TCartItemProps> = ({id, title, price, imageUrl, type, size, count}) => {
    const dispatch = useDispatch()

    const onClickAddProduct = () => {
        dispatch(addProduct({id} as TCartItem))
    }

    const onClickRemoveProduct = () => {
        if (count > 0) {
            dispatch(minusProduct(id))
        }
    }
    const onClickRemove = () => {
        dispatch(removeProduct({id, price, count} as TCartItem))
    }

    useEffect(() => {
        if (count === 0) {
            dispatch(removeProduct({id, price, count} as TCartItem))
        }
    }, [id, price, count, dispatch])
    return (
        <div className="cart__item">
            <div className="cart__item-img">
                <img className="item-block__image" src={imageUrl} alt="apple" />
            </div>
            <div className="cart__item-info">
                <h3>{title}</h3>
                <p>{type}, {size} ГБ</p>
            </div>
            <div className="cart__item-count">
                <button onClick={onClickRemoveProduct}
                        className="button button--outline button--circle cart__item-count-minus">
                    <Minus/>
                </button>
                <b>{count}</b>
                <button
                    onClick={onClickAddProduct}
                    className="button button--outline button--circle cart__item-count-plus">
                    <Plus/>
                </button>
            </div>
            <div className="cart__item-price">
                <b>{price * count} ₽</b>
            </div>
            <div className="cart__item-remove">
                <div onClick={onClickRemove} className="button button--outline button--circle">
                    <Cross/>
                </div>
            </div>
        </div>
    );
};

export default CartItem;
