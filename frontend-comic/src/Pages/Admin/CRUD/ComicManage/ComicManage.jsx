import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import classNames from "classnames/bind";
import styles from "./ComicManage.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { getAllComic, deleteComic } from "~/redux/action/action";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort } from "@fortawesome/free-solid-svg-icons";
import Create from "./Create/Create";
import Update from "./Update/Update";
const cx = classNames.bind(styles);
const ComicManage = () => {
  let [sortOrder, setSortOrder] = useState(true);
  let [isUpdate, setIsUpdate] = useState(false);
  let [allComic, setAllComic] = useState(null);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    author: "",
    description: "",
    image: "",
    nickName: "",
  });
  const dispatch = useDispatch();
  const comicData = useSelector((state) => state.allComic.data);
  useEffect(() => {
    dispatch(getAllComic());
  }, [dispatch]);

  useEffect(() => {
    if (comicData) {
      setAllComic(comicData);
    }
  }, [comicData]);
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
  const handleDeleteComic = (comicId) => {
    dispatch(deleteComic(comicId)).then(() => {
      dispatch(getAllComic());
    });
  };
  const handleSetIsUpdate = (isUpdate) => {
    setIsUpdate(isUpdate);
  };
  const handleGetInfoComicByserver = (comic) => {
    setFormData({
      id: comic.id,
      name: comic.name,
      author: comic.author,
      description: comic.description,
      nickName: comic.nickName,
      image: comic.image,
    });
    setIsUpdate(true);
  };
  return (
    <div className={cx("container")}>
      {!isUpdate ? (
        <Create />
      ) : (
        <Update
          formData={formData}
          handleSetIsUpdate={handleSetIsUpdate}
          isUpdate={isUpdate}
        />
      )}
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
            {allComic &&
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
                      onClick={() => handleDeleteComic(comic.id)}
                    >
                      Delete
                    </Button>
                    <Button
                      className={cx("action-btn")}
                      variant="primary"
                      onClick={() => handleGetInfoComicByserver(comic)}
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
