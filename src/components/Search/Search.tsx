import React, {useEffect, useRef, useState} from 'react';
import styles from './Search.module.scss'
import {useDebounce} from "use-debounce";
import {useDispatch} from "react-redux";
import {setSearch} from "../../redux/slices/filterSlice"

const Search: React.FC = () => {
    const dispatch = useDispatch()
    const [searchLocal, setSearchLocal] = useState('')

    const inputRef = useRef<HTMLInputElement>(null)
    // Оптимизируем запросы на сервер
    const [value] = useDebounce(searchLocal, 500)

    useEffect(() => {
        dispatch(setSearch(value))
    }, [value, dispatch])

    // Кнопка сброса символов поиска
    const onClickCancel = () => {
        dispatch(setSearch(''))
        setSearchLocal('')
        inputRef.current?.focus()
    }
    return (
        <div className={styles.root}>
            <svg className={styles.icon} x="0px" y="0px"
                 width="32" height="32"
                 viewBox="0 0 48 48">
                <path fill="#616161" d="M34.6 28.1H38.6V45.1H34.6z" transform="rotate(-45.001 36.586 36.587)"></path>
                <path fill="#616161" d="M20 4A16 16 0 1 0 20 36A16 16 0 1 0 20 4Z"></path>
                <path fill="#37474F" d="M36.2 32.1H40.2V44.400000000000006H36.2z"
                      transform="rotate(-45.001 38.24 38.24)"></path>
                <path fill="#64B5F6" d="M20 7A13 13 0 1 0 20 33A13 13 0 1 0 20 7Z"></path>
                <path fill="#BBDEFB"
                      d="M26.9,14.2c-1.7-2-4.2-3.2-6.9-3.2s-5.2,1.2-6.9,3.2c-0.4,0.4-0.3,1.1,0.1,1.4c0.4,0.4,1.1,0.3,1.4-0.1C16,13.9,17.9,13,20,13s4,0.9,5.4,2.5c0.2,0.2,0.5,0.4,0.8,0.4c0.2,0,0.5-0.1,0.6-0.2C27.2,15.3,27.2,14.6,26.9,14.2z"></path>
            </svg>
            <input
                ref={inputRef}
                value={searchLocal}
                className={styles.input} placeholder='Поиск . . .'
                onChange={(event) => setSearchLocal(event.target.value)}
            >
            </input>
            {searchLocal &&
                <svg onClick={onClickCancel} className={styles.cancel} xmlns="http://www.w3.org/2000/svg" x="0px"
                     y="0px"
                     width="32" height="32"
                     viewBox="0 0 48 48">
                    <path fill="#F44336" d="M21.5 4.5H26.501V43.5H21.5z" transform="rotate(45.001 24 24)"></path>
                    <path fill="#F44336" d="M21.5 4.5H26.5V43.501H21.5z" transform="rotate(135.008 24 24)"></path>
                </svg>
            }
        </div>
    );
};

export default Search;