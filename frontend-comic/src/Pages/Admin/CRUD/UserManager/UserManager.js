import React, { useEffect, useState } from "react";
import { Table, Button, Form, Row, Col } from "react-bootstrap";
import classNames from "classnames/bind";
import styles from "./UserManager.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort } from "@fortawesome/free-solid-svg-icons";
import { getAllUser, updateUser, getUserInfo, deleteUser } from "~/redux/action/action";
import { useDispatch, useSelector } from "react-redux";
import UploadAvata from "~/Components/UploadAvata/UploadAvata";
import coverBase64ToBlob from "~/utils/coverBase64ToBlob";
const cx = classNames.bind(styles);
const UserManage = () => {
  const [formData, setFormData] = useState({
    id: "",
    email: "",
    username: "",
    roleId: "",
    image: "",
    password: "",
  });
  let users = useSelector((state) => state.allUser.data);
  const [isUpdate, setIsUpdate] = useState(false);
  const [selectedFile, setSelectedFile] = useState();
  let [sortOrder, setSortOrder] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllUser());
  }, [dispatch]);
  const sortedUsers = [...users].sort((a, b) => {
    if (sortOrder) {
      return a.id - b.id;
    } else {
      return b.id - a.id;
    }
  });
  const handleSort = () => {
    setSortOrder(!sortOrder);
  };
  const handleDeleteUser = (user) => {
    dispatch(deleteUser(user.id)).then(() => {
      dispatch(getAllUser())
    });
  };

  const handleUpdateUser = (user) => {
    setSelectedFile(user.image)
    setIsUpdate(true);
    setFormData({
      id: user.id,
      email: user.email,
      username: user.username,
      image: user.image,
      roleId: user.roleId,
      password: user.password,
    });
  };
  const handleRoleChange = (event) => {
    setFormData({ ...formData, roleId: event.target.value });
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSetImage = (image) => {
    setFormData({ ...formData, image: image });
    setSelectedFile(coverBase64ToBlob(image))
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
      dispatch(getUserInfo(formData.email))
    })
      .then(() => { dispatch(getAllUser()) });
    setFormData({
      email: "",
      image: "",
      username: "",
      roleId: "",
      id: ""
    })
    setIsUpdate(false)
  };
  return (
    <div className={cx("container")}>
      {isUpdate && (
        <>
          <h1 className={cx("mb-4", "header")}>
            cập nhật thông tin người dùng
          </h1>
          <div className={cx("from-container")} >
            {selectedFile && (
              <div style={{
                display: "flex", justifyContent: "center", margin: "18px 0"
              }}>
                < img
                  src={selectedFile}
                  alt="avatar"
                  className={cx("modal__image")}
                  style={{ height: "100px", width: "100px", objectFit: "cover", borderRadius: "999px" }}
                />
              </div>
            )}
            <Row className={cx("mb-3")}>
              <Form.Group as={Col} controlId="email">
                <Form.Label>email:</Form.Label>
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
                <UploadAvata handleSetImage={handleSetImage} />
              </Form.Group>
            </Row>
            <Form onSubmit={handleSubmit}>
              <Row className="justify-content-center">
                <Col sm={2}>
                  <Button variant="primary" type="submit" className="w-100">
                    Lưu thay đổi
                  </Button>
                </Col>
              </Row>
            </Form>
          </div>
        </>
      )
      }
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
    </div >
  );
};

export default UserManage;
