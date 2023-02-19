import React from "react";
import {Link} from "react-router-dom";

const CartEmpty: React.FC = () => {
    return (
        <>
            <div className="cart cart--empty">
                <h2>Корзина пустая </h2>
                <p>
                    Вероятней всего, вы не сделали заказ.<br/>
                    Вернитесь на главную страницу для добавления товаров в корзину.
                </p>
                <Link to="/" className="button button--black">
                    <span>К покупкам!</span>
                </Link>
            </div>
        </>
    );
};
export default CartEmpty;