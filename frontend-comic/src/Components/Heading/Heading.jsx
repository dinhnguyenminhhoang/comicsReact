import classNames from "classnames/bind";
import styles from "./Heading.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { Col } from "react-bootstrap";
const cx = classNames.bind(styles);
function Heading(props) {
  return (
    <div>
      <Col md={12}>
        <div className={cx("heading")}>
          <FontAwesomeIcon icon={faStar} />
          <span>{props.heading}</span>
        </div>
      </Col>
    </div>
  );
}

export default Heading;
