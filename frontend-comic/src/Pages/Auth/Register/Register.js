import classNames from "classnames/bind";
import styles from "./Register.module.scss";
import { createUser } from "~/redux/action/action";
import { Link, useNavigate } from "react-router-dom";
import { Image } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
const cx = classNames.bind(styles);
// if (err) {
//   reject({
//     errCode: 1,
//     message: "password not found",
//   });
//   return;
// } else
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
        rules.maxLength &&
        formData[field] &&
        formData[field].length > rules.maxLength
      ) {
        isValid = false;
        errors[field] = rules.errorMessage;
      }
      if (rules.matchField && formData[field] !== formData[rules.matchField]) {
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validateForm();

    if (isValid) {
      setIsProcessing(true); // Đánh dấu action đang thực thi
      try {
        await dispatch(
          createUser({
            username: formData.username,
            email: formData.email,
            password: formData.password,
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
  const handleToast = () => {
    console.log(dataUser);
    if (dataUser && dataUser.errCode === 0) {
      setFormData({
        email: "",
        password: "",
        username: "",
        confirmPassword: "",
      });
      navigate("/auth/login");
    } else if (dataUser && dataUser.errCode === 1) {
      toast.error(`❌ ${dataUser.message}`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
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
            <div className={cx("form__groups")}>
              <div className={cx("form")}>
                <input
                  type="text"
                  className={cx("input--form")}
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  name="email"
                />
                {formErrors.email && (
                  <span className={cx("error-message")}>
                    {formErrors.email}
                  </span>
                )}
              </div>
              <div className={cx("form")}>
                <input
                  type="text"
                  className={cx("input--form")}
                  placeholder="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  name="username"
                />
                {formErrors.username && (
                  <span className={cx("error-message")}>
                    {formErrors.username}
                  </span>
                )}
              </div>
            </div>
            <div className={cx("form__groups")}>
              <div className={cx("form")}>
                <input
                  type="password"
                  className={cx("input--form")}
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                  name="password"
                />
                {formErrors.password && (
                  <span className={cx("error-message")}>
                    {formErrors.password}
                  </span>
                )}
              </div>
              <div className={cx("form")}>
                <input
                  type="password"
                  className={cx("input--form")}
                  placeholder="confirm Password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                />
                {formErrors.confirmPassword && (
                  <span className={cx("error-message")}>
                    {formErrors.confirmPassword}
                  </span>
                )}
              </div>
            </div>
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
              <span className={cx("title")}>bạn đã có tài khoản?</span>
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
