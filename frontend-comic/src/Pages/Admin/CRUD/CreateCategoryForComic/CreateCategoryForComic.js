import classNames from "classnames/bind";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import styles from "./CreateCategoryForComic.module.scss";
import Selector from "~/Components/Selector/Selector";
const cx = classNames.bind(styles);
function CreateCategoryForComic(props) {
  let { comicData, categories } = props;
  const [optionData, setOptionData] = useState(null);
  const [checkedIds, setCheckedIds] = useState(new Set());
  const [comicValue, setComiValue] = useState();
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
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const arrayOfIds = Array.from(checkedIds, Number);
  //   console.log(arrayOfIds);
  // };
  const handleValueChange = (value) => {
    if (value) setComiValue(value.value);
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
