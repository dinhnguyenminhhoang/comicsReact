import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import classNames from "classnames/bind";
import { Col, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { getTopComic } from "~/redux/action/action.js";
import { useEffect, useState } from "react";
import styles from "./TopComic.module.scss";
import Heading from "../Heading/Heading";
import Books from "../Books/Books";
const cx = classNames.bind(styles);
function TopComic() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  const comicData = useSelector((state) => state.comicApi.data);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTopComic(10));
  }, [dispatch]);

  return (
    <div className={cx("top-comic__container")}>
      <Heading heading="Top truyện hay" />
      <Slider {...settings}>
        {comicData &&
          comicData.map((comic, index) => {
            return (
              <Books
                key={index}
                name={comic.name}
                image={comic.image}
                timePassed={comicData}
                index={index}
                id={comic.id}
              />
            );
          })}
      </Slider>
    </div>
  );
}

export default TopComic;
