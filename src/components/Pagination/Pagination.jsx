import PropTypes from "prop-types";
import ReactPaginate from "react-paginate";
import "./Pagination.scss";

export const Pagination = ({ pageCount, setItemOffset }) => {
  const handlePageClick = (event) => {
    setItemOffset(event.selected + 1);
  };

  return (
    <>
      <ReactPaginate
        breakLabel="..."
        onPageChange={handlePageClick}
        pageRangeDisplayed={2}
        marginPagesDisplayed={2}
        pageCount={pageCount}
        previousLabel={"←"}
        nextLabel={"→"}
        renderOnZeroPageCount={null}
        containerClassName="pagination"
        pageClassName="pagination__link"
        previousClassName="pagination__link"
        nextClassName="pagination__link"
        disabledClassName="pagination__link--disabled"
        activeClassName="pagination__link--active"
      />
    </>
  );
};

Pagination.propTypes = {
  pageCount: PropTypes.number,
  setItemOffset: PropTypes.func,
};
