import classNames from "classnames/bind";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getChapterById, getOnlyChapterbyId } from "~/redux/action/action.js";
import { useNavigate, useParams } from "react-router-dom";
import PaginationsChapter from "~/Components/PaginationsChapter/PaginationsChapter";
import styles from "./DetailChapter.module.scss";
const cx = classNames.bind(styles);
function DetailChapter() {
  const [isHidden, setIsHidden] = useState(false);
  const [options, setOptions] = useState();
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
  return (
    <div className={cx("chapter__wrapper")}>
      <div className={cx("chapter__header")}>
        <h1 className={cx("heading")}>
          {name && chapterOnlyData && chapterOnlyData.data
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
        {chapterOnlyData && chapterOnlyData.data ? (
          <div
            className={cx("content__container")}
            dangerouslySetInnerHTML={{
              __html: chapterOnlyData.data.content,
            }}
          />
        ) : (
          <div className={cx("content__container")}></div>
        )}
      </div>
      <div className={cx("pagination-bottom")}>
        <PaginationsChapter
          options={options}
          comicId={id}
          sendDataToParent={handleDataFromChild}
          chapterId={chapterId}
        />
      </div>
    </div>
  );
}

export default DetailChapter;
