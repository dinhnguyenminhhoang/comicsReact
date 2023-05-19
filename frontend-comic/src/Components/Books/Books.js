import classNames from "classnames/bind";
import styles from "./Books.module.scss";
import { Col, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const cx = classNames.bind(styles);
function Books(props) {
  const [updatedAt, setUpdatedAt] = useState("");
  const [timePassed, setTimePassed] = useState([]);
  //
  useEffect(() => {
    if (updatedAt) {
      let data = calculateTimePassed(updatedAt);
      setTimePassed(data);
    }
  }, [updatedAt]);
  useEffect(() => {
    setUpdatedAt(props.timePassed);
  }, [props.timePassed]);
  //
  const calculateTimePassed = (updatedAt) => {
    const now = new Date();
    const limit = 1;
    const timeUpdate = updatedAt.map((date) => {
      const createdAtDate = new Date(date.updatedAt);
      const timeDiff = now - createdAtDate;

      const timeUnits = [
        {
          label: "năm",
          value: Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 30 * 12)),
        },
        {
          label: "tháng",
          value: Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 30)),
        },
        { label: "ngày", value: Math.floor(timeDiff / (1000 * 60 * 60 * 24)) },
        { label: "giờ", value: Math.floor(timeDiff / (1000 * 60 * 60)) },
        { label: "phút", value: Math.floor(timeDiff / (1000 * 60)) },
      ];

      const timePassedArray = timeUnits
        .filter((unit) => unit.value > 0)
        .map(
          (unit) => `${unit.value} ${unit.label}${unit.value !== 1 ? "" : ""}`
        )
        .slice(0, limit);

      const timePassedString = timePassedArray.join(", ");

      return {
        timePassed: timePassedString,
      };
    });
    return timeUpdate;
  };
  return (
    <Row
      className={cx("book__container", "mb-2", {
        cus: props.className,
      })}
    >
      <Link to={`detail-comic/${props.id}`}>
        <Col
          className={cx("img__book", {
            cus_img: props.className,
          })}
        >
          <img
            src={props.image}
            alt="Slide 1"
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
            <span className={cx("new")}>Chương 123</span>
          </div>
        </Col>
      </Link>
    </Row>
  );
}

export default Books;
