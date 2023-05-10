import { Col, Container, Row } from "react-bootstrap";
import Header from "./Header/Header.js";
import Sidebar from "./Sidebar/Sidebar";
import styles from "./DefaultLayout.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);
function DefaultLayout({ children }) {
  return (
    <div>
      <Row className={cx("cus-row")}>
        <Header />
        <div className={cx("content-wrapper")}>
          <Container>
            <div className={cx("cus-content")}>
              <Row>
                <Col md={3}>
                  <Sidebar />
                </Col>
                <Col md={9}>{children}</Col>
              </Row>
            </div>
          </Container>
        </div>
      </Row>
    </div>
  );
}

export default DefaultLayout;
