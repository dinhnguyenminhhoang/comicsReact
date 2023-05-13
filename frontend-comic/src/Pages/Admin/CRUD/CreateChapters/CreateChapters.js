import classNames from "classnames/bind";
import MdEditor from "react-markdown-editor-lite";
import MarkdownIt from "markdown-it";
import Select from "react-select";
import style from "./CreateChapters.module.scss";
import { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
const cx = classNames.bind(style);
const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

function CreateChapters() {
  const mdParser = new MarkdownIt();
  const [selectedOption, setSelectedOption] = useState(null);
  const handleEditorChange = ({ html, text }) => {
    console.log("handleEditorChange", html, text);
  };
  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
  };
  return (
    <div className={cx("container")}>
      <h1 className={cx("heading")}>Thêm mới chương truyện</h1>
      <div className={cx("chapter__wrapper")}>
        <div className={cx("selected__wrapper")}>
          <Select
            defaultValue={selectedOption}
            onChange={handleChange}
            options={options}
          />
        </div>
        <div className={cx("markDown__wrapper")}>
          <MdEditor
            value=""
            renderHTML={(text) => mdParser.render(text)}
            onChange={handleEditorChange}
          />
        </div>
      </div>
    </div>
  );
}

export default CreateChapters;
