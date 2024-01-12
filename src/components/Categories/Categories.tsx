import React, {memo} from 'react';
import styles from './Categories.module.scss'

type TCategoriesProps = {
    category: number;
    onClickCategory: (index: number) => void;
}

const Categories: React.FC<TCategoriesProps> = ({category, onClickCategory}) => {
    const categories: string[] = ['Все', 'iPhone 14', 'iPhone 13', 'iPhone 12', 'iPhone 11']

    return (
        <div className={styles.categories}>
            <h2 className='content__title'>Модель</h2>
            <ul>
                {categories.map((element, index) => {
                    return <li key={element} onClick={() => onClickCategory(index)}
                               className={category === index ? `${styles.active}` : ''}>{element}</li>
                })}
            </ul>
        </div>
    );
}

export default memo(Categories);
