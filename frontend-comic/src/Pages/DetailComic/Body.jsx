import {
    faEye,
    faHeart,
    faSignal,
    faSignature,
    faStrikethrough,
    faUser,
} from "@fortawesome/free-solid-svg-icons";
import Image from "./Image";
import Title from "./Title";
import Category from "./Category";
import ReadType from "./ReadType";
const Body = ({
    cx,
    comicById,
    isFollow,
    isLoggedIn,
    handleFollowing,
    followByComic,
    categoriesByComicData,
    chapterById,
}) => {
    return (
        <div className={cx("content__container")}>
            <Image
                isFollow={isFollow}
                isLoggedIn={isLoggedIn}
                handleFollowing={handleFollowing}
                cx={cx}
                comicById={comicById}
            />
            <div className={cx("content__info")}>
                <span className={cx("info__name")}>{comicById.data.name}</span>
                <div className={cx("info__details")}>
                    <div className={cx("datails__title")}>
                        <Title
                            icon={faSignature}
                            cx={cx}
                            content={comicById.data.nickName}
                            text="Tên khác"
                        />
                        <Title
                            icon={faUser}
                            cx={cx}
                            content={comicById.data.author}
                            text="Tác giả"
                        />
                        <Title
                            icon={faSignal}
                            cx={cx}
                            content="Đang Cập Nhật"
                            text="Tình trạng"
                        />
                        <Title
                            icon={faHeart}
                            cx={cx}
                            content={followByComic.data}
                            text="Lượt theo dõi"
                        />
                        <Title
                            icon={faEye}
                            cx={cx}
                            content={comicById.data.views}
                            text="Lượt xem"
                        />
                        <Category
                            cx={cx}
                            icon={faStrikethrough}
                            categoriesByComicData={categoriesByComicData}
                        />
                    </div>
                </div>
                <ReadType
                    cx={cx}
                    comicById={comicById}
                    chapterById={chapterById}
                />
            </div>
        </div>
    );
};

export default Body;
