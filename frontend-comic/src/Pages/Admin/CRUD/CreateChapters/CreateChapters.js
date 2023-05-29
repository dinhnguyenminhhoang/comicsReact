import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames/bind";
import MdEditor from "react-markdown-editor-lite";
import MarkdownIt from "markdown-it";
import Select from "react-select";
import { Button, Col, Form, Row } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import { isEmpty } from "lodash";

import {
  getAllComic,
  fetchCreateChapter,
  updateTimePass,
  getChapterById,
} from "~/redux/action/action.js";

import style from "./CreateChapters.module.scss";

const cx = classNames.bind(style);

const CreateChapters = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [option, setOption] = useState({});
  const [content, setContent] = useState("");
  const [contentMarkdown, setContentMarkdown] = useState("");
  const [comicId, setComicId] = useState(0);
  const [numericalOrder, setNumericalOrder] = useState("");
  const [formData, setFormData] = useState({ name: "" });
  const [latestNumericalOrder, setLatestNumericalOrder] = useState("");

  const dispatch = useDispatch();

  const comicData = useSelector((state) => state.allComic.data);
  const chapterOld = useSelector((state) => state.chapterById.data);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    dispatch(getAllComic());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getChapterById(comicId));
  }, [dispatch]);

  useEffect(() => {
    setOption(buildDataSelect(comicData));
  }, [comicData]);

  useEffect(() => {
    if (chapterOld?.data?.length > 0) {
      setNumericalOrder(chapterOld.data[0].numericalOrder + 1);
    } else if (chapterOld && chapterOld.errCode === 1) {
      setNumericalOrder(1);
    }
  }, [chapterOld]);

  const buildDataSelect = (data) =>
    data?.map((item) => ({
      label: `${item.name}`,
      value: item.id,
    }));

  const handleEditorChange = ({ html, text }) => {
    setContent(html);
    setContentMarkdown(text);
  };

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    setComicId(selectedOption.value);
    dispatch(getChapterById(selectedOption.value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name } = formData;

    if (isEmpty(content) || !comicId || isEmpty(name)) {
      toast.warning("😅 Vui lòng nhập đầy đủ thông tin", {
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
    }

    dispatch(
      fetchCreateChapter({
        comicId,
        content,
        name: formData.name,
        numericalOrder,
      })
    )
      .then(() => {
        setLatestNumericalOrder(numericalOrder);
        toast.success("🤩 Thêm truyện thành công", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        dispatch(getChapterById(comicId));
        setNumericalOrder(latestNumericalOrder + 1);
        dispatch(updateTimePass(comicId));
        setContentMarkdown("");
        setFormData({ name: "" });
      })
      .catch((error) => {
        toast.error("❌ Thêm truyện thất bại", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        console.error(error);
      });
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
              Tên chapter:
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
              Chapter thứ:
            </Form.Label>
            <Form.Control
              className={cx("form-control-lg")}
              style={{ borderRadius: "5px" }}
              type="text"
              name="numericalOrder"
              value={numericalOrder}
              onChange={handleInputChange}
              placeholder="Chapter thứ:"
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
              Chọn chuyện:
            </span>
            <Select
              defaultValue={selectedOption}
              onChange={handleChange}
              options={option}
            />
          </div>
          <Form onSubmit={handleSubmit}>
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
};

export default CreateChapters;
