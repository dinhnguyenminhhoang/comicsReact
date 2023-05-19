import classNames from "classnames/bind";
import styles from "./DetailComic.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getComicById } from "~/redux/action/action.js";
import {
  faBook,
  faCircleExclamation,
  faEye,
  faHeart,
  faHomeAlt,
  faList,
  faSignal,
  faSignature,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
const cx = classNames.bind(styles);
function DetailComic() {
  const [height, setHeight] = useState(0);
  const { id } = useParams();
  const refDescription = useRef();
  const [isHeight, setIsHeight] = useState(true);
  const dispatch = useDispatch();
  const comicById = useSelector((state) => state.comicById.data);
  useEffect(() => {
    dispatch(getComicById(id));
  }, [dispatch, id]);
  useEffect(() => {
    if (refDescription.current) setHeight(refDescription.current.offsetHeight);
  }, [refDescription]);
  const handleHeightDes = (e) => {
    const newHeight = isHeight ? "100%" : "85%";
    const newText = isHeight ? "rút gọn" : "xem thêm";
    refDescription.current.style.height = newHeight;
    e.target.textContent = newText;
    setIsHeight(!isHeight);
  };
  return (
    <div className={cx("detail__doctor")}>
      <div className={cx("detail__container")}>
        {comicById && comicById.errCode === 0 && (
          <div>
            <div className={cx("detail__heading")}>
              <FontAwesomeIcon icon={faHomeAlt} className={cx("icon")} />
              <span className={cx("home__page--title")}>Trang chủ /</span>
              <span className={cx("home__page--title")}>
                {comicById.data.name}
              </span>
            </div>
            <div className={cx("content__container")}>
              <div className={cx("content__image")}>
                <img src={comicById.data.image} alt="test" />
              </div>
              <div className={cx("content__info")}>
                <span className={cx("info__name")}>{comicById.data.name}</span>
                <div className={cx("info__details")}>
                  <div className={cx("datails__title")}>
                    <div className={cx("title__wrapper")}>
                      <div className={cx("title-name")}>
                        <FontAwesomeIcon
                          className={cx("title-icon")}
                          icon={faSignature}
                        />
                        <span className={cx("title__text")}>Tên khác</span>
                      </div>
                      <span className={cx("title__content")}>
                        đang cập nhật
                      </span>
                    </div>
                    <div className={cx("title__wrapper")}>
                      <div className={cx("title-name")}>
                        <FontAwesomeIcon
                          className={cx("title-icon")}
                          icon={faUser}
                        />
                        <span className={cx("title__text")}>Tác giả</span>
                      </div>
                      <span className={cx("title__content")}>
                        {comicById.data.author}
                      </span>
                    </div>
                    <div className={cx("title__wrapper")}>
                      <div className={cx("title-name")}>
                        <FontAwesomeIcon
                          className={cx("title-icon")}
                          icon={faSignal}
                        />
                        <span className={cx("title__text")}>Tình trạng</span>
                      </div>
                      <span className={cx("title__content")}>
                        Đang Cập Nhật
                      </span>
                    </div>
                    <div className={cx("title__wrapper")}>
                      <div className={cx("title-name")}>
                        <FontAwesomeIcon
                          className={cx("title-icon")}
                          icon={faHeart}
                        />
                        <span className={cx("title__text")}>Lượt theo dõi</span>
                      </div>
                      <span className={cx("title__content")}>1</span>
                    </div>
                    <div className={cx("title__wrapper")}>
                      <div className={cx("title-name")}>
                        <FontAwesomeIcon
                          className={cx("title-icon")}
                          icon={faEye}
                        />
                        <span className={cx("title__text")}>Lượt xem</span>
                      </div>
                      <span className={cx("title__content")}>
                        {comicById.data.views}
                      </span>
                    </div>
                  </div>
                </div>
                <div className={cx("read__type")}>
                  <button className={cx("read__btn--new")}>
                    <FontAwesomeIcon
                      className={cx("read-icon")}
                      icon={faBook}
                    />
                    đọc từ đầu
                  </button>
                  <button className={cx("read__btn--first")}>
                    <FontAwesomeIcon
                      className={cx("read-icon")}
                      icon={faBook}
                    />
                    đọc mới nhất
                  </button>
                </div>
              </div>
            </div>
            <div className={cx("description__container")} ref={refDescription}>
              <div className={cx("description__heading")}>
                <FontAwesomeIcon icon={faCircleExclamation} />
                <span className={cx("introduce")}>Giới thiệu</span>
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
            <span className={cx("title__list")}>Danh sách chương</span>
          </div>
          <div className={cx("list__chapter")}>
            <div className={cx("chapter__item")}>
              <div> Chương 1</div>
              <div> 1 tháng trước</div>
            </div>
            <div className={cx("chapter__item")}>
              <div> Chương 1</div>
              <div> 1 tháng trước</div>
            </div>
            <div className={cx("chapter__item")}>
              <div> Chương 1</div>
              <div> 1 tháng trước</div>
            </div>
            <div className={cx("chapter__item")}>
              <div> Chương 1</div>
              <div> 1 tháng trước</div>
            </div>
            <div className={cx("chapter__item")}>
              <div> Chương 1</div>
              <div> 1 tháng trước</div>
            </div>
            <div className={cx("chapter__item")}>
              <div> Chương 1</div>
              <div> 1 tháng trước</div>
            </div>
            <div className={cx("chapter__item")}>
              <div> Chương 1</div>
              <div> 1 tháng trước</div>
            </div>
            <div className={cx("chapter__item")}>
              <div> Chương 1</div>
              <div> 1 tháng trước</div>
            </div>
            <div className={cx("chapter__item")}>
              <div> Chương 1</div>
              <div> 1 tháng trước</div>
            </div>
            <div className={cx("chapter__item")}>
              <div> Chương 1</div>
              <div> 1 tháng trước</div>
            </div>
            <div className={cx("chapter__item")}>
              <div> Chương 1</div>
              <div> 1 tháng trước</div>
            </div>
            <div className={cx("chapter__item")}>
              <div> Chương 1</div>
              <div> 1 tháng trước</div>
            </div>
            <div className={cx("chapter__item")}>
              <div> Chương 1</div>
              <div> 1 tháng trước</div>
            </div>
            <div className={cx("chapter__item")}>
              <div> Chương 1</div>
              <div> 1 tháng trước</div>
            </div>
            <div className={cx("chapter__item")}>
              <div> Chương 1</div>
              <div> 1 tháng trước</div>
            </div>
            <div className={cx("chapter__item")}>
              <div> Chương 1</div>
              <div> 1 tháng trước</div>
            </div>
            <div className={cx("chapter__item")}>
              <div> Chương 1</div>
              <div> 1 tháng trước</div>
            </div>
            <div className={cx("chapter__item")}>
              <div> Chương 1</div>
              <div> 1 tháng trước</div>
            </div>
            <div className={cx("chapter__item")}>
              <div> Chương 1</div>
              <div> 1 tháng trước</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailComic;
