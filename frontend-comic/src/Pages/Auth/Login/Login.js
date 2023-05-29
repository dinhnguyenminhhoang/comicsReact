import classNames from "classnames/bind";
import styles from "./Login.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { login } from "~/redux/slices/authSlices";
import { authLogin } from "~/redux/action/action";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import { Image } from "react-bootstrap";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import bcrypt from "bcryptjs";
import { Link, useNavigate } from "react-router-dom";

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
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  const dispatch = useDispatch();

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

  const validateForm = () => {
    let isValid = true;
    const errors = {};

    Object.entries(validationRules).forEach(([field, rules]) => {
      if (
        rules.required &&
        (!formData[field] || formData[field].trim() === "")
      ) {
        isValid = false;
        errors[field] = `${
          field.charAt(0).toUpperCase() + field.slice(1)
        } không được để trống`;
      }
      if (
        rules.pattern &&
        formData[field] &&
        !rules.pattern.test(formData[field])
      ) {
        isValid = false;
        errors[field] = rules.errorMessage;
      }
      if (
        rules.minLength &&
        formData[field] &&
        formData[field].length < rules.minLength
      ) {
        isValid = false;
        errors[field] = rules.errorMessage;
      }
      if (
        rules.hasSpecialChar &&
        formData[field] &&
        !/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/.test(formData[field])
      ) {
        isValid = false;
        errors[field] = rules.errorMessage;
      }

      if (
        rules.hasUpperCase &&
        formData[field] &&
        !/[A-Z]+/.test(formData[field])
      ) {
        isValid = false;
        errors[field] = rules.errorMessage;
      }
    });

    setFormErrors(errors);
    return isValid;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validateForm();
    if (isValid) {
    }
    dispatch(
      authLogin({
        email: formData.email,
        password: formData.password,
      })
    );
  };
  useEffect(() => {
    if (loginInfo) handleToast();
  }, [loginInfo]);
  const handleToast = () => {
    if (loginInfo && loginInfo.errCode === 0) {
      handleLogin();
      navigate("/");
    } else if (loginInfo && loginInfo.errCode === 1) {
      toast.error(`❌ đăng nhập thất bại`, {
        position: "top-right",
        autoClose: 2000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      toast.error(`❌ ${loginInfo.message}`, {
        position: "top-right",
        autoClose: 2000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
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
            <div className={cx("form__groups")}>
              <div className={cx("form")}>
                <input
                  value={formData.email}
                  onChange={handleInputChange}
                  type="text"
                  name="email"
                  className={cx("input--form")}
                  placeholder="Email"
                />
                <FontAwesomeIcon className={cx("icon")} icon={faUser} />
                {formErrors.email && (
                  <span className={cx("error-message")}>
                    {formErrors.email}
                  </span>
                )}
              </div>
              <div className={cx("form")}>
                <input
                  value={formData.password}
                  name="password"
                  onChange={handleInputChange}
                  type="password"
                  className={cx("input--form")}
                  placeholder="Password"
                />
                <FontAwesomeIcon className={cx("icon")} icon={faLock} />
                {formErrors.password && (
                  <span className={cx("error-message")}>
                    {formErrors.password}
                  </span>
                )}
              </div>
            </div>
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
