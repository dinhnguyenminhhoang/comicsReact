import React, { useEffect, useState } from "react";
import Select from "react-select";
import classNames from "classnames/bind";
import styles from "./Selector.module.scss";
const cx = classNames.bind(styles);
function Selector(props) {
  const [options, setOptions] = useState([]);
  const { optionData, onValueChange } = props;
  const builsDataSelect = (data) => {
    let results = [];
    if (data && data.length > 0) {
      data.map((item) => {
        let Object = {};
        let label = `${item.name}`;
        Object.label = label;
        Object.value = item.id;
        return results.push(Object);
      });
    }
    return results;
  };
  useEffect(() => {
    if (optionData) {
      let resOption = builsDataSelect(optionData);
      if (resOption && resOption.length > 0) setOptions(resOption);
    }
  }, [optionData]);
  const [selectedOption, setSelectedOption] = useState("");
  const handleChange = (selectedOptiona) => {
    setSelectedOption(selectedOptiona);
  };
  useEffect(() => {
    if (selectedOption) onValueChange(selectedOption);
  }, [selectedOption]);
  return (
    <div className={cx("selector")}>
      <Select options={options} onChange={handleChange} />
    </div>
  );
}

export default Selector;
