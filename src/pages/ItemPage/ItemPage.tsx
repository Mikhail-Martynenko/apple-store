import React, {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import styles from './ItemPage.module.scss'

const ItemPage: React.FC = () => {
    const {id} = useParams()
    const navigate = useNavigate()
    const [dataItem, setDataItem] = useState<{
        imageUrl: string,
        title: string,
        price: number
    }>()

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get(`https://63e65191c8839ccc2855cf42.mockapi.io/apple-products/${id}`)
                const data = response.data;
                setDataItem(data)
            } catch (error) {
                alert('Ошибка при получении товара')
                navigate('/')
            }
        })()
    }, [id, navigate])

    if (!dataItem) return <h4 className={styles.item__title}>Loading...</h4>;

    return (
        <>
            <div className={styles.item}>
                <h4 className={styles.item__title}>{dataItem.title}</h4>
                <img
                    className={styles.item__image}
                    src={dataItem.imageUrl}
                    alt="item"
                />
                <Link to='/' className="button button--outline button--add go-back-btn">
                    <span>Вернуться назад</span>
                </Link>
            </div>
        </>
    );
};

export default ItemPage;