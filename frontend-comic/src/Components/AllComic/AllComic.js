import classNames from "classnames/bind";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getPagination } from "~/redux/action/action.js";
import styles from "./AllComic.module.scss";
import Heading from "../Heading/Heading";
import Books from "../Books/Books";
import Paginations from "~/Components/Paginations/Paginations";
import { useParams } from "react-router-dom";
import { toNumber } from "lodash";
const cx = classNames.bind(styles);
function AllComic() {
  let { pageNumber } = useParams();
  const [pagination, setPagination] = useState({
    currentPage: toNumber(pageNumber) || 1,
    totalPage: 1,
    pageSize: 12,
  });
  const dispatch = useDispatch();
  const paginationData = useSelector((state) => state.pagination.data);
  useEffect(() => {
    dispatch(
      getPagination({
        pageNumber: pagination.currentPage,
        pageSize: pagination.pageSize,
      })
    );
  }, [dispatch]);
  useEffect(() => {
    if (paginationData.totalPage)
      setPagination({ ...pagination, totalPage: paginationData.totalPage });
  }, [paginationData]);
  const handlePageChange = (newPage, oldPage) => {
    setPagination({ ...pagination, currentPage: newPage });
    dispatch(
      getPagination({
        pageNumber: newPage,
        pageSize: pagination.pageSize,
      })
    );
  };
  return (
    <div className={cx("allComic__container")}>
      <Heading heading="truyện mới nhất" />
      <div className={cx("allComic__wrapper")}>
        {paginationData.data &&
          paginationData.data.map((comic, index) => {
            return (
              <div className={cx("book")} key={index}>
                <Books
                  image={comic.image}
                  name={comic.name}
                  timePassed={paginationData.data}
                  index={index}
                  className={true}
                  id={comic.id}
                />
              </div>
            );
          })}
      </div>
      <Paginations
        pagination={pagination}
        handlePageChange={handlePageChange}
        pageNumber={pageNumber}
      />
    </div>
  );
}

export default AllComic;
