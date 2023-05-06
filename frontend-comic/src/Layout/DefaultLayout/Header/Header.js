import classNames from "classnames/bind";
import Styles from "./Header.module.scss"
import { Container, Image } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightToBracket, faCashRegister, faRegistered, faSearch } from '@fortawesome/free-solid-svg-icons'
const cx = classNames.bind(Styles);
function Header() {
    return (<div className={cx("header-wrapper")}>
        <Container className={cx("container")}>
            <div className={cx("logo")}>
                <Image src="https://www.truyenqq.com.vn/assets/images/logo-icon.png" alt="logo" />
            </div>
            <div className={cx("nav-container")}>
                <ul className={cx("nav-list")}>
                    <li className={cx("nav-item")}>Truyện Tranh</li>
                    <li className={cx("nav-item")}>Truyện chữ</li>
                    <li className={cx("nav-item")}>Tiểu thuyết</li>
                    <li className={cx("nav-item")}>Truyện ngắn</li>
                    <li className={cx("nav-item")}>Truyện ngắn</li>
                    <li className={cx("nav-item")}>Kinh dị</li>
                </ul>
            </div>
            <div className={cx("search-box")}>
                <div className={cx("input-search")}>
                    <input type="text" placeholder="BẠN MUỐN TÌM CHUYỆN GÌ ?" />
                    <button className={cx("icon-btn-search")} >
                        <FontAwesomeIcon icon={faSearch} />
                    </button>
                </div>
            </div>
            <div className={cx("auth")}>
                <button className={cx("register-btn")}>
                    Đăng kí</button>
                <button className={cx("login-btn")}>
                    Đăng nhập</button>
            </div>
        </Container>
    </div>);
}

export default Header;