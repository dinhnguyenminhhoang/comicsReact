import classNames from "classnames/bind";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect, useRef } from "react";
import styles from "./CreateCategoryForComic.module.scss";
import { fetchCategoryData } from "~/redux/action/action";
const cx = classNames.bind(styles);
function CreateCategoryForComic(props) {
  let { handleCategories } = props;
  const categories = useSelector((state) => state.categoryApi.data);
  const [checkedIds, setCheckedIds] = useState(new Set());
  const inputRef = useRef();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCategoryData());
  }, [dispatch]);
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
  useEffect(() => {
    if (handleCategories) {
      const arrayOfIds = Array.from(checkedIds, Number);
      handleCategories(arrayOfIds);
    }
  }, [checkedIds]);
  return (
    <div className={cx("categories__comic")}>
      <h1 className={cx("heading")}>Thêm thể loại cho truyện</h1>
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
    </div>
  );
}

export default CreateCategoryForComic;
