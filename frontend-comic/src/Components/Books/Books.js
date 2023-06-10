import classNames from "classnames/bind";
import styles from "./Books.module.scss";
import { Col, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateViews } from "~/redux/action/action";
import calculateTimePassed from "~/utils/timePass";
import coverBase64ToBlob from "~/utils/coverBase64ToBlob";
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
  //
  let handleUpdateViews = () => {
    dispatch(updateViews(props.id));
  };
  let imageToFile = coverBase64ToBlob(props.image);
  return (
    <Row
      className={cx("book__container", {
        cus: props.className,
      })}
      onClick={handleUpdateViews}
    >
      <Link to={`/detail-comic/${props.id}`}>
        <Col
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
              {timePassed && timePassed.length > 0
                ? timePassed[props.index].timePassed + " trước"
                : "chưa cập nhật"}
            </span>
            <span className={cx("hot")}>Hot</span>
          </div>
          <div className={cx("info-wrapper")}>
            <span className={cx("pratice")}>{props.name}</span>
          </div>
        </Col>
      </Link>
    </Row>
  );
}

export default Books;
