import { faFlag, faGears, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ActionComment = ({
    cx,
    userInfo,
    user,
    handleOnMouseLeave,
    handleDeleteComment,
    handleUpdateComment,
}) => {
    return (
        <div className={cx("task__comment")} onMouseLeave={handleOnMouseLeave}>
            {userInfo.user.id === user.id || userInfo.user.roleId === "R3" ? (
                <ul className={cx("task__list")}>
                    <li
                        className={cx("task__item")}
                        onClick={() => handleDeleteComment(user.comments.id)}
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
    );
};

export default ActionComment;
