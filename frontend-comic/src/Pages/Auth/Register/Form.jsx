import { faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import Input from "~/Components/Input/Input";
const Form = ({ cx, formData, formErrors, handleInputChange }) => {
    return (
        <div className={cx("form__groups")}>
            <div className={cx("form")}>
                <Input
                    value={formData.email}
                    onChange={handleInputChange}
                    name="email"
                    icon={faUser}
                />
                {formErrors.email && (
                    <span className={cx("error-message")}>
                        {formErrors.email}
                    </span>
                )}
            </div>
            <div className={cx("form")}>
                <Input
                    value={formData.username}
                    onChange={handleInputChange}
                    name="username"
                    icon={faUser}
                />
                {formErrors.username && (
                    <span className={cx("error-message")}>
                        {formErrors.username}
                    </span>
                )}
            </div>{" "}
            <div className={cx("form")}>
                <Input
                    type="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    name="password"
                    icon={faLock}
                />
                {formErrors.password && (
                    <span className={cx("error-message")}>
                        {formErrors.password}
                    </span>
                )}
            </div>
            <div className={cx("form")}>
                <Input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    icon={faLock}
                />
                {formErrors.confirmPassword && (
                    <span className={cx("error-message")}>
                        {formErrors.confirmPassword}
                    </span>
                )}
            </div>
        </div>
    );
};

export default Form;
