import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {ESortProperty, filterSelector, setSortType} from "../../redux/slices/filterSlice";
import styles from "./Sort.module.scss"

type ArraySorts = {
    nameSort: string;
    sortProperty: ESortProperty;
}
export const arraySorts: ArraySorts[] = [
    {nameSort: 'популярности', sortProperty: ESortProperty.RATING},
    {nameSort: 'возрастанию цены', sortProperty: ESortProperty.PRICE},
    {nameSort: 'алфавиту', sortProperty: ESortProperty.TITLE},
]
const Sort: React.FC =() => {
    const [isVisibleSort, setIsVisibleSort] = useState(false)
    const dispatch = useDispatch()
    const {sortType} = useSelector(filterSelector)

    const divRef = useRef<HTMLDivElement>(null)

    const onClickSort = (objectSort: ArraySorts) => {
        dispatch(setSortType(objectSort))
        setIsVisibleSort(false)
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (divRef.current && !event.composedPath().includes(divRef.current)) {
                setIsVisibleSort(false)
            }
        };

        document.body.addEventListener('click', handleClickOutside);

        return () => document.body.removeEventListener('click', handleClickOutside);
    }, []);

    return (
        <div ref={divRef} className={styles.sort}>
            <div className={styles.sort__label}>
                <b>Сортировка по:</b>
                <span
                    onClick={() => setIsVisibleSort(!isVisibleSort)}>{sortType.nameSort}</span>
            </div>
            {isVisibleSort &&
                <div className={styles.sort__popup}>
                    <ul>
                        {arraySorts.map((objectSort, index) =>
                            <li key={index}
                                onClick={() => onClickSort(objectSort)}
                                className={sortType.sortProperty === objectSort.sortProperty ? `${styles.active}` : ''}>{objectSort.nameSort}
                            </li>)}
                    </ul>
                </div>
            }
        </div>
    );
};
export default Sort;