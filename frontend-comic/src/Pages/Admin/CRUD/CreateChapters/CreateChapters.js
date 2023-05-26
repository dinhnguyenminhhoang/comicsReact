import classNames from "classnames/bind";
import MdEditor from "react-markdown-editor-lite";
import MarkdownIt from "markdown-it";
import Select from "react-select";
import style from "./CreateChapters.module.scss";
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllComic,
  fetchCreateChapter,
  updateTimePass,
} from "~/redux/action/action.js";
import { Button, Col, Form, Row } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import { isEmpty } from "lodash";
const cx = classNames.bind(style);
function CreateChapters() {
  //
  const [selectedOption, setSelectedOption] = useState("");
  const [option, setOption] = useState({});
  const [content, setContent] = useState("");
  const [contentMarkdown, setContentMarkdown] = useState("");
  const [comicId, setComicId] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    numericalOrder: "",
  });
  //
  const dispatch = useDispatch();
  //
  const comicData = useSelector((state) => state.allComic.data);
  //
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  //
  useEffect(() => {
    dispatch(getAllComic());
  }, [dispatch]);
  useEffect(() => {
    setOption(builsDataSelect(comicData));
  }, [comicData]);
  //
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
  const handleEditorChange = ({ html, text }) => {
    setContent(html);
    setContentMarkdown(text);
  };

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    setComicId(selectedOption.value);
  };
  // submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, numericalOrder } = formData;
    if (
      isEmpty(content) ||
      !comicId ||
      isEmpty(name) ||
      isEmpty(numericalOrder)
    ) {
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
      return;
    } else {
      dispatch(
        fetchCreateChapter({
          comicId: comicId,
          content: content,
          name: formData.name,
          numericalOrder: formData.numericalOrder,
        })
      );
      dispatch(updateTimePass(comicId));
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
      //reset form DATA for next
      setComicId("");
      setContent("");
      setContentMarkdown("");
      setFormData({
        name: "",
        numericalOrder: "",
      });
    }
  };
  const mdParser = new MarkdownIt();
  return (
    <div className={cx("container")}>
      <h1 className={cx("heading")}>Thêm mới chương truyện</h1>
      <div className={cx("chapter__wrapper")}>
        <div className={cx("chapter__form")}>
          <Form.Group as={Col} controlId="name">
            <Form.Label
              style={{ fontSize: "1.4rem", color: "white", paddingLeft: "4px" }}
            >
              tên chapter :
            </Form.Label>
            <Form.Control
              className={cx("form-control-lg")}
              style={{ borderRadius: "5px" }}
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Nhập tên chapter"
            />
          </Form.Group>
          <Form.Group as={Col} controlId="numericalOrder">
            <Form.Label
              style={{
                fontSize: "1.4rem",
                color: "white",
                paddingLeft: "4px",
                marginTop: "8px",
              }}
            >
              chapter thứ :
            </Form.Label>
            <Form.Control
              className={cx("form-control-lg")}
              style={{ borderRadius: "5px" }}
              type="text"
              name="numericalOrder"
              value={formData.numericalOrder}
              onChange={handleInputChange}
              placeholder="Nhập số chapter"
            />
          </Form.Group>
          <div className={cx("selected__wrapper")}>
            <span
              style={{
                fontSize: "1.4rem",
                color: "white",
                paddingLeft: "4px",
              }}
            >
              chọn chuyện :
            </span>
            <Select
              defaultValue={selectedOption}
              onChange={handleChange}
              options={option}
            />
          </div>
          <Form onSubmit={handleSubmit}>
            {/* Các trường dữ liệu */}
            <Row className="justify-content-center">
              <Button
                variant="primary"
                type="submit"
                className={cx("btn-submit")}
              >
                Thêm mới
              </Button>
            </Row>
          </Form>
        </div>
        <div className={cx("markDown__wrapper")}>
          <MdEditor
            value={contentMarkdown}
            renderHTML={(text) => mdParser.render(text)}
            onChange={handleEditorChange}
          />
        </div>
        <ToastContainer limit={4} />
      </div>
    </div>
  );
}

export default CreateChapters;
