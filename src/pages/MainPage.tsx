import React, {useCallback, useEffect, useRef} from 'react';
import Categories from "../components/Categories/Categories";
import Sort from "../components/Sort/Sort";
import Skeleton from "../components/ItemCard/Skeleton";
import ItemCard from "../components/ItemCard/ItemCard";
import Pagination from "../components/Pagination/Pagination";
import {useSelector} from "react-redux";
import {filterSelector, setCategoryId,} from "../redux/slices/filterSlice";
import {EStatusLoading, fetchItemById, itemsSelector} from "../redux/slices/itemsSlice";

import {useAppDispatch} from "../redux/store";

const MainPage: React.FC = () => {
    const dispatch = useAppDispatch()
    const {search, categoryId, sortType, pageNumber} = useSelector(filterSelector)
    const {items, statusLoading} = useSelector(itemsSelector)
    const flagSearch = useRef(false) // flag для запроса с параметрами из начального состояния redux

    useEffect(() => {
        window.scrollTo(0, 0)
        if (!flagSearch.current) {
            (async () => {
                const categoryIdCurrent = categoryId > 0 ? `category=${categoryId}` : '';
                const searchValue = search ? `search=${search}` : '';
                dispatch(fetchItemById({categoryIdCurrent, searchValue, pageNumber: String(pageNumber), sortType}))
            })()
        }
        flagSearch.current = false;
    }, [categoryId, sortType, search, pageNumber, dispatch]);

// Оптимизирую вызов, теперь вызывается один раз при перерисовке
    const onClickCategory = useCallback((index: number) => {
        dispatch(setCategoryId(index))
    }, [dispatch])

    const skeleton = [...new Array(8)].map((_, index: number) => <Skeleton key={index}/>);
    const errorHeader = <h1 className='errorHeader'>Произошла ошибка, попробуйте повторить попытку позже!</h1>;
    const nothingFoundHeader = <h1 className='errorHeader'>По вашему запросу ничего не найдено. Повторите попытку!</h1>;
    const itemsDisplay = items.map((object) => <ItemCard key={object.id} {...object}/>);
    return (
        <div className="container">
            <div className="content__top">
                <Categories category={categoryId} onClickCategory={onClickCategory}/>
                <Sort/>
            </div>
            <h2 className="content__title">Все товары</h2>
            <div className="content__items">
                {
                    statusLoading === EStatusLoading.ERROR
                        ? errorHeader
                        : (statusLoading === EStatusLoading.LOADING
                                ? skeleton
                                : (statusLoading === EStatusLoading.SUCCESS && items.length !== 0
                                        ? itemsDisplay
                                        : nothingFoundHeader
                                )
                        )
                }
            </div>
            {
                items.length !== 0 ? <Pagination/> : ''
            }
        </div>
    );
};

export default MainPage;