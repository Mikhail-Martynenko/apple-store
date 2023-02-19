import React from 'react';
import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.scss'
import {useDispatch} from "react-redux";
import {setPageNumber} from "../../redux/slices/filterSlice";

const Pagination: React.FC = () => {
    const dispatch = useDispatch()
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