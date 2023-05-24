import classNames from "classnames/bind";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import styles from "./CreateCategoryForComic.module.scss";
import Selector from "~/Components/Selector/Selector";
import {
  getAllComic,
  fetchCategoryData,
  createComic_categories,
} from "~/redux/action/action";
const cx = classNames.bind(styles);
function CreateCategoryForComic() {
  const comicData = useSelector((state) => state.allComic.data);
  const categories = useSelector((state) => state.categoryApi.data);
  const categories__comicData = useSelector(
    (state) => state.comic_categories.data
  );
  const [optionData, setOptionData] = useState(null);
  const [checkedIds, setCheckedIds] = useState(new Set());
  const [comicId, setComicId] = useState();
  const inputRef = useRef();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllComic());
  }, [dispatch]);
  useEffect(() => {
    dispatch(fetchCategoryData());
  }, [dispatch]);
  useEffect(() => {
    if (comicData && comicData.length > 0) setOptionData(comicData);
  }, [comicData]);

  const handleCheckboxChange = (event) => {
    const checkboxId = event.target.id;
    const isChecked = event.target.checked;

    if (isChecked) {
      checkedIds.add(checkboxId);
      setCheckedIds(new Set(checkedIds));
    } else {
      checkedIds.delete(checkboxId);
      setCheckedIds(new Set(checkedIds));
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const arrayOfIds = Array.from(checkedIds, Number);
    if (arrayOfIds.length > 0 && comicId) {
      dispatch(
        createComic_categories({
          comicId,
          categoryId: arrayOfIds,
        })
      );
      toast.success("🤩 thêm truyện thành công", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      toast.warning("😅 vui lòng nhập đầy đủ thông tin", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
  const handleValueChange = (value) => {
    if (value) setComicId(value.value);
  };
  return (
    <div className={cx("categories__comic")}>
      {optionData && (
        <Selector optionData={optionData} onValueChange={handleValueChange} />
      )}
      <div className={cx("categories__wrapper")}>
        {categories &&
          categories.length > 0 &&
          categories.map((category) => (
            <label key={category.id} htmlFor={category.id}>
              <input
                ref={inputRef}
                type="checkbox"
                id={category.id}
                onChange={handleCheckboxChange}
              />
              {category.name}
            </label>
          ))}
      </div>
      <div className={cx("categories__submit")} onClick={handleSubmit}>
        <button type="submit">Thêm</button>
      </div>
      <ToastContainer limit={4} />
    </div>
  );
}

export default CreateCategoryForComic;
