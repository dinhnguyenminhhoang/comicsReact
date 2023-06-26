import classNames from "classnames/bind";
import styles from "./Comment.modle.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComments,
  faEllipsisVertical,
  faFlag,
  faGears,
  faPaperPlane,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import {
  getAllComments,
  createComment,
  deleteComment,
  updateComment,
} from "~/redux/action/action";
import { Button } from "react-bootstrap";

const cx = classNames.bind(styles);
function Comment(props) {
  const [showTask, setShowTask] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [formData, setFormData] = useState({ update: "", comment: "" });
  const [commentId, setCommentId] = useState(null);
  const { comicId } = props;
  const dispatch = useDispatch();
  const allComments = useSelector((state) => state.allComments.data);
  const userInfo = useSelector((state) => state.userInfo.data);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const inputUpdateRef = useRef();
  useEffect(() => {
    dispatch(getAllComments(comicId));
  }, [dispatch, comicId]);

  const handleOnchane = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCreateComment = () => {
    if (formData.comment.trim())
      dispatch(
        createComment({
          userId: userInfo.user.id,
          comicId: comicId,
          comment: formData.comment,
        })
      )
        .then(() => {
          dispatch(getAllComments(comicId));
        })
        .catch((error) => {
          console.log("Error creating comment:", error);
        });
    setFormData({ comment: "", update: "" });
  };
  const handleCreateCommentWithKeyPress = (e) => {
    if (e.key === "Enter") handleCreateComment();
  };

  const handleShowTask = () => {
    setShowTask(true);
  };
  const handleDeleteComment = (id) => {
    if (id) {
      dispatch(deleteComment(id)).then(() => {
        dispatch(getAllComments(comicId));
      });
    }
    setShowTask(false);
  };
  const handleUpdateComment = (id, comment) => {
    if (id) {
      setFormData({ ...formData, update: comment });
      setCommentId(id);
      setIsUpdate(true);
      handleFocus();
    }
    setShowTask(false);
  };
  const handleFocus = () => {
    if (inputUpdateRef && inputUpdateRef.current)
      inputUpdateRef.current.focus();
  };
  useEffect(() => {
    handleFocus();
  }, [commentId, isUpdate]);
  const handleSaveUpdate = (id) => {
    if (id) {
      dispatch(
        updateComment({
          id: id,
          comment: formData.update,
        })
      )
        .then(() => {
          dispatch(getAllComments(comicId));
        })
        .catch((error) => {
          console.log("Error creating comment:", error);
        });
    }
    setIsUpdate(false);
  };
  const handleUpdateCommentWithKeyPress = (e) => {
    if (e.key === "Enter") handleSaveUpdate(commentId);
  };
  return (
    <div className={cx("comment__wrapper")}>
      <div className={cx("heading")}>
        <div className={cx("heading__title")}>
          <FontAwesomeIcon icon={faComments} className={cx("heading__icon")} />
          <span className={cx("heading__content")}>Comments</span>
        </div>
        <div className={cx("sort__comment")}>
          <span className={cx("sort__heading")}>sắp xếp</span>
        </div>
      </div>
      {isLoggedIn && userInfo?.user && (
        <div className={cx("account__comment")}>
          <img
            src={userInfo.user.image}
            alt=""
            className={cx("accout__avata")}
          />
          <div className={cx("comment_area")}>
            <textarea
              placeholder="Nhập nội dung muốn bình luận"
              className={cx("comment__content")}
              value={formData.comment}
              name="comment"
              onChange={handleOnchane}
              onKeyDown={handleCreateCommentWithKeyPress}
            />
            <button
              className={cx("send__comment")}
              onClick={handleCreateComment}
            >
              <FontAwesomeIcon
                icon={faPaperPlane}
                style={{ paddingRight: "4px" }}
              />
              send
            </button>
          </div>
        </div>
      )}
      <div className={cx("list__comment")}>
        <ul>
          {allComments?.data?.map((user, index) => (
            <li className={cx("list__item")} key={index}>
              <img src={user.image} alt="" className={cx("item__avata")} />
              <div className={cx("item__info")}>
                <span className={cx("info__name")}>{user.username}</span>
                {!isUpdate || commentId !== user.comments.id ? (
                  <span className={cx("info__content")}>
                    {user.comments.comment}
                  </span>
                ) : commentId && commentId === user.comments.id ? (
                  <div>
                    <input
                      className={cx("update_content")}
                      type="TEXT"
                      name="update"
                      value={formData.update}
                      onChange={handleOnchane}
                      onKeyDown={handleUpdateCommentWithKeyPress}
                      ref={inputUpdateRef}
                    />
                    <div>
                      <Button
                        className="update-btn"
                        variant="outline-success"
                        onClick={() => handleSaveUpdate(user.comments.id)}
                      >
                        lưu
                      </Button>
                      <Button
                        className="update-btn"
                        variant="outline-danger"
                        onClick={() => setIsUpdate(false)}
                      >
                        hủy
                      </Button>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
              {isLoggedIn && userInfo?.user && (
                <div className={cx("task__wrapper")}>
                  {showTask && (
                    <div
                      className={cx("task__comment")}
                      onMouseLeave={() => setShowTask(false)}
                    >
                      {userInfo.user.id === user.id ||
                      userInfo.user.roleId === "R3" ? (
                        <ul className={cx("task__list")}>
                          <li
                            className={cx("task__item")}
                            onClick={() =>
                              handleDeleteComment(user.comments.id)
                            }
                          >
                            <FontAwesomeIcon icon={faTrash} /> Xóa
                          </li>
                          <li
                            className={cx("task__item")}
                            onClick={() =>
                              handleUpdateComment(
                                user.comments.id,
                                user.comments.comment
                              )
                            }
                          >
                            <FontAwesomeIcon icon={faGears} /> sửa
                          </li>

                          <li className={cx("task__item")}>
                            <FontAwesomeIcon icon={faFlag} />
                            báo cáo
                          </li>
                        </ul>
                      ) : (
                        <ul className={cx("task__list")}>
                          <li className={cx("task__item")}>
                            <FontAwesomeIcon icon={faFlag} />
                            báo cáo
                          </li>
                        </ul>
                      )}
                    </div>
                  )}
                  <button
                    className={cx("delete__comment")}
                    onClick={() => handleShowTask()}
                  >
                    <FontAwesomeIcon
                      icon={faEllipsisVertical}
                      style={{ paddingRight: "4px" }}
                    />
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Comment;
