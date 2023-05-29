import classNames from "classnames/bind";
import Styles from "./Header.module.scss";
import { Container, Image } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAddressBook,
  faPlus,
  faRightFromBracket,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { fetchCategoryData } from "../../../redux/action/action";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { login, logout } from "~/redux/slices/authSlices";
const cx = classNames.bind(Styles);
function Header() {
  const categoryData = useSelector((state) => state.categoryApi.data);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  console.log(isLoggedIn);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCategoryData());
  }, [dispatch]);
  const handleLogOut = () => {
    dispatch(logout());
  };
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
                  <Link to={`/categories/${category.id}`} key={index}>
                    <li className={cx("nav-item")}>{category.name}</li>
                  </Link>
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
        {!isLoggedIn ? (
          <div className={cx("auth")}>
            <Link to="/auth/register">
              <button className={cx("register-btn")}>Đăng kí</button>
            </Link>
            <Link to="/auth/login">
              <button className={cx("login-btn")}>Đăng nhập</button>
            </Link>
          </div>
        ) : (
          <div className={cx("account")}>
            <img
              className={cx("avata")}
              src="https://scontent.fsgn2-6.fna.fbcdn.net/v/t39.30808-6/269812011_1083046655869537_4870147934702657640_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=mWZv_UDR17sAX_XEi3j&_nc_ht=scontent.fsgn2-6.fna&oh=00_AfBhPmKo0WLaTQKJWFjsLp69Kt_Nm0tdEJWsKt0RY8q6fg&oe=647A45A0"
              alt="avata"
            />
            <span className={cx("name")}>Đinh Nguyễn Minh Hoàng</span>
            <div className={cx("userInfo")}>
              <ul className={cx("info__list")}>
                <li className={cx("info__item")}>
                  <FontAwesomeIcon
                    className={cx("icon-info")}
                    icon={faAddressBook}
                  />
                  Profile
                </li>
                <li className={cx("info__item")}>
                  <FontAwesomeIcon className={cx("icon-info")} icon={faPlus} />
                  theo dõi
                </li>
                <li className={cx("info__item")} onClick={handleLogOut}>
                  <FontAwesomeIcon
                    className={cx("icon-info")}
                    icon={faRightFromBracket}
                  />
                  Đăng xuất
                </li>
              </ul>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}

export default Header;
