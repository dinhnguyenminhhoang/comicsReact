import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Title = ({ icon, cx, content, text }) => {
    return (
        <div className={cx("title__wrapper")}>
            <div className={cx("title-name")}>
                <FontAwesomeIcon className={cx("title-icon")} icon={icon} />
                <span className={cx("title__text")}>{text}</span>
            </div>
            <span className={cx("title__content")}>{content}</span>
        </div>
    );
};

export default Title;
