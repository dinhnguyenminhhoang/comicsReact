import classNames from "classnames/bind";
import { upperCase } from "lodash";
import { useEffect, useState } from "react";
import { Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { updateViews } from "~/redux/action/action";
import coverBase64ToBlob from "~/utils/coverBase64ToBlob";
import calculateTimePassed from "~/utils/timePass";
import styles from "./Books.module.scss";
const cx = classNames.bind(styles);
function Books(props) {
    const [updatedAt, setUpdatedAt] = useState("");
    const [timePassed, setTimePassed] = useState([]);
    let dispatch = useDispatch();
    useEffect(() => {
        if (updatedAt) {
            if (calculateTimePassed) {
                let data = calculateTimePassed(updatedAt);
                setTimePassed(data);
            }
        }
    }, [updatedAt]);
    useEffect(() => {
        setUpdatedAt(props.timePassed);
    }, [props.timePassed]);
    let handleUpdateViews = () => {
        dispatch(updateViews(props.id));
    };
    let imageToFile = coverBase64ToBlob(props.image);
    return (
        <Col
            xs={6} // Hiển thị 2 cột trên mobile (12/6 = 2)
            md={3}
            xl={2}
            className={cx("book__container", {
                cus: props.className,
                slider: props.slider,
            })}
            onClick={handleUpdateViews}
        >
            <Link to={`/detail-comic/${props.id}`}>
                <div
                    className={cx("img__book", {
                        cus_img: props.className,
                    })}
                >
                    <img
                        src={imageToFile}
                        alt="Slide 1"
                        height={100 + "%"}
                        className={cx("img", {
                            img__allComic: props.className,
                        })}
                    />
                    <div className={cx("sticker-container")}>
                        <span className={cx("day-update")}>
                            {timePassed?.length > 0
                                ? timePassed[props.index].timePassed + " trước"
                                : "chưa cập nhật"}
                        </span>
                        {timePassed?.length > 0 &&
                            timePassed[props.index].timePassed.substring(
                                timePassed[props.index].timePassed.indexOf(
                                    " "
                                ) + 1
                            ) !== "tháng" && (
                                <span className={cx("hot")}>Hot</span>
                            )}
                    </div>
                    <div className={cx("info-wrapper")}>
                        <span className={cx("pratice")}>
                            {upperCase(props.name)}
                        </span>
                    </div>
                </div>
            </Link>
        </Col>
    );
}

export default Books;
