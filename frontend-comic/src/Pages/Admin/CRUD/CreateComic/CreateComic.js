import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import classNames from "classnames/bind";
import styles from "./CreateComic.module.scss";
import { useDispatch } from "react-redux";
import { fetchCreateComic } from "../../../../redux/action/action";
import { ToastContainer, toast } from "react-toastify";
const cx = classNames.bind(styles);
const CreateComic = () => {
  const [formData, setFormData] = useState({
    name: "",
    author: "",
    description: "",
    image: "",
  });
  const dispatch = useDispatch();
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const requiredFields = ["name", "author", "description", "image"];
    const isAllFieldsFilled = requiredFields.every(
      (field) => formData[field].trim() !== ""
    );
    if (!isAllFieldsFilled) {
      toast.warning("😅 vui lòng nhập đầy đủ thông tin", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    } else {
      toast.success("🤩 thêm truyện thành công", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      dispatch(
        fetchCreateComic({
          name: formData.name,
          author: formData.author,
          description: formData.description,
          image: formData.image,
        })
      );
      setFormData({
        name: "",
        author: "",
        description: "",
        image: "",
      });
    }
  };

  return (
    <div className={cx("container")}>
      <h1 className={cx("mb-4", "header")}>Thêm mới truyện</h1>
      <div className={cx("from-container")}>
        <Row className={cx("mb-3")}>
          <ToastContainer limit={4} />
          <Form.Group as={Col} controlId="name">
            <Form.Label>tên truyện:</Form.Label>
            <Form.Control
              className={cx("form-control-lg")}
              style={{ borderRadius: "10px" }}
              type="text"
              name="name"
              value={formData.name}
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
          <Form.Group className={cx("mb-3")} controlId="url">
            <Form.Label>URL image truyện:</Form.Label>
            <Form.Control
              className={cx("form-control-lg")}
              style={{ borderRadius: "10px" }}
              type="text"
              name="image"
              value={formData.image}
              onChange={handleInputChange}
              placeholder="Nhập  URL name"
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
      </div>
    </div>
  );
};

export default CreateComic;
