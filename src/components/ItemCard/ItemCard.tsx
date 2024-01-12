import React, {useState} from 'react';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {addProduct, TCartItem, cartSelectorByItemId, minusProduct} from "../../redux/slices/cartSlice";

import styles from "./ItemCard.module.scss"

export type TItemCardProps = {
    id: string;
    imageUrl: string;
    title: string;
    types: number[];
    sizes: number[];
    price: number;
}

const ItemCard: React.FC<TItemCardProps> = ({id, imageUrl, title, types, sizes, price}) => {
    const typeNames = ['dual-SIM', 'eSIM'];
    const [activeType, setActiveType] = useState(0)
    const [activeSize, setActiveSize] = useState(0)

    const cartProduct = useSelector(cartSelectorByItemId(id))

    const dispatch = useDispatch()

    const addedCount = cartProduct ? cartProduct.count : 0;

    const onClickAdd = () => {
        const product: TCartItem = {
            id,
            title,
            price,
            imageUrl,
            type: typeNames[activeType],
            size: sizes[activeSize],
            count: 0,
        }
        dispatch(addProduct(product))
    }
    const onClickRemove = () => {
        if (addedCount > 0) {
            dispatch(minusProduct(id))
        }
    }

    return (
        <div className={styles.itemBlock}>
            <Link to={`/apple-store/item/${id}`}>
                <img className={styles.itemBlock__image} src={imageUrl} alt="apple"/>
            </Link>
            <h4 className={styles.itemBlock__title}>{title}</h4>
            <div className={styles.itemBlock__selector}>
                <ul>
                    {types.map((type, index) => <li key={type} onClick={() => setActiveType(index)}
                                                    className={activeType === index ? `${styles.active}` : ''}>{typeNames[type]}</li>)}
                </ul>
                <ul className="active">
                    {sizes.map((size, index) => <li key={size} onClick={() => setActiveSize(index)}
                                                    className={activeSize === index ? `${styles.active}` : ''}>{size} ГБ</li>)}
                </ul>
                <div className={styles.itemBlock__price}>{price} ₽</div>
            </div>
            <div className={styles.itemBlock__bottom}>
                <button onClick={onClickAdd} className="button button--outline button--add">
                    <span>В корзину</span>
                    {addedCount > 0 && <i>{addedCount}</i>}
                </button>
                {addedCount > 0 &&
                    <button onClick={onClickRemove} className="button button--outline button--add">
                        <span>Удалить</span>
                    </button>
                }
            </div>
        </div>
    );
};
export default ItemCard;
