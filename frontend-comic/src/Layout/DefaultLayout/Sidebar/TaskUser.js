import { Link } from "react-router-dom";

const TaskUser = ({ userInfo, url, cx, handleClick, activeItem }) => {
    return (
        <div>
            <Link
                to={`/profile/${userInfo.user.id}`}
                onClick={() => handleClick(url[0])}
            >
                <div
                    className={cx("account", {
                        active: activeItem === url[0],
                    })}
                >
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
        </div>
    );
};

export default TaskUser;
