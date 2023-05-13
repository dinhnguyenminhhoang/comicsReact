import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import classNames from "classnames/bind";
import styles from "./CreateUser.module.scss";
const cx = classNames.bind(styles);
const CreateUser = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    address: "",
    phoneNumber: "",
    gender: "",
    image: "",
    roleId: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Xử lý logic khi người dùng nhấn nút "Submit"
    console.log(formData);
    // Reset form
    setFormData({
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      address: "",
      phoneNumber: "",
      gender: "",
      image: "",
      roleId: "",
    });
  };

  return (
    <div className={cx("container")}>
      <h1 className={cx("mb-4", "header")}>Thêm mới người dùng</h1>
      <div className={cx("from-container")}>
        <Row className={cx("mb-3")}>
          <Form.Group as={Col} controlId="firstName">
            <Form.Label>Họ:</Form.Label>
            <Form.Control
              className={cx("form-control-lg")}
              style={{ borderRadius: "10px" }}
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              placeholder="Nhập họ"
            />
          </Form.Group>
          <Form.Group as={Col} controlId="lastName">
            <Form.Label>Tên:</Form.Label>
            <Form.Control
              className={cx("form-control-lg")}
              style={{ borderRadius: "10px" }}
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              placeholder="Nhập tên"
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
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Nhập email"
            />
          </Form.Group>
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
            />
          </Form.Group>
          <Form.Group className={cx("mb-3")} controlId="address">
            <Form.Label>Địa chỉ:</Form.Label>
            <Form.Control
              as="textarea"
              className={cx("form-control-lg")}
              style={{ borderRadius: "10px" }}
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Nhập địa chỉ"
            />
          </Form.Group>
          <Form.Group className={cx("mb-3")} controlId="phoneNumber">
            <Form.Label>Số điện thoại:</Form.Label>
            <Form.Control
              className={cx("form-control-lg")}
              style={{ borderRadius: "10px" }}
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              placeholder="Nhập số điện thoại"
            />
          </Form.Group>
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
  );
};

export default CreateUser;
