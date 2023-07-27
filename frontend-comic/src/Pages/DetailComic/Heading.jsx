import { faHomeAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Heading = ({ cx, comicById, handleBackHistory }) => {
    return (
        <div className={cx("detail__heading")}>
            <div onClick={handleBackHistory} className={cx("detail-home")}>
                <FontAwesomeIcon icon={faHomeAlt} className={cx("icon")} />
                <span className={cx("home__page--title")}>Trang chủ /</span>
            </div>
            <span className={cx("home__page--title")}>
                {comicById.data.name}
            </span>
        </div>
    );
};

export default Heading;
