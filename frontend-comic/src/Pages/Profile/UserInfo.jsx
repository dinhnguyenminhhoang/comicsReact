import { faRepeat } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const UserInfo = ({ cx, userInfo, handleShowRepearProfile }) => {
    return (
        <div className={cx("profile__info")}>
            <span className={cx("profile__name")}>{userInfo.username}</span>
            <span className={cx("profile__email")}>{userInfo.email}</span>
            <button
                className={cx("profile__repear")}
                onClick={handleShowRepearProfile}
            >
                <FontAwesomeIcon icon={faRepeat} className={cx("btn-icon")} />
                sửa hồ sơ
            </button>
        </div>
    );
};

export default UserInfo;
