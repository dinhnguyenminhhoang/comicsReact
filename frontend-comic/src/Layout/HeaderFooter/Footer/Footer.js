import classNames from "classnames/bind";
import { Container, Row, Col } from "react-bootstrap";
import {
    faFacebookF,
    faGithub,
    faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import styles from "./Footer.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faEnvelope,
    faLocationDot,
    faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { logo } from "~/assets/images";
const cx = classNames.bind(styles);
function Footer() {
    return (
        <>
            <footer className={cx("footer")}>
                <Container>
                    <Row>
                        <Col md={3} xs={2} className={cx("info")}>
                            <img
                                src={logo}
                                alt=""
                                className={cx("img-fluid", "logo-footer")}
                            />

                            <div className={cx("footer-about")}>
                                <p>
                                    Đây là website xây dựng bởi Đinh Nguyễn MInh
                                    Hoàng với Mục đích học tập
                                </p>
                            </div>
                        </Col>
                        <Col md={3} xs={4}>
                            <div className={cx("social-links")}>
                                <h2>Follow me</h2>
                                <ul className={cx("social-icons")}>
                                    <a href="https://www.facebook.com/dinhnguyenminhhoang">
                                        <li>
                                            <FontAwesomeIcon
                                                className={cx("footer-icon")}
                                                icon={faFacebookF}
                                            />
                                            Facebook
                                        </li>
                                    </a>
                                    <li>
                                        <FontAwesomeIcon
                                            className={cx("footer-icon")}
                                            icon={faInstagram}
                                        />
                                        Instagram
                                    </li>
                                    <a href="https://github.com/dinhnguyenminhhoang">
                                        <li>
                                            <FontAwesomeIcon
                                                className={cx("footer-icon")}
                                                icon={faGithub}
                                            />
                                            Github
                                        </li>
                                    </a>
                                </ul>
                            </div>
                        </Col>
                        <Col md={3} xs={4}>
                            <div className={cx("address")}>
                                <h2>Address</h2>
                                <ul className={cx("address-links")}>
                                    <li className={cx("address1")}>
                                        <FontAwesomeIcon
                                            className={cx("footer-icon")}
                                            icon={faLocationDot}
                                        />
                                        Thủ Đức Thành Phố Hồ Chí Minh
                                    </li>
                                    <li>
                                        <FontAwesomeIcon
                                            className={cx("footer-icon")}
                                            icon={faPhone}
                                        />
                                        +84 33797234X
                                    </li>
                                    <li>
                                        <FontAwesomeIcon
                                            className={cx("footer-icon")}
                                            icon={faEnvelope}
                                        />
                                        dinhnguyenminhhoang
                                    </li>
                                </ul>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </footer>
        </>
    );
}

export default Footer;
