import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import coverBase64ToBlob from "~/utils/coverBase64ToBlob";
const Image = ({
    cx,
    isFollow,
    isLoggedIn,
    comicById,
    handleFollowing,
    isFollowByComic,
}) => {
    return (
        <div className={cx("content__image")}>
            <img src={coverBase64ToBlob(comicById.data.image)} alt="test" />
            {!isFollow && isLoggedIn && !isFollowByComic.isCheck && (
                <div className={cx("content__follow")}>
                    <button
                        className={cx("follow-btn")}
                        onClick={() => handleFollowing(comicById.data.id)}
                    >
                        <FontAwesomeIcon icon={faPlus} className={cx("icon")} />
                        Follow
                    </button>
                </div>
            )}
        </div>
    );
};

export default Image;
