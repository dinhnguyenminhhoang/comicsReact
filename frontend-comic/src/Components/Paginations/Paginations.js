import classNames from "classnames/bind";
import styles from "./Paginayions.module.scss";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toNumber } from "lodash";
const cx = classNames.bind(styles);

function Paginations(props) {
  const { pagination, handlePageChange } = props;
  const { currentPage, totalPage, pageSize } = pagination;
  const maxDisplayedPages = 6;
  const navigate = useNavigate();
  const handlePaginationClick = (newPage, oldPage) => {
    if (handlePageChange) {
      handlePageChange(newPage, oldPage);
    }
    navigate(`/pages/${newPage}`);
  };
  let pageIndexes = [];

  if (totalPage <= maxDisplayedPages) {
    pageIndexes = Array.from({ length: totalPage }, (_, index) => index);
  } else {
    const halfDisplayCount = Math.floor(maxDisplayedPages / 2);
    const leftDisplayCount = halfDisplayCount;
    const rightDisplayCount = maxDisplayedPages - leftDisplayCount - 1;

    if (currentPage <= halfDisplayCount) {
      pageIndexes = Array.from(
        { length: maxDisplayedPages },
        (_, index) => index
      );
    } else if (currentPage >= totalPage - halfDisplayCount) {
      pageIndexes = Array.from(
        { length: maxDisplayedPages },
        (_, index) => totalPage - maxDisplayedPages + index
      );
    } else {
      const startIndex = currentPage - leftDisplayCount - 1;
      pageIndexes = Array.from(
        { length: maxDisplayedPages },
        (_, index) => startIndex + index
      );
    }
  }

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
      {pageIndexes.map((pageIndex, index) => {
        const page = pageIndex + 1;
        const isActive = currentPage === page;
        return (
          <div key={index} className={cx("pageNumber", { active: isActive })}>
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
