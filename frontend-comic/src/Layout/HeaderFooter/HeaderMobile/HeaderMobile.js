import classNames from "classnames/bind";
import Slider from "react-slick";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styles from "./HeaderMobile.module.scss";
const cx = classNames.bind(styles);
const HeaderMobile = () => {
    const categoryData = useSelector((state) => state.categoryApi.data);

    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        arrows: false,
    };

    return (
        <div className={cx("sidebar__wrapper")}>
            {categoryData && categoryData.length > 0 && (
                <Slider {...settings}>
                    {categoryData.map((category, index) => (
                        <div key={index} className={cx("category")}>
                            <Link to={`/categories/${category.id}`}>
                                {category.name}
                            </Link>
                        </div>
                    ))}
                </Slider>
            )}
        </div>
    );
};

export default HeaderMobile;
