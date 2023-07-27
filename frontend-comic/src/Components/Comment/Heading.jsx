import { faComments } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Heading = ({ cx }) => {
    return (
        <div className={cx("heading")}>
            <div className={cx("heading__title")}>
                <FontAwesomeIcon
                    icon={faComments}
                    className={cx("heading__icon")}
                />
                <span className={cx("heading__content")}>Comments</span>
            </div>
            <div className={cx("sort__comment")}>
                <span className={cx("sort__heading")}>sắp xếp</span>
            </div>
        </div>
    );
};

export default Heading;
