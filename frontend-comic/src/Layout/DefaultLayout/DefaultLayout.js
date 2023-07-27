import { Col, Container, Row } from "react-bootstrap";
import { Helmet } from "react-helmet";
import { icon } from "~/assets/images";
import Header from "./Header/Header";
import Sidebar from "./Sidebar/Sidebar";
import styles from "./DefaultLayout.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);
function DefaultLayout({ children }) {
    return (
        <div>
            <Helmet>
                <meta charSet="utf-8" />
                <title>truyện hay</title>
                <link rel="icon" href={icon} />
            </Helmet>
            <Row className={cx("cus-row")}>
                <Header />
                <div className={cx("content-wrapper")}>
                    <Container className={cx("container")}>
                        <div className={cx("cus-content")}>
                            <Row>
                                <Col md={2}>
                                    <Sidebar />
                                </Col>
                                <Col md={10}>{children}</Col>
                            </Row>
                        </div>
                    </Container>
                </div>
            </Row>
        </div>
    );
}

export default DefaultLayout;
