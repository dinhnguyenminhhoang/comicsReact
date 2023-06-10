import React, { useEffect, useState } from "react";
import { Table, Button, Form, Row, Col } from "react-bootstrap";
import classNames from "classnames/bind";
import styles from "./UserManager.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort } from "@fortawesome/free-solid-svg-icons";
import { getAllUser } from "~/redux/action/action";
import { useDispatch, useSelector } from "react-redux";
const cx = classNames.bind(styles);
const UserManage = (props) => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    roleId: "",
    image: "",
    password: "",
  });
  const [isUpdate, setIsUpdate] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  let [sortOrder, setSortOrder] = useState(true);
  const dispatch = useDispatch();
  let users = useSelector((state) => state.allUser.data);
  useEffect(() => {
    dispatch(getAllUser());
  }, [dispatch]);
  const sortedUsers = [...users].sort((a, b) => {
    if (sortOrder) {
      return a.id - b.id; // Sắp xếp tăng dần
    } else {
      return b.id - a.id; // Sắp xếp giảm dần
    }
  });
  const handleSort = () => {
    setSortOrder(!sortOrder);
  };
  const handleDeleteUser = (user) => {
    console.log("Deleting user with ID:", user);
  };

  const handleUpdateUser = (user) => {
    setIsUpdate(true);
    setFormData({
      email: user.email,
      username: user.username,
      image: user.image,
      roleId: user.roleId,
      password: user.password,
    });
  };
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setSelectedFile(URL.createObjectURL(file));
    if (file) {
      const blobUrl = URL.createObjectURL(file);
      setFormData({ ...formData, image: blobUrl });
    }
  };

  const handleRoleChange = (event) => {
    setFormData({ ...formData, roleId: event.target.value });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
    setFormData({
      email: "",
      username: "",
      roleId: "",
      image: "",
      password: "",
    });
  };
  return (
    <div className={cx("container")}>
      {isUpdate && (
        <>
          <h1 className={cx("mb-4", "header")}>
            cập nhật thông tin người dùng
          </h1>
          <div className={cx("from-container")}>
            <Row className={cx("mb-3")}>
              <Form.Group as={Col} controlId="email">
                <Form.Label>tên truyện:</Form.Label>
                <Form.Control
                  className={cx("form-control-lg")}
                  style={{ borderRadius: "10px" }}
                  type="text"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Nhập email"
                />
              </Form.Group>
              <Form.Group as={Col} controlId="username">
                <Form.Label>username</Form.Label>
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
            <Row className={cx("mb-3")}>
              <Form.Group as={Col} controlId="password">
                <Form.Label>password</Form.Label>
                <Form.Control
                  className={cx("form-control-lg", "disabled")}
                  style={{ borderRadius: "10px" }}
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Nhập password"
                  disabled
                />
              </Form.Group>
              <Form.Group as={Col} controlId="roleId">
                <Form.Label>Role</Form.Label>
                <Form.Select
                  size="lg"
                  onChange={handleRoleChange}
                  value={formData.roleId}
                >
                  <option value="">-- Chọn vai trò --</option>
                  <option value="R1">R1</option>
                  <option value="R2">R2</option>
                  <option value="R3">R3</option>
                </Form.Select>
              </Form.Group>
            </Row>
            <Row>
              <Form.Group controlId="formFileLg" className="mb-3" as={Col}>
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
        </>
      )}
      <h1 className={cx("mb-4", "header")}>QUẢN LÍ NGƯỜI DÙNG</h1>
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
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className={cx("table__method")}>
          {users &&
            sortedUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>
                  {user.roleId === "R1"
                    ? "user"
                    : user.roleId === "R2"
                    ? "manage"
                    : user.roleId === "R3"
                    ? "admin"
                    : ""}
                </td>
                <td>
                  <Button
                    className={cx("action-btn")}
                    variant="danger"
                    onClick={() => handleDeleteUser(user)}
                  >
                    Delete
                  </Button>
                  <Button
                    className={cx("action-btn")}
                    variant="primary"
                    onClick={() => handleUpdateUser(user)}
                  >
                    Update
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
};

export default UserManage;
