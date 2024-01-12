import React, {useEffect, useRef, useState} from 'react';
import {useDebounce} from "use-debounce";
import {setSearch} from "../../redux/slices/filterSlice"
import {useAppDispatch} from "../../redux/store";
import SearchIcon from "./icons/SearchIcon";
import Cancel from "./icons/Cancel";

import styles from './Search.module.scss'

const Search: React.FC = () => {
    const dispatch = useAppDispatch()
    const [searchLocal, setSearchLocal] = useState('')

    const inputRef = useRef<HTMLInputElement>(null)
    const [value] = useDebounce(searchLocal, 500)

    useEffect(() => {
        dispatch(setSearch(value))
    }, [value, dispatch])

    const onClickCancel = () => {
        dispatch(setSearch(''))
        setSearchLocal('')
        inputRef.current?.focus()
    }
    return (
        <div className={styles.root}>
            <div className={styles.icon}>
                <SearchIcon />
            </div>
            <input
                ref={inputRef}
                value={searchLocal}
                className={styles.input} placeholder='Поиск . . .'
                onChange={(event) => setSearchLocal(event.target.value)}
            >
            </input>
            {searchLocal &&
                <div onClick={onClickCancel} className={styles.cancel}>
                    <Cancel />
                </div>
            }
        </div>
    );
};

export default Search;
