import { Col, Container, Row } from "react-bootstrap";
import Header from "./Header/Header.js"
// import Sidebar from "./Sidebar/Sidebar"
import styles from "./DefaultLayout.module.scss"
import classNames from "classnames/bind";
const cx = classNames.bind(styles);
function DefaultLayout({ children }) {
    return (<div>
        <Row>
            <Header />
            <div className={cx("content-wrapper")}>
                <Container>
                    <Row>
                        {/* <Col md={4}>
                            <Sidebar />
                        </Col> */}
                        <Col md={12}>
                            {children}
                        </Col>
                    </Row>
                </Container>
            </div>
        </Row>
    </div>);
}

export default DefaultLayout;