import React, {useEffect, useRef} from 'react';
import logo from "../../assets/img/logo.svg"
import {Link, useLocation} from "react-router-dom";
import Search from "../Search/Search";
import {useSelector} from "react-redux";
import {cartSelector, TCartItem} from "../../redux/slices/cartSlice";
import CartIcon from "./icons/CartIcon";

import styles from './Header.module.scss'

const Header = () => {
    const location = useLocation()
    const {totalPrice, products} = useSelector(cartSelector)
    const totalCount = products.reduce((acc: number, product: TCartItem) => acc + product.count, 0)
    const firstRender = useRef(false)

    useEffect(() => {
        if (firstRender.current) {
            const json = JSON.stringify(products)
            sessionStorage.setItem('cart', json)
        }
        firstRender.current = true
    }, [products])

    return (
        <div className={styles.header}>
            <div className={styles.container}>
                <Link to='/apple-store'>
                    <div className={styles.header__logo}>
                        <img width="52" src={logo} alt="Logo"/>
                        <div>
                            <h1>Apple store</h1>
                        </div>
                    </div>
                </Link>
                {location.pathname !== '/apple-store/cart' && <Search/>}
                <Link to="/apple-store/cart" className="button button--cart">
                    <span>{totalPrice} ₽</span>
                    <div className="button__delimiter"></div>
                    <CartIcon />
                    <span>{totalCount}</span>
                </Link>
            </div>
        </div>
    );
};

export default Header;