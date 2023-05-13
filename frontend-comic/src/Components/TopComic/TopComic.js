import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import classNames from "classnames/bind";
import styles from "./TopComic.module.scss";
import { Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
const cx = classNames.bind(styles);
function TopComic() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
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
        <Col md={4} className={cx("img-slider")}>
          <img
            src="https://scontent.fsgn2-6.fna.fbcdn.net/v/t39.30808-6/269812011_1083046655869537_4870147934702657640_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=pBn4zTyAQhIAX-6ARyw&_nc_ht=scontent.fsgn2-6.fna&oh=00_AfDB7WqOgCRDM-DlpQVZj4skdET_7QGrvTG_lmmptjiM2g&oe=6458A760"
            alt="Slide 1"
          />
          <div className={cx("sticker-container")}>
            <span className={cx("day-update")}>8 ngày trước</span>
            <span className={cx("hot")}>Hot</span>
          </div>
          <div className={cx("info-wrapper")}>
            <span className={cx("pratice")}>Đại chiến người khổng lồ</span>
            <span className={cx("new")}>Chương 123</span>
          </div>
        </Col>
        <Col md={4} className={cx("img-slider")}>
          <img
            src="https://znews-photo.zingcdn.me/w660/Uploaded/mdf_eioxrd/2021_07_06/2.jpg"
            alt="Slide 2"
          />
          <div className={cx("sticker-container")}>
            <span className={cx("day-update")}>8 ngày trước</span>
            <span className={cx("hot")}>Hot</span>
          </div>
          <div className={cx("info-wrapper")}>
            <span className={cx("pratice")}>Đại chiến người khổng lồ</span>
            <span className={cx("new")}>Chương 123</span>
          </div>
        </Col>
        <Col md={4} className={cx("img-slider")}>
          <img
            src="https://cdn.sforum.vn/sforum/wp-content/uploads/2018/11/2-10.png"
            alt="Slide 3"
          />
          <div className={cx("sticker-container")}>
            <span className={cx("day-update")}>8 ngày trước</span>
            <span className={cx("hot")}>Hot</span>
          </div>
          <div className={cx("info-wrapper")}>
            <span className={cx("pratice")}>Đại chiến người khổng lồ</span>
            <span className={cx("new")}>Chương 123</span>
          </div>
        </Col>
        <Col md={4} className={cx("img-slider")}>
          <img
            src="https://antimatter.vn/wp-content/uploads/2022/10/hinh-anh-3d.jpg"
            alt="Slide 4"
          />
          <div className={cx("sticker-container")}>
            <span className={cx("day-update")}>8 ngày trước</span>
            <span className={cx("hot")}>Hot</span>
          </div>
          <div className={cx("info-wrapper")}>
            <span className={cx("pratice")}>Đại chiến người khổng lồ</span>
            <span className={cx("new")}>Chương 123</span>
          </div>
        </Col>
        <Col md={4} className={cx("img-slider")}>
          <img
            src="https://vcdn1-dulich.vnecdn.net/2021/07/16/3-1-1626444927.jpg?w=1200&h=0&q=100&dpr=1&fit=crop&s=0nww5sftrDimoUxyn9lM5g"
            alt="Slide 5"
          />
          <div className={cx("sticker-container")}>
            <span className={cx("day-update")}>8 ngày trước</span>
            <span className={cx("hot")}>Hot</span>
          </div>
          <div className={cx("info-wrapper")}>
            <span className={cx("pratice")}>Đại chiến người khổng lồ</span>
            <span className={cx("new")}>Chương 123</span>
          </div>
        </Col>
      </Slider>
    </div>
  );
}

export default TopComic;
