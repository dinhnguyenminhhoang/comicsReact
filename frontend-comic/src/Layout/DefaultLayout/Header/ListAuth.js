import { Link } from "react-router-dom";
import Button from "~/Components/Button/Button";

const ListAuth = ({ cx }) => {
    return (
        <div className={cx("auth")}>
            <Link to="/auth/register">
                <Button text="Đăng kí" />
            </Link>
            <Link to="/auth/login">
                <Button text="Đăng nhập" />
            </Link>
        </div>
    );
};

export default ListAuth;
