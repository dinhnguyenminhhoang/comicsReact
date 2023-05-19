import classNames from "classnames/bind";
import Styles from "./Header.module.scss";
import { Container, Image } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { fetchCategoryData } from "../../../redux/action/action";
import { useEffect } from "react";
import { Link } from "react-router-dom";
const cx = classNames.bind(Styles);
function Header() {
  const categoryData = useSelector((state) => state.categoryApi.data);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCategoryData());
  }, [dispatch]);
  return (
    <div className={cx("header-wrapper")}>
      <Container className={cx("container")}>
        <div className={cx("logo")}>
          <Link to="/">
            <Image
              src="https://www.truyenqq.com.vn/assets/images/logo-icon.png"
              alt="logo"
            />
          </Link>
        </div>
        <div className={cx("nav-container")}>
          <ul className={cx("nav-list")}>
            {categoryData &&
              categoryData.map((category, index) => {
                return (
                  <li className={cx("nav-item")} key={index}>
                    {category.name}
                  </li>
                );
              })}
          </ul>
        </div>
        <div className={cx("search-box")}>
          <div className={cx("input-search")}>
            <input type="text" placeholder="BẠN MUỐN TÌM CHUYỆN GÌ ?" />
            <button className={cx("icon-btn-search")}>
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </div>
        </div>
        <div className={cx("auth")}>
          <button className={cx("register-btn")}>Đăng kí</button>
          <button className={cx("login-btn")}>Đăng nhập</button>
        </div>
      </Container>
    </div>
  );
}

export default Header;
