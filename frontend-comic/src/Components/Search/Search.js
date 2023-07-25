import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClose,
  faSearch,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames/bind";
import { searchApi } from "~/redux/action/action";
import coverBase64ToBlob from "~/utils/coverBase64ToBlob";
import { useDebounce } from "~/hooks";
import { Link } from "react-router-dom";
import { useClickAway } from "@uidotdev/usehooks";
import styles from "./Search.module.scss";

const cx = classNames.bind(styles);

const Search = () => {
  const [searchText, setSearchText] = useState("");
  const [isShow, setIsShow] = useState(false);
  const loadRef = useRef(null);
  const spinRef = useRef(null);
  const searchRef = useClickAway(() => {
    setIsShow(false);
  });
  const dispatch = useDispatch();
  const searchData = useSelector((state) => state.searchData.data);

  const handleChaneInput = (e) => {
    const { value } = e.target;
    setSearchText(value);
    if (value.trim()) {
      spinRef.current.style.display = "block";
      loadRef.current.style.display = "none";
    } else {
      spinRef.current.style.display = "none";
    }
  };

  const debounce = useDebounce(searchText, 500);

  const handleClear = () => {
    setSearchText("");
  };
  const handleCloseByDetailComic = () => {
    setIsShow(false);
  };
  useEffect(() => {
    if (debounce.trim()) {
      dispatch(
        searchApi({
          searchContent: debounce,
          type: 10,
        })
      );
      spinRef.current.style.display = "none";
      loadRef.current.style.display = "block";
    } else {
      loadRef.current.style.display = "none";
    }
  }, [dispatch, debounce]);
  return (
    <div className={cx("search-box")}>
      <div className={cx("input-search")}>
        <div>
          <input
            type="text"
            placeholder="BẠN MUỐN TÌM CHUYỆN GÌ ?"
            onChange={handleChaneInput}
            value={searchText}
            className={cx("input-forcus")}
            onFocus={() => setIsShow(true)}
          />
          {isShow && (
            <div className={cx("search__results--container")} ref={searchRef}>
              <ul className={cx("list_result")}>
                {searchText && searchData?.data?.length > 0 ? (
                  searchData.data.map((comic, index) => (
                    <Link
                      to={`/detail-comic/${comic.id}`}
                      key={index}
                      onClick={handleCloseByDetailComic}
                    >
                      <li className={cx("item-result")}>
                        <img
                          src={coverBase64ToBlob(comic.image)}
                          alt=""
                          className={cx("result-img")}
                        />
                        <div className={cx("result-info")}>
                          <span className={cx("name")}>{comic.name}</span>
                          <span className={cx("auth")}>{comic.author}</span>
                        </div>
                      </li>
                    </Link>
                  ))
                ) : searchData.errCode === 1 ? (
                  <li
                    className={cx("item-result", "no-result")}
                    style={{ pointerEvents: "none", cursor: "default" }}
                  >
                    <span className={cx("name")}>
                      Không tìm thấy kết quả nào
                    </span>
                  </li>
                ) : (
                  ""
                )}
              </ul>
            </div>
          )}
          <button className={cx("icon-btn-search")}>
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
        <div className={cx("search-icon__wrapper")}>
          <FontAwesomeIcon
            icon={faSpinner}
            className={cx("icon_loader", "search-icon")}
            ref={spinRef}
          />
          <FontAwesomeIcon
            icon={faClose}
            className={cx("icon_clear", "search-icon")}
            ref={loadRef}
            onClick={handleClear}
          />
        </div>
      </div>
    </div>
  );
};

export default Search;
