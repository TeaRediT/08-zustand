import ReactPaginate from "react-paginate";
import css from "./Pagination.module.css";
import type { Dispatch, SetStateAction } from "react";

interface PaginationProps {
  totalPages: number;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
}

const Pagination = ({ totalPages, page, setPage }: PaginationProps) => {
  return (
    <ReactPaginate
      pageCount={totalPages}
      pageRangeDisplayed={5}
      marginPagesDisplayed={1}
      onPageChange={({ selected }) => setPage(selected + 1)}
      forcePage={page - 1}
      containerClassName={css.pagination}
      activeClassName={css.active}
      nextLabel="→"
      previousLabel="←"
    />
  );
};

export default Pagination;
