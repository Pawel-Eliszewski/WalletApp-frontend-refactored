import PropTypes from "prop-types";
import { useState } from "react";
import ReactPaginate from "react-paginate";
/**
 * @param {{ isMobile: boolean, transactionsFilters: boolean,
 * pageCount?: number, onItemOffsetChange?: () => void }} props
 */
export const Pagination = ({
  isMobile,
  transactionsFilters,
  pageCount,
  onItemOffsetChange,
}) => {
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
    onItemOffsetChange(event.selected + 1);
  };

  return (
    <>
      <ReactPaginate
        breakLabel="..."
        onPageChange={handlePageClick}
        pageRangeDisplayed={isMobile ? 0 : 1}
        marginPagesDisplayed={isMobile ? 0 : 1}
        pageCount={pageCount}
        previousLabel={<span className="pagination-arrow">&#8592;</span>}
        nextLabel={<span className="pagination-arrow">&#8594;</span>}
        containerClassName={
          transactionsFilters
            ? "pagination pagination--reset-btn"
            : "pagination"
        }
        previousClassName="pagination__link pagination__link--outermost"
        nextClassName="pagination__link pagination__link--outermost"
        breakClassName="pagination__link"
        pageClassName="pagination__link"
        disabledClassName="pagination__link--disabled"
        activeClassName="pagination__link--active"
        forcePage={currentPage}
      />
    </>
  );
};

Pagination.propTypes = {
  isMobile: PropTypes.bool.isRequired,
  transactionsFilters: PropTypes.bool.isRequired,
  pageCount: PropTypes.number,
  onItemOffsetChange: PropTypes.func,
};
