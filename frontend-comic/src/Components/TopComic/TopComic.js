import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import classNames from "classnames/bind";
import styles from "./TopComic.module.scss";
import { Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { getTopComic } from "~/redux/action/action.js";
import { useEffect, useState } from "react";
const cx = classNames.bind(styles);
function TopComic() {
  const [updatedAt, setUpdatedAt] = useState("");
  const [timePassed, setTimePassed] = useState([]);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const comicData = useSelector((state) => state.comicApi.data);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTopComic());
  }, [dispatch]);
  useEffect(() => {
    setUpdatedAt(comicData);
  }, [comicData]);
  useEffect(() => {
    if (updatedAt) {
      let data = calculateTimePassed(updatedAt);
      setTimePassed(data);
    }
  }, [updatedAt]);
  const calculateTimePassed = (updatedAt) => {
    const now = new Date();
    let timeUpdate = updatedAt.map((date) => {
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
      ];

      const timePassedString = timeUnits
        .filter((unit) => unit.value > 0)
        .map(
          (unit) => `${unit.value} ${unit.label}${unit.value !== 1 ? "" : ""}`
        )
        .join(", ");
      return {
        timePassed: timePassedString,
      };
    });
    return timeUpdate;
  };
  return (
    <div className={cx("top-comic__container")}>
      <Col md={12}>
        <div className={cx("heading")}>
          <FontAwesomeIcon icon={faStar} />
          <span>Top Truyện mới</span>
        </div>
      </Col>
      <Slider {...settings}>
        {comicData &&
          comicData.map((comic, index) => {
            return (
              <Col md={4} className={cx("img-slider")} key={index}>
                <img src={comic.image} alt="Slide 1" />
                <div className={cx("sticker-container")}>
                  <span className={cx("day-update")}>
                    {timePassed[index]
                      ? timePassed[index].timePassed + " trước"
                      : "chưa cập nhật"}
                  </span>
                  <span className={cx("hot")}>Hot</span>
                </div>
                <div className={cx("info-wrapper")}>
                  <span className={cx("pratice")}>{comic.name}</span>
                  <span className={cx("new")}>Chương 123</span>
                </div>
              </Col>
            );
          })}
      </Slider>
    </div>
  );
}

export default TopComic;
