import React from "react";
import ReactPaginate from "react-paginate";

import styles from "./Pagination.module.scss";

function Pagination({ itemsPerPage, amount, changePage }) {
  const [pageCount, setPageCount] = React.useState(0);
  const [itemOffset, setItemOffset] = React.useState(0);

  React.useEffect(() => {
    setPageCount(Math.ceil(amount / itemsPerPage));
  }, [itemOffset, itemsPerPage, amount]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % amount;
    setItemOffset(newOffset);
    changePage(event.selected + 1);
  };

  return (
    <div className={styles.root}>
      <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        pageCount={pageCount}
        previousLabel="<"
        renderOnZeroPageCount={null}
        activeClassName={styles.selected}
      />
    </div>
  );
}

export default Pagination;
