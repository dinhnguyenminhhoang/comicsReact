import classNames from "classnames/bind";
import styles from "./Register.module.scss";
import { createUser } from "~/redux/action/action";
import { Link, useNavigate } from "react-router-dom";
import { Image } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import toasts from "~/utils/handleToast";
import Form from "./Form";
import validateForm from "~/utils/validateForm";
const cx = classNames.bind(styles);
function Register() {
    let navigate = useNavigate();
    const [isProcessing, setIsProcessing] = useState(false);
    let dataUser = useSelector((state) => state.user.data);
    const [formData, setFormData] = useState({
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
    });
    const dispatch = useDispatch();
    const [formErrors, setFormErrors] = useState({});
    const handleInputChange = (event) => {
        const { name, value } = event.target;
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
        confirmPassword: {
            required: true,
            matchField: "password",
            errorMessage: "Confirm Password không khớp",
        },
        username: {
            required: true,
            minLength: 3,
            maxLength: 20,
            errorMessage: "Username phải có độ dài từ 3 đến 20 ký tự",
        },
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let validate = validateForm(formData, validationRules);
        const isValid = validate[0];
        setFormErrors(validate[1]);
        if (isValid) {
            setIsProcessing(true); // Đánh dấu action đang thực thi
            try {
                await dispatch(
                    createUser({
                        username: formData.username,
                        email: formData.email,
                        password: formData.password,
                        image: "https://tse2.mm.bing.net/th?id=OIP.1yoSL-WO0YU5mQKROudvswHaHa&pid=Api&P=0&h=180",
                    })
                );
            } catch (error) {
                console.error("Error creating user:", error);
            } finally {
                setIsProcessing(false); // Kết thúc quá trình xử lý action
            }
        }
    };

    useEffect(() => {
        if (dataUser) {
            handleToast();
        }
    }, [dataUser]);
    const handleToast = (e) => {
        if (dataUser && dataUser.errCode === 0) {
            setFormData({
                email: "",
                password: "",
                username: "",
                confirmPassword: "",
            });
            navigate("/auth/login");
        } else if (dataUser && dataUser.errCode === 1) {
            toasts(`❌ ${dataUser.message}`);
            const param = dataUser.message.split(" ")[0];
            setFormData({
                ...formData,
                [param]: "",
            });
        }
    };
    return (
        <div className={cx("register__container")}>
            <div className={cx("register-background")}>
                <div className={cx("register-modal")}>
                    <div className={cx("modal__container")}>
                        <div className={cx("heading-wrapper")}>
                            <Image
                                src="https://tse4.mm.bing.net/th?id=OIP.h23BqCedgvIdElSpkuMOSAHaEK&pid=Api&P=0&h=180"
                                alt="logo"
                                width="80px"
                                height="60px"
                                className={cx("logo")}
                            />
                            <span className={cx("heading")}>ĐĂNG Kí</span>
                        </div>
                        <Form
                            cx={cx}
                            formData={formData}
                            formErrors={formErrors}
                            handleInputChange={handleInputChange}
                        />
                        <div className={cx("submit")}>
                            <button
                                type="submit"
                                className={cx("btn-submit")}
                                onClick={handleSubmit}
                                disabled={isProcessing}
                            >
                                {isProcessing ? "Đang xử lý..." : "Đăng Kí"}
                            </button>
                        </div>
                        <div className={cx("no__acount")}>
                            <span className={cx("title")}>
                                bạn đã có tài khoản?
                            </span>
                            <Link to="/auth/login">Đăng Nhập</Link>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer limit={4} />
        </div>
    );
}

export default Register;
