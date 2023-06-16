import classNames from "classnames/bind";
import styles from "./ModalUser.module.scss";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { updateUser, getUserInfo } from "~/redux/action/action";
import UploadAvata from "../UploadAvata/UploadAvata";
const cx = classNames.bind(styles);
function ModalUser(props) {
  const { userInfo, handleCloseFormParent } = props;
  const [formData, setFormData] = useState({
    ...userInfo
  });
  const [imageData, setImageData] = useState(userInfo.image);
  const dispatch = useDispatch()
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSetImage = (image) => {
    setImageData(image);
    setFormData({ ...formData, image: image });
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(updateUser({
      id: formData.id,
      email: formData.email,
      username: formData.username,
      image: formData.image,
      roleId: formData.roleId || "R3",
    })).then(() => {
      dispatch(getUserInfo(userInfo.email));
    })
    setFormData({
      email: "",
      image: "",
      username: "",
    })
    handleCloseFormParent(true);
  };
  const handleClose = () => {
    handleCloseFormParent(true);
  }
  return (
    <div className={cx("modal-container")}>
      <div className={cx("modal-user")}>
        <div className={cx("close")} onClick={handleClose}>
          <FontAwesomeIcon icon={faClose} />
        </div>
        {userInfo && (
          <div className={cx("container")}>
            <h1 className={cx("mb-4", "header")}>
              {imageData && (
                <img className={cx("modal__image")} src={imageData} alt="" width={100} height={100} style={{ objectFit: "cover", borderRadius: "999px" }} />
              )}</h1>
            <div className={cx("from-container")}>
              <Row className={cx("mb-3")}>
                <Form.Group as={Col} controlId="username">
                  <Form.Label>username:</Form.Label>
                  <Form.Control
                    className={cx("form-control-lg")}
                    style={{ borderRadius: "10px" }}
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    placeholder="Nhập username"
                  />
                </Form.Group>
              </Row>
              {/* <Row className={cx("mb-3")}>
                <Form.Group as={Col} controlId="email">
                  <Form.Label>Email:</Form.Label>
                  <Form.Control
                    className={cx("form-control-lg")}
                    style={{ borderRadius: "10px" }}
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Nhập email"
                    disabled
                  />
                </Form.Group>
              </Row>
              <Row className={cx("mb-3")}>
                <Form.Group as={Col} controlId="password">
                  <Form.Label>Mật khẩu:</Form.Label>
                  <Form.Control
                    className={cx("form-control-lg")}
                    style={{ borderRadius: "10px" }}
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Nhập mật khẩu"
                    disabled
                  />
                </Form.Group>
              </Row> */}
              <Row className={cx("mb-3")}>
                <UploadAvata handleSetImage={handleSetImage} />
              </Row>
              <Form onSubmit={handleSubmit}>
                {/* Các trường dữ liệu */}
                <Row className="justify-content-center">
                  <Col sm={2}>
                    <Button variant="primary" type="submit" className="w-100">
                      chỉnh sửa
                    </Button>
                  </Col>
                </Row>
              </Form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ModalUser;
