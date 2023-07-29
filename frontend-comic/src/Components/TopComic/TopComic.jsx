import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { getTopComic } from "~/redux/action/action.js";
import Books from "../Books/Books";
import Heading from "../Heading/Heading";
import styles from "./TopComic.module.scss";
const cx = classNames.bind(styles);
function TopComic() {
    const [numberSlider, setNumberSlider] = useState(4);
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: numberSlider,
        slidesToScroll: 1,
        autoplay: true,
        arrows: false,
        autoplaySpeed: 2000,
    };

    useEffect(() => {
        function updateNumberSlider() {
            const scrollWidth = document.documentElement.scrollWidth;
            if (scrollWidth >= 768) {
                setNumberSlider(4);
            } else if (scrollWidth >= 576) {
                setNumberSlider(1);
            } else {
                setNumberSlider(1);
            }
        }
        updateNumberSlider();
        window.addEventListener("resize", updateNumberSlider);
        return () => {
            window.removeEventListener("resize", updateNumberSlider);
        };
    }, []);

    const comicData = useSelector((state) => state.comicApi.data);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getTopComic(10));
    }, [dispatch]);

    return (
        <div className={cx("top-comic__container")}>
            <Heading heading="Top truyện hay" />
            <Row style={{ marginRight: "0" }}>
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
                                    slider={true}
                                />
                            );
                        })}
                </Slider>
            </Row>
        </div>
    );
}

export default TopComic;
