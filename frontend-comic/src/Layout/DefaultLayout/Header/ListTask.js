import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import coverBase64ToBlob from "~/utils/coverBase64ToBlob";
import { Link } from "react-router-dom";
const ListTask = ({ cx, image, id, firstIcon, secondIcon, handleLogOut }) => {
    return (
        <div className={cx("account")}>
            <div>
                <img
                    className={cx("avata")}
                    src={coverBase64ToBlob(image)}
                    alt="avata"
                />
            </div>
            <div className={cx("userInfo")}>
                <ul className={cx("info__list")}>
                    <li className={cx("info__item")}>
                        <Link to={`/profile/${id}`}>
                            <FontAwesomeIcon
                                className={cx("icon-info")}
                                icon={firstIcon}
                            />
                            trang cá nhân
                        </Link>
                    </li>
                    <li className={cx("info__item")} onClick={handleLogOut}>
                        <FontAwesomeIcon
                            className={cx("icon-info")}
                            icon={secondIcon}
                        />
                        Đăng xuất
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default ListTask;
