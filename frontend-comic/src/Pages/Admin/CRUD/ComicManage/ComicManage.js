import React, { useEffect, useState } from "react";
import { Form, Button, Row, Col, Table, FormLabel } from "react-bootstrap";
import classNames from "classnames/bind";
import styles from "./ComicManage.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { fetchCreateComic, getAllComic } from "../../../../redux/action/action";
import { ToastContainer, toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort } from "@fortawesome/free-solid-svg-icons";
import CreateCategoryForComic from "../CreateCategoryForComic/CreateCategoryForComic";
import { Label } from "recharts";
const cx = classNames.bind(styles);
const ComicManage = () => {
  let [sortOrder, setSortOrder] = useState(true);
  let [isUpdate, setIsUpdate] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    author: "",
    description: "",
    image: "",
    nickName: "",
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const comicData = useSelector((state) => state.allComic.data);
  const categories = useSelector((state) => state.categoryApi.data);
  const dispatch = useDispatch();
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  useEffect(() => {
    dispatch(getAllComic());
  }, [dispatch]);
  const sortedComicData = [...comicData].sort((a, b) => {
    if (sortOrder) {
      return a.id - b.id;
    } else {
      return b.id - a.id;
    }
  });
  const handleSort = () => {
    setSortOrder(!sortOrder);
  };
  const handleDeleteComic = (comic) => {};

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setSelectedFile(URL.createObjectURL(file));
  };
  const handleUpdateComic = (comic) => {
    setIsUpdate(true);
    setFormData({
      name: comic.name,
      author: comic.author,
      description: comic.description,
      nickName: comic.nickName,
      image: comic.image,
    });
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
          nickName: formData.nickName || "đang cập nhật",
        })
      );
      setFormData({
        name: "",
        author: "",
        description: "",
        image: "",
        nickName: "",
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
          <Form.Group as={Col} controlId="nickName">
            <Form.Label>Tên khác:</Form.Label>
            <Form.Control
              className={cx("form-control-lg")}
              style={{ borderRadius: "10px" }}
              type="text"
              name="nickName"
              value={formData.nickName}
              onChange={handleInputChange}
              placeholder="Nhập tên khác"
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
        <Row className={cx("mb-3")}>
          <Form.Group controlId="formFileLg" className="mb-3">
            <Form.Label>upload avata</Form.Label>
            <Form.Control type="file" size="lg" onChange={handleFileUpload} />
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
        {comicData && isUpdate && (
          <Row>
            <FormLabel>chọn thể loại</FormLabel>
            <CreateCategoryForComic
              comicData={comicData}
              categories={categories}
            />
          </Row>
        )}
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
      <div className={cx("container-manage")}>
        <h1 className={cx("mb-4", "header")}>QUẢN LÍ TRUYỆN ĐÃ THÊM</h1>
        <Table bordered className={cx("table")}>
          <thead className={cx("table__method")}>
            <tr>
              <th>
                ID
                <FontAwesomeIcon
                  icon={faSort}
                  onClick={handleSort}
                  cursor="pointer"
                  className={cx("table__icon")}
                />
              </th>
              <th>tên</th>
              <th>tác giả</th>
              <th>lượt xem</th>
              <th>trạng thái</th>
              <th>action</th>
            </tr>
          </thead>
          <tbody className={cx("table__method")}>
            {comicData &&
              sortedComicData.map((comic) => (
                <tr key={comic.id}>
                  <td>{comic.id}</td>
                  <td className={cx("name__comic")}>{comic.name}</td>
                  <td width={150}>{comic.author}</td>
                  <td>{comic.views}</td>
                  <td>{comic.status || "đang cập nhật"}</td>
                  <td>
                    <Button
                      className={cx("action-btn")}
                      variant="danger"
                      onClick={() => handleDeleteComic(comic)}
                    >
                      Delete
                    </Button>
                    <Button
                      className={cx("action-btn")}
                      variant="primary"
                      onClick={() => handleUpdateComic(comic)}
                    >
                      Update
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default ComicManage;
