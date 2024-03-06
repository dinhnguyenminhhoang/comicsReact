import { faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import Input from "~/Components/Input/Input";

const FormLogin = ({ cx, formData, handleInputChange, formErrors }) => {
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
                    value={formData.password}
                    onChange={handleInputChange}
                    name="password"
                    icon={faLock}
                    type="password"
                />
                {formErrors.password && (
                    <span className={cx("error-message")}>
                        {formErrors.password}
                    </span>
                )}
            </div>
        </div>
    );
};

export default FormLogin;
