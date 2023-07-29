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
import { Row } from "react-bootstrap";

const cx = classNames.bind(styles);

function AllComic() {
    const dispatch = useDispatch();
    const paginationData = useSelector((state) => state.pagination.data);
    const { pageNumber } = useParams();
    const [pagination, setPagination] = useState({
        currentPage: toNumber(pageNumber) || 1,
        totalPage: paginationData.totalPage || 1,
        pageSize: 12,
    });

    useEffect(() => {
        dispatch(
            getPagination({
                pageNumber: pagination.currentPage,
                pageSize: pagination.pageSize,
            })
        );
    }, [dispatch, pagination.currentPage, pagination.pageSize]);

    useEffect(() => {
        if (paginationData.totalPage) {
            setPagination((prevPagination) => ({
                ...prevPagination,
                totalPage: paginationData.totalPage,
            }));
        }
    }, [paginationData]);

    const handlePageChange = (newPage) => {
        setPagination((prevPagination) => ({
            ...prevPagination,
            currentPage: newPage,
        }));
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
            <Row className={cx("allComic__wrapper")}>
                {paginationData?.data?.map((comic, index) => (
                    <Books
                        image={comic.image}
                        name={comic.name}
                        timePassed={paginationData.data}
                        index={index}
                        className={true}
                        id={comic.id}
                        key={index}
                    />
                ))}
            </Row>
            <Paginations
                pagination={pagination}
                handlePageChange={handlePageChange}
                pageNumber={pageNumber}
            />
        </div>
    );
}

export default AllComic;
