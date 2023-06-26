import classNames from "classnames/bind";
import styles from "./PaginationsChapter.module.scss";
import Selector from "../Selector/Selector";
import { getOnlyChapterbyId } from "~/redux/action/action";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { toNumber } from "lodash";
const cx = classNames.bind(styles);
function PaginationsChapter(props) {
  let [disabledPre, setDisabledPre] = useState(false);
  let [disabledNext, setDisabledNext] = useState(false);
  let { options, comicId, sendDataToParent, chapterId, endPage } = props;
  let dispatch = useDispatch();
  const handlePreChapter = () => {
    sendDataToParent({ value: chapterId - 1 });
    window.scrollTo(0, 0);
  };
  const handleNextChapter = () => {
    let newchapterId = toNumber(chapterId) + 1;
    sendDataToParent({ value: newchapterId });
    window.scrollTo(0, 0);
  };
  let handleChange = (selectedOption) => {
    dispatch(
      getOnlyChapterbyId({
        chapterId: selectedOption.value,
        comicId: comicId,
      })
    );
    sendDataToParent(selectedOption);
  };
  useEffect(() => {
    if (options) {
      if (toNumber(chapterId) === toNumber(options[0].id)) {
        setDisabledNext(true);
      } else {
        setDisabledNext(false);
      }
      let lg = options.length;
      if (toNumber(chapterId) === toNumber(options[lg - 1].id)) {
        setDisabledPre(true);
      } else {
        setDisabledPre(false);
      }
    }
  }, [options, disabledPre, disabledNext, chapterId]);
  return (
    <div className={cx("pagination__wrapper")}>
      <div className={cx("pagination__prev")} disabled={disabledPre}>
        <button onClick={handlePreChapter} disabled={disabledPre}>
          PRE
        </button>
      </div>
      <div className={cx("select__chapter")}>
        {!endPage && (
          <Selector
            optionData={options}
            onValueChange={handleChange}
            className={true}
          />
        )}
      </div>
      <div className={cx("pagination__next")} disabled={disabledNext}>
        <button onClick={handleNextChapter} disabled={disabledNext}>
          NEXT
        </button>
      </div>
    </div>
  );
}

export default PaginationsChapter;
