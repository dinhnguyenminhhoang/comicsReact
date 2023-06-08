import classNames from "classnames/bind";
import styles from "./Statistical.module.scss";
import WaveChart from "../../../Components/Chart/WareChart/WaveChart";
import ComboChart from "../../../Components/Chart/ComboChart/ComboChart";
import {
  getTotalUser,
  getTotalComic,
  getTotalChapter,
} from "~/redux/action/action";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
const cx = classNames.bind(styles);
function Statistical() {
  const [comboChart, setComboChart] = useState();
  const [isDay, setIsDay] = useState(0);
  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTotalUser());
    dispatch(getTotalComic());
    dispatch(getTotalChapter());
  }, [dispatch]);
  let totalUser = useSelector((state) => state.totalUser.data);
  let totalComic = useSelector((state) => state.totalComic.data);
  let totalChapter = useSelector((state) => state.totalChapter.data);

  useEffect(() => {
    if (
      totalComic &&
      totalComic.errCode === 0 &&
      totalUser &&
      totalUser.errCode === 0 &&
      totalChapter &&
      totalChapter.errCode === 0
    ) {
      let dataMonth = totalUser.monthlyUser;
      const combinedData = dataMonth.map((item, index) => ({
        name: item.name,
        user: item.value,
        comic: totalComic.monthlyComics[index].value,
        chapter: totalChapter.monthlyChapters[index].value,
      }));
      setComboChart(combinedData);
    }
  }, [totalUser, totalComic, totalChapter]);
  const handleChartHour = () => {
    if (
      totalComic &&
      totalComic.errCode === 0 &&
      totalUser &&
      totalUser.errCode === 0 &&
      totalChapter &&
      totalChapter.errCode === 0
    ) {
      let dataHour = totalUser.hourslyUsers;
      const combinedData = dataHour.map((item, index) => ({
        name: item.name,
        user: item.value,
        comic: totalComic.hourlyComics[index].value,
        chapter: totalChapter.hourslyChapters[index].value,
      }));
      setComboChart(combinedData);
      setIsDay(2);
    }
  };
  const handleChartDay = () => {
    if (
      totalComic &&
      totalComic.errCode === 0 &&
      totalUser &&
      totalUser.errCode === 0 &&
      totalChapter &&
      totalChapter.errCode === 0
    ) {
      let dataDay = totalUser.daylyUsers;
      const combinedData = dataDay.map((item, index) => ({
        name: item.name,
        user: item.value,
        comic: totalComic.daylyComics[index].value,
        chapter: totalChapter.daylyChapters[index].value,
      }));
      setComboChart(combinedData);
      setIsDay(1);
    }
  };
  const handleChartMonth = () => {
    if (
      totalComic &&
      totalComic.errCode === 0 &&
      totalUser &&
      totalUser.errCode === 0 &&
      totalChapter &&
      totalChapter.errCode === 0
    ) {
      let dataMonth = totalUser.monthlyUser;
      const combinedData = dataMonth.map((item, index) => ({
        name: item.name,
        user: item.value,
        comic: totalComic.monthlyComics[index].value,
        chapter: totalChapter.monthlyChapters[index].value,
      }));
      setComboChart(combinedData);
      setIsDay(0);
    }
  };
  return (
    <div className={cx("statistical__wrapper")}>
      {totalUser &&
      totalUser.errCode === 0 &&
      totalComic &&
      totalComic.errCode === 0 &&
      totalChapter &&
      totalChapter.errCode === 0 ? (
        <>
          <div className={cx("statistical__header")}>
            <div className={cx("statistical__list--info")}>
              <div className={cx("info__member", "info__item")}>
                <span className={cx("info__title")}>USERS</span>
                <span className={cx("info__total")}>{totalUser.totalUser}</span>
                <WaveChart
                  name="USERS"
                  data={
                    isDay === 0
                      ? totalUser.monthlyUser
                      : isDay === 1
                      ? totalUser.daylyUsers
                      : isDay === 2
                      ? totalUser.hourslyUsers
                      : ""
                  }
                />
              </div>
              <div className={cx("info__manage", "info__item")}>
                <span className={cx("info__title")}>MANGAER</span>
                <span className={cx("info__total")}>10000</span>
                <WaveChart
                  name="MANGAERS"
                  data={
                    isDay === 0
                      ? totalComic.monthlyComics
                      : isDay === 1
                      ? totalComic.daylyComics
                      : isDay === 2
                      ? totalComic.hourlyComics
                      : ""
                  }
                />
              </div>
              <div className={cx("info__comic", "info__item")}>
                <span className={cx("info__title")}>COMIC</span>
                <span className={cx("info__total")}>
                  {totalComic.totalComics}
                </span>
                <WaveChart
                  name="COMIC"
                  data={
                    isDay === 0
                      ? totalComic.monthlyComics
                      : isDay === 1
                      ? totalComic.daylyComics
                      : isDay === 2
                      ? totalComic.hourlyComics
                      : ""
                  }
                />
              </div>
              <div className={cx("info__chapter", "info__item")}>
                <span className={cx("info__title")}>CHAPTER</span>
                <span className={cx("info__total")}>
                  {totalChapter.totalChapters}
                </span>
                <WaveChart
                  name="CHAPTER"
                  data={
                    isDay === 0
                      ? totalChapter.monthlyChapters
                      : isDay === 1
                      ? totalChapter.daylyChapters
                      : isDay === 2
                      ? totalChapter.hourslyChapters
                      : ""
                  }
                />
              </div>
            </div>
          </div>
          <div className={cx("combo__chart")}>
            <div className={cx("chart__heading")}>
              <span>Tracffic</span>
              <div className={cx("chart__time")}>
                <button
                  className={cx("chart__hour", "chart-btn", {
                    active: isDay === 2,
                  })}
                  onClick={handleChartHour}
                >
                  ngày
                </button>
                <button
                  className={cx("chart__day", "chart-btn", {
                    active: isDay === 1,
                  })}
                  onClick={handleChartDay}
                >
                  tháng
                </button>
                <button
                  className={cx("chart__month", "chart-btn", {
                    active: isDay === 0,
                  })}
                  onClick={handleChartMonth}
                >
                  năm
                </button>
              </div>
            </div>
            {comboChart ? <ComboChart data={comboChart} /> : ""}
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
}

export default Statistical;
