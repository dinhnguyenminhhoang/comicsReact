import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./Sidebar.module.scss";
import { faBolt } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const cx = classNames.bind(styles);
function Sidebar() {
  const [activeItem, setActiveItem] = useState("");
  const url = [
    "create-user",
    "create-comic",
    "create-chapters",
    "create-categoryForChapters",
  ];
  const { route } = useParams();

  const handleClick = (item) => {
    setActiveItem(item);
  };
  useEffect(() => {
    if (route) handleClick(route);
  });
  return (
    <div className={cx("sidebar-wrapper")}>
      <div className={cx("account")}>
        <img
          src="https://scontent.fsgn2-6.fna.fbcdn.net/v/t39.30808-6/269812011_1083046655869537_4870147934702657640_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=mCRVVdRUTLYAX9MXhs0&_nc_ht=scontent.fsgn2-6.fna&oh=00_AfCmQ8oZBIdwTBeXM3u_LlIuRFzSBHZYQAYtF8nQ1J-TLQ&oe=645E9620"
          alt="avatar"
          className={cx("avatar")}
        />
        <span className={cx("full__name")}>Đinh Nguyễn Minh Hoàng</span>
      </div>
      <div className={cx("nav")}>
        <Link to={`/admin/1/${url[0]}`} onClick={() => handleClick([url[0]])}>
          <div className={cx("nav-item", { active: activeItem === url[0] })}>
            <FontAwesomeIcon className={cx("nav-icon")} icon={faBolt} />
            <span className={cx("nav-item__title")}>Thêm mới người dùng</span>
          </div>
        </Link>
        <Link to={`/admin/2/${url[1]}`} onClick={() => handleClick(url[1])}>
          <div
            className={cx("nav-item", {
              active: activeItem === url[1],
            })}
          >
            <FontAwesomeIcon className={cx("nav-icon")} icon={faBolt} />
            <span className={cx("nav-item__title")}>Thêm mới truyện</span>
          </div>
        </Link>
        <Link to={`/admin/3/${url[2]}`} onClick={() => handleClick(url[2])}>
          <div
            className={cx("nav-item", {
              active: activeItem === url[2],
            })}
          >
            <FontAwesomeIcon className={cx("nav-icon")} icon={faBolt} />
            <span className={cx("nav-item__title")}>Thêm chương mới</span>
          </div>
        </Link>
        <Link to={`/admin/4/${url[3]}`} onClick={() => handleClick(url[3])}>
          <div
            className={cx("nav-item", {
              active: activeItem === url[3],
            })}
          >
            <FontAwesomeIcon className={cx("nav-icon")} icon={faBolt} />
            <span className={cx("nav-item__title")}>
              Thêm thể loại cho truyện
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;
