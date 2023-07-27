import classNames from "classnames/bind";
import styles from "./Input.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const cx = classNames.bind(styles);
const Input = ({
    type = "text",
    name,
    icon,
    value,
    onChange,
    width = "320",
    disabled = false,
}) => {
    return (
        <div className={cx("input__wrapper")}>
            <input
                className={cx("input")}
                name={name}
                type={type}
                placeholder={`nhập ${name}`}
                value={value}
                onChange={onChange}
                style={{ width: `${width}px` }}
                disabled={disabled}
            />
            {icon && <FontAwesomeIcon icon={icon} className={cx("icon")} />}
        </div>
    );
};

export default Input;
