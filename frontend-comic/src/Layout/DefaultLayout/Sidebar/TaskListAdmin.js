import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const TaskListAdmin = ({ cx, icon, url, activeItem, handleClick }) => {
    return (
        <div className={cx("nav")}>
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
                            icon={icon}
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
                            icon={icon}
                        />
                        <span className={cx("nav-item__title")}>
                            Quản lí người dùng
                        </span>
                    </div>
                </Link>
            </>
            <Link to={`/admin/2/${url[3]}`} onClick={() => handleClick(url[3])}>
                <div
                    className={cx("nav-item", {
                        active: activeItem === url[3],
                    })}
                >
                    <FontAwesomeIcon className={cx("nav-icon")} icon={icon} />
                    <span className={cx("nav-item__title")}>
                        Quản lí Truyện
                    </span>
                </div>
            </Link>
            <Link to={`/admin/3/${url[4]}`} onClick={() => handleClick(url[4])}>
                <div
                    className={cx("nav-item", {
                        active: activeItem === url[4],
                    })}
                >
                    <FontAwesomeIcon className={cx("nav-icon")} icon={icon} />
                    <span className={cx("nav-item__title")}>
                        Quản lí chương
                    </span>
                </div>
            </Link>
        </div>
    );
};

export default TaskListAdmin;
