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
import { fetchCategoryData, getUserInfo } from "~/redux/action/action";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login, logout } from "~/redux/slices/authSlices";
const cx = classNames.bind(Styles);
function Header() {
  let navigator = useNavigate();
  const categoryData = useSelector((state) => state.categoryApi.data);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const userInfo = useSelector((state) => state.userInfo.data);
  const user = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCategoryData());
  }, [dispatch]);
  useEffect(() => {
    if (isLoggedIn) dispatch(getUserInfo(user.email));
  }, [dispatch]);

  const handleLogOut = () => {
    dispatch(logout());
    navigator("/");
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
        {!isLoggedIn || !userInfo.user ? (
          <div className={cx("auth")}>
            <Link to="/auth/register">
              <button className={cx("register-btn")}>Đăng kí</button>
            </Link>
            <Link to="/auth/login">
              <button className={cx("login-btn")}>Đăng nhập</button>
            </Link>
          </div>
        ) : userInfo && userInfo.user ? (
          <div className={cx("account")}>
            <img
              className={cx("avata")}
              src={userInfo.user.image}
              alt="avata"
            />
            <span className={cx("name")}>
              {userInfo.user.username || userInfo.user.email}
            </span>
            <div className={cx("userInfo")}>
              <ul className={cx("info__list")}>
                <li className={cx("info__item")}>
                  <Link to={`/profile/${userInfo.user.id}`}>
                    <FontAwesomeIcon
                      className={cx("icon-info")}
                      icon={faAddressBook}
                    />
                    Profile
                  </Link>
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
        ) : (
          ""
        )}
      </Container>
    </div>
  );
}

export default Header;
