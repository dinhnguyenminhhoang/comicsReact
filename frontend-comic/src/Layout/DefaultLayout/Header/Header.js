import classNames from "classnames/bind";
import Styles from "./Header.module.scss";
import { Container, Image } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAddressBook,
  faPlus,
  faRightFromBracket,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { fetchCategoryData, getUserInfo } from "~/redux/action/action";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "~/redux/slices/authSlices";
import Search from "~/Components/Search/Search";
import coverBase64ToBlob from "~/utils/coverBase64ToBlob";
import { logo } from "~/assets/images/index";
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
  }, [dispatch, isLoggedIn]);

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
              src={logo}
              alt="logo"
              width={40}
              height={40}
              style={{ borderRadius: "999px" }}
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
        <Search />
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
            <div>
              <img
                className={cx("avata")}
                src={coverBase64ToBlob(userInfo.user.image)}
                alt="avata"
              />
            </div>
            <div className={cx("userInfo")}>
              <div className={cx("info__name")}>
                <span className={cx("name")}>
                  <FontAwesomeIcon icon={faUser} className={cx("icon-info")} />
                  {userInfo.user.username || userInfo.user.email}
                </span>
              </div>
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
