import { Button } from "react-bootstrap";
const Post = ({
    cx,
    formData,
    user,
    handleOnchane,
    handleUpdateCommentWithKeyPress,
    handleSaveUpdate,
    inputUpdateRef,
    handleSetIsUpdate,
}) => {
    return (
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
                    onClick={handleSetIsUpdate}
                >
                    hủy
                </Button>
            </div>
        </div>
    );
};

export default Post;
