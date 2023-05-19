const ApiRequest = require("../requests/ApiRequest");
let testApiController = (req, res) => {
  return res.send("testApiController");
};
let getCetagoryController = async (req, res) => {
  try {
    let data = await ApiRequest.getAllCategories();
    if (data.errCode === 0) {
      return res.status(200).json({
        data,
      });
    } else if (data.errCode === 1) {
      return res.status(404).json({
        data,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
let getComicController = async (req, res) => {
  let limit = req.query.limit;
  if (!limit) limit = 10;
  try {
    let data = await ApiRequest.getComicsByType(+limit);
    return res.status(200).json({
      data,
    });
  } catch (error) {
    console.log(error);
  }
};
let getChapterController = async (req, res) => {
  try {
    let data = await ApiRequest.handleGetChapter();
    return res.status(200).json({
      data,
    });
  } catch (error) {
    console.log(error);
  }
};
let getChapterByIdController = async (req, res) => {
  try {
    let id = req.query.id;
    if (id) {
      let data = await ApiRequest.handleGetChapterById(id);
      return res.status(200).json({
        data,
      });
    } else {
      return res.status(404).json({
        errCode: 1,
        message: "id not found",
      });
    }
  } catch (error) {
    console.log(error);
  }
};
let getAllComic = async (req, res) => {
  try {
    let data = await ApiRequest.handleGetAllComic();
    return res.status(200).json({
      data,
    });
  } catch (error) {
    console.log(error);
  }
};
let getPagination = async (req, res) => {
  let pageNumber = req.query.pageNumber;
  let pageSize = req.query.pageSize;
  if (!pageNumber) pageNumber = 1;
  if (!pageSize) pageSize = 12;
  try {
    let data = await ApiRequest.handleGetPagination(+pageNumber, +pageSize);

    return res.status(200).json({
      data,
    });
  } catch (error) {
    console.log(error);
  }
};
let getComicById = async (req, res) => {
  let id = req.query.id;
  if (id) {
    let data = await ApiRequest.handleGetComicById(id);
    if (data) {
      return res.status(200).json({
        data,
      });
    }
  } else {
    return res.status(404).json({
      errCode: 1,
      message: "id not found",
    });
  }
};
////////////////////////////////////////////////////////////////////////////
let createComic = async (req, res) => {
  try {
    let data = await ApiRequest.handleCreateComic(req.body);
    if (data) {
      return res.status(200).json({
        data,
      });
    } else {
      return res.status(404).json({
        message: "data not found",
      });
    }
  } catch (error) {
    console.log(error);
  }
};
let createChapter = async (req, res) => {
  let data = await ApiRequest.handleCreateChapter(req.body);
  if (data) {
    return res.status(200).json({
      data,
    });
  } else {
    return res.status(404).json({
      message: "data not found",
    });
  }
};
let createCategory = async (req, res) => {
  let data = await ApiRequest.handleCreateCategory(req.body);
  if (data) {
    return res.status(200).json({
      data,
    });
  } else {
    return res.status(404).json({
      message: "data not found",
    });
  }
};
let createComment = async (req, res) => {
  let data = await ApiRequest.handleCreateComment(req.body);
  if (data) {
    return res.status(200).json({
      data,
    });
  } else {
    return res.status(404).json({
      message: "data not found",
    });
  }
};

module.exports = {
  testApiController,
  getCetagoryController,
  getComicController,
  getChapterController,
  getChapterByIdController,
  getAllComic,
  getPagination,
  getComicById,
  //
  createComic,
  createChapter,
  createCategory,
  createComment,
};
