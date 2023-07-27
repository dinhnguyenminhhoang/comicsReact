import classNames from "classnames/bind";
import styles from "./Button.module.scss";
const cx = classNames.bind(styles);
const Button = ({ text, border }) => {
    return (
        <button
            className={cx("btn", {
                border: border,
            })}
        >
            {text}
        </button>
    );
};

export default Button;
