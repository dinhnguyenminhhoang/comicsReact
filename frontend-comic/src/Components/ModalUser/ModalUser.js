import classNames from "classnames/bind";
import styles from "./ModalUser.module.scss";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCancel, faClose } from "@fortawesome/free-solid-svg-icons";
const cx = classNames.bind(styles);
function ModalUser(props) {
  const { userInfo, handleCloseFormParent } = props;
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    image: "",
  });
  const [selectedFile, setSelectedFile] = useState(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setSelectedFile(URL.createObjectURL(file));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    // Xử lý logic khi người dùng nhấn nút "Submit"
    console.log(formData);
    // Reset form
    setFormData({
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
      image: "",
    });
  };
  const handleClose = () => {
    handleCloseFormParent(true);
  };
  return (
    <div className={cx("modal-container")}>
      <div className={cx("modal-user")}>
        <div className={cx("close")} onClick={handleClose}>
          <FontAwesomeIcon icon={faClose} />
        </div>
        {userInfo && (
          <div className={cx("container")}>
            <h1 className={cx("mb-4", "header")}>Chỉnh sửa thông tin</h1>
            <div className={cx("from-container")}>
              <Row className={cx("mb-3")}>
                <Form.Group as={Col} controlId="username">
                  <Form.Label>username:</Form.Label>
                  <Form.Control
                    className={cx("form-control-lg")}
                    style={{ borderRadius: "10px" }}
                    type="text"
                    name="username"
                    value={formData.username || userInfo.username}
                    onChange={handleInputChange}
                    placeholder="Nhập username"
                  />
                </Form.Group>
              </Row>
              <Row className={cx("mb-3")}>
                <Form.Group as={Col} controlId="email">
                  <Form.Label>Email:</Form.Label>
                  <Form.Control
                    className={cx("form-control-lg")}
                    style={{ borderRadius: "10px" }}
                    type="email"
                    name="email"
                    value={formData.email || userInfo.email}
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
                <Form.Group as={Col} controlId="confirmPassword">
                  <Form.Label>confirm password:</Form.Label>
                  <Form.Control
                    className={cx("form-control-lg")}
                    style={{ borderRadius: "10px" }}
                    type="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="confirm password"
                    disabled
                  />
                </Form.Group>
              </Row>
              <Row className={cx("mb-3")}>
                <Form.Group controlId="formFileLg" className="mb-3">
                  <Form.Label>upload avata</Form.Label>
                  <Form.Control
                    type="file"
                    size="lg"
                    onChange={handleFileUpload}
                  />
                </Form.Group>
                {selectedFile && (
                  <div>
                    <img
                      src={selectedFile}
                      alt="avatar"
                      className={cx("modal__image")}
                    />
                  </div>
                )}
              </Row>
              <Form onSubmit={handleSubmit}>
                {/* Các trường dữ liệu */}
                <Row className="justify-content-center">
                  <Col sm={2}>
                    <Button variant="primary" type="submit" className="w-100">
                      Thêm mới
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
