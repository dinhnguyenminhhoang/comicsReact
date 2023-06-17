import { Container, Row, Col } from "react-bootstrap";
import classNames from "classnames/bind";
import { Helmet } from "react-helmet";
import { icon } from "~/assets/images";
import Footer from "./Footer/Footer";
import Header from "../DefaultLayout/Header/Header";
import styles from "./HeaderFooter.module.scss";
const cx = classNames.bind(styles);
function HeaderFooter({ children }) {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>truyện hay</title>
        <link rel="icon" href={icon} />
      </Helmet>
      <Header />
      <div className={cx("content-wrapper")}>
        <Container>
          <Row>
            <Col md={12}>{children}</Col>
          </Row>
        </Container>
      </div>
      <Footer />
    </div>
  );
}

export default HeaderFooter;
