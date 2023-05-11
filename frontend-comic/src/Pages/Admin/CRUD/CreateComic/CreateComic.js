import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import classNames from "classnames/bind";
import styles from "./CreateComic.module.scss";
const cx = classNames.bind(styles);
const CreateComic = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    description: "",
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
      description: "",
      phoneNumber: "",
      gender: "",
      image: "",
      roleId: "",
    });
  };

  return (
    <div className={cx("container")}>
      <h1 className={cx("mb-4", "header")}>Thêm mới truyện</h1>
      <Form onSubmit={handleSubmit} className={cx("from-container")}>
        <Row className={cx("mb-3")}>
          <Form.Group as={Col} controlId="title">
            <Form.Label>tên truyện:</Form.Label>
            <Form.Control
              className={cx("form-control-lg")}
              style={{ borderRadius: "10px" }}
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Nhập tên truyện"
            />
          </Form.Group>
          <Form.Group as={Col} controlId="author">
            <Form.Label>Tên tác giả:</Form.Label>
            <Form.Control
              className={cx("form-control-lg")}
              style={{ borderRadius: "10px" }}
              type="text"
              name="author"
              value={formData.author}
              onChange={handleInputChange}
              placeholder="Nhập tên tác giả"
            />
          </Form.Group>
        </Row>
        <Row className={cx("mb-3")}>
          <Form.Group className={cx("mb-3")} controlId="description">
            <Form.Label>Mô tả truyện:</Form.Label>
            <Form.Control
              as="textarea"
              className={cx("form-control-lg")}
              style={{ borderRadius: "10px" }}
              type="text"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Nhập mô tả"
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
      </Form>
    </div>
  );
};

export default CreateComic;
