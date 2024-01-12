import React from 'react';
import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.scss'
import {setPageNumber} from "../../redux/slices/filterSlice";
import {useAppDispatch} from "../../redux/store";

const Pagination: React.FC = () => {
    const dispatch = useAppDispatch()
    return (
        <>
            <ReactPaginate className={styles.root}
                           breakLabel="..."
                           nextLabel=">"
                           onPageChange={event => dispatch(setPageNumber(event.selected + 1))}
                           pageRangeDisplayed={8}
                           pageCount={3}
                           previousLabel="<"
            />
        </>
    );
};

export default Pagination;