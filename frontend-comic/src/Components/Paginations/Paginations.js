import classNames from "classnames/bind";
import styles from "./Paginayions.module.scss";
import { useState } from "react";
const cx = classNames.bind(styles);
function Paginations(props) {
  const { pagination, handlePageChange } = props;
  const { currentPage, totalPage, pageSize } = pagination;
  const handlePaginationClick = (newPage, oldPage) => {
    if (handlePageChange) {
      handlePageChange(newPage, oldPage);
    }
  };
  const totalPageArray = Array.from(
    { length: totalPage },
    (_, index) => index + 1
  );
  return (
    <div className={cx("pagination__wrapper")}>
      <div className={cx("pagination__first")}>
        <button onClick={() => handlePaginationClick(1)}>FIRST</button>
      </div>
      <div className={cx("pagination__prev")} disabled={currentPage === 1}>
        <button
          disabled={currentPage === 1}
          onClick={() => handlePaginationClick(currentPage - 1, currentPage)}
        >
          PRE
        </button>
      </div>
      {totalPageArray.map((page, index) => {
        const isActive = currentPage === page;
        return (
          <div
            key={index}
            // active={currentPage === page}
            className={cx("pageNumber", { active: isActive })}
          >
            <button onClick={() => handlePaginationClick(page, currentPage)}>
              {page}
            </button>
          </div>
        );
      })}
      <div
        className={cx("pagination__next")}
        disabled={currentPage === totalPage}
      >
        <button
          disabled={currentPage === totalPage}
          onClick={() => handlePaginationClick(currentPage + 1, currentPage)}
        >
          NEXT
        </button>
      </div>
      <div className={cx("pagination__last")}>
        <button onClick={() => handlePaginationClick(totalPage, currentPage)}>
          LAST
        </button>
      </div>
    </div>
  );
}

export default Paginations;
