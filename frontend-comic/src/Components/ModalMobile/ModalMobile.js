import classNames from "classnames/bind";
import styles from "./ModalMobile.module.scss";
const cx = classNames.bind(styles);
const ModalMobile = () => {
    return <div className={cx("modal__wrapper")}></div>;
};

export default ModalMobile;
