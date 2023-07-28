import classNames from "classnames/bind";
import styles from "./DetailComic.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { icon } from "~/assets/images";
import { Helmet } from "react-helmet";
import { useSelector, useDispatch } from "react-redux";
import {
    getComicById,
    getChapterById,
    getCategoriesByComic,
    createFollow,
    getFollowByComic,
    checkUserFollow,
} from "~/redux/action/action.js";
import { faCircleExclamation, faList } from "@fortawesome/free-solid-svg-icons";
import Comment from "~/Components/Comment/Comment";
import calculateTimePassed from "~/utils/timePass";
import Heading from "./Heading";
import Body from "./Body";
const cx = classNames.bind(styles);
function DetailComic() {
    const [height, setHeight] = useState(0);
    const { id } = useParams();
    const refDescription = useRef();
    const [isHeight, setIsHeight] = useState(true);
    const [isFollow, setIsFollow] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const comicById = useSelector((state) => state.comicById.data);
    const chapterById = useSelector((state) => state.chapterById.data);
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const userInfo = useSelector((state) => state.userInfo.data);
    const followByComic = useSelector((state) => state.followByComic.data);
    const isFollowByComic = useSelector((state) => state.checkUserFollow.data);
    const categoriesByComicData = useSelector(
        (state) => state.categoriesByComic.data
    );
    useEffect(() => {
        dispatch(getComicById(id));
        dispatch(getChapterById(id));
        dispatch(getCategoriesByComic(id));
        dispatch(getFollowByComic(id));
        if (userInfo?.user) {
            dispatch(
                checkUserFollow({
                    userId: userInfo.user.id,
                    comicId: id,
                })
            );
        }
    }, [dispatch, id, userInfo]);
    useEffect(() => {
        if (refDescription.current)
            setHeight(refDescription.current.offsetHeight);
    }, [refDescription]);
    const handleHeightDes = (e) => {
        const newHeight = isHeight ? "100%" : "100px";
        const newText = isHeight ? "rút gọn" : "xem thêm";
        refDescription.current.style.height = newHeight;
        e.target.textContent = newText;
        setIsHeight(!isHeight);
    };
    const handleBackHistory = () => {
        navigate(-1);
    };
    useEffect(() => {
        if (chapterById && chapterById.data) {
            calculateTimePassed(chapterById.data);
        }
    });
    const handleFollowing = (comicId) => {
        if (userInfo && userInfo.user && userInfo.user.id && comicId) {
            dispatch(
                createFollow({
                    userId: userInfo.user.id,
                    comicId,
                })
            ).then(() => dispatch(getFollowByComic(id)));
            setIsFollow(true);
        }
    };
    return (
        <div className={cx("detail__doctor")}>
            {comicById?.data && (
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>{comicById.data.name || "truyện hay"}</title>
                    <link rel="icon" href={icon} />
                </Helmet>
            )}
            <div className={cx("detail__container")}>
                {comicById && isFollowByComic && comicById.errCode === 0 && (
                    <div>
                        <Heading
                            cx={cx}
                            comicById={comicById}
                            handleBackHistory={handleBackHistory}
                        />
                        <Body
                            cx={cx}
                            comicById={comicById}
                            isFollow={isFollow}
                            isLoggedIn={isLoggedIn}
                            handleFollowing={handleFollowing}
                            followByComic={followByComic}
                            categoriesByComicData={categoriesByComicData}
                            chapterById={chapterById}
                            isFollowByComic={isFollowByComic}
                        />
                        <div
                            className={cx("description__container")}
                            ref={refDescription}
                        >
                            <div className={cx("description__heading")}>
                                <FontAwesomeIcon icon={faCircleExclamation} />
                                <span className={cx("introduce")}>
                                    Giới thiệu
                                </span>
                            </div>
                            <span className={cx("description__content")}>
                                {comicById.data.description}
                            </span>
                        </div>
                        <div>
                            {height >= 100 && (
                                <button
                                    type="button"
                                    className={cx("btn-description")}
                                    onClick={(e) => {
                                        handleHeightDes(e);
                                    }}
                                >
                                    rút gọn
                                </button>
                            )}
                        </div>
                    </div>
                )}
                <div className={cx("chapter__container")}>
                    <div className={cx("chapter__title")}>
                        <FontAwesomeIcon icon={faList} />
                        <span className={cx("title__list")}>
                            Danh sách chương
                        </span>
                    </div>
                    <div className={cx("list__chapter")}>
                        {chapterById?.errCode === 0 &&
                            chapterById.data.length > 0 &&
                            chapterById.data.map((chapter, index) => {
                                return (
                                    <div key={index}>
                                        {comicById && comicById.data && (
                                            <div
                                                className={cx("chapter__item")}
                                            >
                                                <Link
                                                    to={`/reading/${comicById.data.name}/${comicById.data.id}/${chapter.id}`}
                                                >
                                                    Chương{" "}
                                                    {chapter.numericalOrder}
                                                </Link>
                                                <div>
                                                    {
                                                        calculateTimePassed(
                                                            chapterById.data
                                                        )[index].timePassed
                                                    }
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        {chapterById && chapterById.errCode === 1 && (
                            <div
                                className={cx("no-chapter")}
                                key={chapterById.errCode}
                            >
                                <span> {chapterById.message}</span>
                            </div>
                        )}
                    </div>
                </div>
                <Comment comicId={id} />
            </div>
        </div>
    );
}

export default DetailComic;
