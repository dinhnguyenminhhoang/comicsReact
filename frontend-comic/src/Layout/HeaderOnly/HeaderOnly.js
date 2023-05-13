import { Container, Row, Col } from "react-bootstrap";
import classNames from "classnames/bind";
import Header from "../DefaultLayout/Header/Header";
import styles from "./HeaderOnly.module.scss";
const cx = classNames.bind(styles);
function HeaderOnly({ children }) {
  return (
    <div>
      <Header />
      <div className={cx("content-wrapper")}>
        <Container>
          <Row>
            {/* <Col md={4}>
              <Sidebar />
            </Col> */}
            <Col md={12}>{children}</Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default HeaderOnly;
