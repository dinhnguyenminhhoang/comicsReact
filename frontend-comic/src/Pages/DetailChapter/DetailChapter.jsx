import classNames from "classnames/bind";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { icon } from "~/assets/images";
import { Helmet } from "react-helmet";
import { getChapterById, getOnlyChapterbyId } from "~/redux/action/action.js";
import { useNavigate, useParams } from "react-router-dom";
import PaginationsChapter from "~/Components/PaginationsChapter/PaginationsChapter";
import styles from "./DetailChapter.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
const cx = classNames.bind(styles);
function DetailChapter() {
  const [options, setOptions] = useState();
  const [showHomeButton, setShowHomeButton] = useState(false);
  let dispatch = useDispatch();
  let chapterData = useSelector((state) => state.chapterById.data);
  let chapterOnlyData = useSelector((state) => state.chapterOnly.data);
  let { id, chapterId, name } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getChapterById(id));
  }, [dispatch, id]);
  useEffect(() => {
    dispatch(getOnlyChapterbyId({ comicId: id, chapterId: chapterId }));
  }, [dispatch, id, chapterId]);
  useEffect(() => {
    if (chapterData && chapterData.data) setOptions(chapterData.data);
  }, [chapterData]);
  let handleDataFromChild = (chapter) => {
    const newId = chapter.value;
    navigate(`/reading/${name}/${id}/${newId}`);
  };

  const handleScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    scrollTop > 800 ? setShowHomeButton(true) : setShowHomeButton(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleHomeClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <div className={cx("chapter__wrapper")}>
      {name && chapterOnlyData?.data && (
        <Helmet>
          <meta charSet="utf-8" />
          <title>{`${name}(${chapterOnlyData.data.name})`}</title>
          <link rel="icon" href={icon} />
        </Helmet>
      )}
      <div className={cx("chapter__header")}>
        <h1 className={cx("heading")}>
          {name && chapterOnlyData?.data
            ? name + " - " + chapterOnlyData.data.name
            : ""}
        </h1>
        <div className={cx("pagination")}>
          <PaginationsChapter
            options={options}
            comicId={id}
            sendDataToParent={handleDataFromChild}
            chapterId={chapterId}
          />
        </div>
      </div>
      <div className={cx("chapter__content")}>
        {chapterOnlyData?.data ? (
          <div
            className={cx("content__container")}
            dangerouslySetInnerHTML={{
              __html: chapterOnlyData.data.content,
            }}
          />
        ) : (
          <div className={cx("content__container")}></div>
        )}
        {showHomeButton && (
          <button
            onClick={handleHomeClick}
            className={cx("btn__home", { show: showHomeButton })}
          >
            <FontAwesomeIcon icon={faHome} />
          </button>
        )}
      </div>
      <div className={cx("pagination-bottom")}>
        <PaginationsChapter
          options={options}
          comicId={id}
          sendDataToParent={handleDataFromChild}
          chapterId={chapterId}
          endPage={true}
        />
      </div>
    </div>
  );
}

export default DetailChapter;
