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
      return res.status(400).json({
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
      return res.status(400).json({
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
  try {
    let id = req.query.id;
    if (id) {
      let data = await ApiRequest.handleGetComicById(id);
      if (data) {
        return res.status(200).json({
          data,
        });
      }
    } else {
      return res.status(400).json({
        errCode: 1,
        message: "id not found",
      });
    }
  } catch (error) {
    return res.status(400).json({
      errCode: 1,
      message: error,
    });
  }
};
let getComicByCategory = async (req, res) => {
  try {
    let categoryId = req.query.categoryId;
    if (categoryId) {
      let data = await ApiRequest.handleGetComicByCategory(+categoryId);
      if (data) {
        return res.status(200).json({
          data,
        });
      }
    } else {
      return res.status(400).json({
        errCode: 1,
        message: "id not found",
      });
    }
  } catch (error) {
    return res.status(400).json({
      errCode: 1,
      message: error,
    });
  }
};
let getCategoriesByComic = async (req, res) => {
  try {
    let comicId = req.query.comicId;
    if (comicId) {
      let data = await ApiRequest.handleGetcategoriesByComic(+comicId);
      if (data) {
        return res.status(200).json({
          data,
        });
      }
    } else {
      return res.status(400).json({
        errCode: 1,
        message: "id not found",
      });
    }
  } catch (error) {
    return res.status(400).json({
      errCode: 1,
      message: error,
    });
  }
};
let getOnlyChapterByIdController = async (req, res) => {
  try {
    let chapterId = req.query.chapterId;
    let comicId = req.query.comicId;
    if (chapterId && comicId) {
      let data = await ApiRequest.handleGetOnlyChapterByIdController(
        +chapterId,
        +comicId
      );
      if (data) {
        return res.status(200).json({
          data,
        });
      } else {
        return res.status(400).json({
          errCode: 1,
          message: "data not found",
        });
      }
    } else {
      return res.status(400).json({
        errCode: 1,
        message: "chapterId not found",
      });
    }
  } catch (error) {
    return res.status(400).json({
      error: 1,
      message: "error form server",
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
      return res.status(400).json({
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
    return res.status(400).json({
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
    return res.status(400).json({
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
    return res.status(400).json({
      message: "data not found",
    });
  }
};
let createCategoryComic = async (req, res) => {
  try {
    let dataReq = req.body;
    if (dataReq.comicId && dataReq.categoryId.length > 0) {
      let data = await ApiRequest.handleCreateCategoryComic(dataReq);
      if (data) {
        return res.status(200).json({
          data,
        });
      } else {
        return res.status(400).json({
          message: "data not found",
        });
      }
    } else {
      return res.status(400).json({
        message: "missing parameter",
      });
    }
  } catch (error) {
    console.log(error);
  }
};
//uppdate
let updateViews = async (req, res) => {
  try {
    let comicId = req.query.comicId;
    if (!comicId) return;
    let data = await ApiRequest.handleUpdateViews(+comicId);
    if (data) {
      return res.status(200).json({
        data,
      });
    } else {
      return res.status(400).json({
        errCode: 1,
        message: "data not found",
      });
    }
  } catch (error) {
    return res.status(400).json({
      error: 1,
      message: "error form server",
    });
  }
};
let updateTimePass = async (req, res) => {
  try {
    let comicId = req.query.comicId;
    if (!comicId) return;
    let data = await ApiRequest.handleUpdateTimePass(+comicId);
    if (data) {
      return res.status(200).json({
        data,
      });
    } else {
      return res.status(400).json({
        errCode: 1,
        message: "data not found",
      });
    }
  } catch (error) {
    return res.status(400).json({
      error: 1,
      message: "error form server",
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
  getComicByCategory,
  getCategoriesByComic,
  getOnlyChapterByIdController,
  //
  createComic,
  createChapter,
  createCategory,
  createComment,
  createCategoryComic,
  //
  updateViews,
  updateTimePass,
};
