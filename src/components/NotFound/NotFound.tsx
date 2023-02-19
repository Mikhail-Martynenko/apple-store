import React from 'react';
import styles from "./NotFound.module.scss"
import {Link} from "react-router-dom";

const NotFound: React.FC = () => {
    return (
        <div className={styles.root}>
            <h1>
                Такой страницы не существует
            </h1>
            <Link to='/'>
                <button className={styles.btn}>Вернуться на главную страницу</button>
            </Link>
        </div>
    );
};
export default NotFound;