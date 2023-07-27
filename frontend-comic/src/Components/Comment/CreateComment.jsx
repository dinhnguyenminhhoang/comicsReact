import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CreateComment = ({
    cx,
    formData,
    userInfo,
    handleOnchane,
    handleCreateComment,
    handleCreateCommentWithKeyPress,
}) => {
    return (
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
    );
};

export default CreateComment;
