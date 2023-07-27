import classNames from "classnames/bind";
import styles from "./Login.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { login } from "~/redux/slices/authSlices";
import { authLogin } from "~/redux/action/action";
import { Image } from "react-bootstrap";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import bcrypt from "bcryptjs";
import { Link, useNavigate } from "react-router-dom";
import toasts from "~/utils/handleToast";
import validateForm from "~/utils/validateForm";
import FormLogin from "./FormLogin";

const saltRounds = 10;
const cx = classNames.bind(styles);
function Login() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const navigate = useNavigate();
    const [formErrors, setFormErrors] = useState({});
    const loginInfo = useSelector((state) => state.login.data);
    const [islogin, setIsLogin] = useState(false);
    const dispatch = useDispatch();
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validationRules = {
        email: {
            required: true,
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            errorMessage: "Email không hợp lệ",
        },
        password: {
            required: true,
            minLength: 6,
            hasSpecialChar: true,
            hasUpperCase: true,
            errorMessage:
                "Password phải có ít nhất 6 ký tự, 1 ký tự đặc biệt và 1 chữ in hoa",
        },
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        let validaForm = validateForm(formData, validationRules);
        setFormErrors(validaForm[1]);
        const isValid = validaForm[0];
        if (isValid) {
        }
        dispatch(
            authLogin({
                email: formData.email,
                password: formData.password,
            })
        );
    };
    const handleToast = () => {
        if (loginInfo && loginInfo.errCode === 0) {
            handleLogin();
            setIsLogin(true);
        } else if (loginInfo && loginInfo.errCode === 1) {
            toasts(`❌ đăng nhập thất bại ${loginInfo.message}`);
            const param = loginInfo.message.split(" ")[0];
            setFormData({
                ...formData,
                [param]: "",
            });
        }
    };

    const handleLogin = () => {
        if (loginInfo && loginInfo.errCode === 0) {
            const salt = bcrypt.genSaltSync(saltRounds);
            const hashedPassword = bcrypt.hashSync(formData.password, salt);
            dispatch(
                login({
                    email: formData.email,
                    password: hashedPassword,
                })
            );
            setFormData({
                email: "",
                password: "",
            });
        }
    };

    useEffect(() => {
        if (loginInfo) {
            handleToast();
            if (islogin) {
                navigate("/");
            }
        }
    }, [loginInfo]);
    return (
        <div className={cx("login__container")}>
            <div className={cx("login-background")}>
                <div className={cx("login-modal")}>
                    <div className={cx("modal__container")}>
                        <div className={cx("heading-wrapper")}>
                            <Image
                                src="https://tse4.mm.bing.net/th?id=OIP.h23BqCedgvIdElSpkuMOSAHaEK&pid=Api&P=0&h=180"
                                alt="logo"
                                width="80px"
                                height="60px"
                                className={cx("logo")}
                            />
                            <span className={cx("heading")}>ĐĂNG NHẬP</span>
                        </div>
                        <FormLogin
                            cx={cx}
                            formData={formData}
                            handleInputChange={handleInputChange}
                            formErrors={formErrors}
                        />
                        <div className={cx("submit")}>
                            <button
                                type="submit"
                                className={cx("btn-submit")}
                                onClick={handleSubmit}
                            >
                                Đăng Nhập
                            </button>
                        </div>
                        <div className={cx("no__acount")}>
                            <span className={cx("title")}> No a member?</span>
                            <Link to="/auth/register">Create account</Link>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer limit={4} />
        </div>
    );
}

export default Login;
