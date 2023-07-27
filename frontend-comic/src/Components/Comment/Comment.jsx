import classNames from "classnames/bind";
import styles from "./Comment.modle.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import {
    getAllComments,
    createComment,
    deleteComment,
    updateComment,
} from "~/redux/action/action";
import ActionComment from "./ActionComment";
import Post from "./Post";
import CreateComment from "./CreateComment";
import Heading from "./Heading";

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

    const handleOnMouseLeave = () => {
        setShowTask(false);
    };
    return (
        <div className={cx("comment__wrapper")}>
            <Heading cx={cx} />
            {isLoggedIn && userInfo?.user && (
                <CreateComment
                    cx={cx}
                    formData={formData}
                    userInfo={userInfo}
                    handleOnchane={handleOnchane}
                    handleCreateComment={handleCreateComment}
                    handleCreateCommentWithKeyPress={
                        handleCreateCommentWithKeyPress
                    }
                />
            )}
            <div className={cx("list__comment")}>
                <ul>
                    {allComments?.data?.map((user, index) => (
                        <li className={cx("list__item")} key={index}>
                            <img
                                src={user.image}
                                alt=""
                                className={cx("item__avata")}
                            />
                            <div className={cx("item__info")}>
                                <span className={cx("info__name")}>
                                    {user.username}
                                </span>
                                {!isUpdate || commentId !== user.comments.id ? (
                                    <span className={cx("info__content")}>
                                        {user.comments.comment}
                                    </span>
                                ) : (
                                    commentId &&
                                    commentId === user.comments.id && (
                                        <Post
                                            cx={cx}
                                            formData={formData}
                                            user={user}
                                            handleOnchane={handleOnchane}
                                            handleUpdateCommentWithKeyPress={
                                                handleUpdateCommentWithKeyPress
                                            }
                                            handleSaveUpdate={handleSaveUpdate}
                                            inputUpdateRef={inputUpdateRef}
                                            handleSetIsUpdate={() =>
                                                setIsUpdate(false)
                                            }
                                        />
                                    )
                                )}
                            </div>
                            {isLoggedIn && userInfo?.user && (
                                <div className={cx("task__wrapper")}>
                                    {showTask && (
                                        <ActionComment
                                            cx={cx}
                                            userInfo={userInfo}
                                            user={user}
                                            handleOnMouseLeave={
                                                handleOnMouseLeave
                                            }
                                            handleDeleteComment={
                                                handleDeleteComment
                                            }
                                            handleUpdateComment={
                                                handleUpdateComment
                                            }
                                        />
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
