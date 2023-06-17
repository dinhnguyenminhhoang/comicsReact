import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./Sidebar.module.scss";
import { faBolt } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserInfo } from "~/redux/action/action";
import { useDispatch, useSelector } from "react-redux";
const cx = classNames.bind(styles);
function Sidebar() {
  let dispatch = useDispatch();
  let userInfo = useSelector((state) => state.userInfo.data);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    if (isLoggedIn && user) dispatch(getUserInfo(user.email));
  }, [dispatch]);
  const [activeItem, setActiveItem] = useState("profile");
  const url = [
    "profile",
    "admin-manager",
    "users-manager",
    "comics-manager",
    "chapters-manager",
  ];
  const { route } = useParams();

  const handleClick = (item) => {
    setActiveItem(item);
  };
  useEffect(() => {
    if (route) handleClick(route);
  }, [route]);
  return (
    <div className={cx("sidebar-wrapper")}>
      {isLoggedIn && userInfo && userInfo.user ? (
        <div>
          <Link
            to={`/profile/${userInfo.user.id}`}
            onClick={() => handleClick(url[0])}
          >
            <div className={cx("account", { active: activeItem === url[0] })}>
              <img
                src={userInfo.user.image}
                alt="avatar"
                className={cx("avatar")}
              />
              <span className={cx("full__name")}>
                {userInfo.user.username || "vui lòng thêm username"}
              </span>
            </div>
          </Link>
          {isLoggedIn &&
          userInfo &&
          userInfo.user &&
          (userInfo.user.roleId === "R3" || userInfo.user.roleId === "R2") ? (
            <div className={cx("nav")}>
              {isLoggedIn &&
              userInfo &&
              userInfo.user &&
              userInfo.user.roleId === "R3" ? (
                <>
                  <Link
                    to={`/admin/5/${url[1]}`}
                    onClick={() => handleClick(url[1])}
                  >
                    <div
                      className={cx("nav-item", {
                        active: activeItem === url[1],
                      })}
                    >
                      <FontAwesomeIcon
                        className={cx("nav-icon")}
                        icon={faBolt}
                      />
                      <span className={cx("nav-item__title")}>
                        Bảng Thống Kê
                      </span>
                    </div>
                  </Link>
                  <Link
                    to={`/admin/1/${url[2]}`}
                    onClick={() => handleClick(url[2])}
                  >
                    <div
                      className={cx("nav-item", {
                        active: activeItem === url[2],
                      })}
                    >
                      <FontAwesomeIcon
                        className={cx("nav-icon")}
                        icon={faBolt}
                      />
                      <span className={cx("nav-item__title")}>
                        Quản lí người dùng
                      </span>
                    </div>
                  </Link>
                </>
              ) : (
                ""
              )}
              <Link
                to={`/admin/2/${url[3]}`}
                onClick={() => handleClick(url[3])}
              >
                <div
                  className={cx("nav-item", {
                    active: activeItem === url[3],
                  })}
                >
                  <FontAwesomeIcon className={cx("nav-icon")} icon={faBolt} />
                  <span className={cx("nav-item__title")}>Quản lí Truyện</span>
                </div>
              </Link>
              <Link
                to={`/admin/3/${url[4]}`}
                onClick={() => handleClick(url[4])}
              >
                <div
                  className={cx("nav-item", {
                    active: activeItem === url[4],
                  })}
                >
                  <FontAwesomeIcon className={cx("nav-icon")} icon={faBolt} />
                  <span className={cx("nav-item__title")}>Quản lí chương</span>
                </div>
              </Link>
            </div>
          ) : (
            ""
          )}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default Sidebar;
